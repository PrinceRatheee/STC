import {connect} from "../../../../utils/database";

import User from "../../../../models/user";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "../../../../helpers/mailer";

connect();

export async function POST(request:NextRequest ){
    try {
        const reqBody= await request.json();
        console.log("hhhhh");
        
        const {username,email,password}=reqBody;

        console.log("Signup Req Body");
        console.log(reqBody);

        //first check if user already exist
        const user = await User.findOne({email});
        console.log(user)
        if(user){
            return NextResponse.json({error:"User Already Exists"},{status:400});
        }

        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedpassword=await bcryptjs.hash(password,salt);
        const newUser=new User({
            username,
            email,  
            password:hashedpassword
        })
        console.log(newUser);
        console.log("saved")
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser);
        console.log("saving");
        console.log("new user saved ");
        //send verification email
        console.log(savedUser)
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        console.log("verification email sent");
        return NextResponse.json({status:200,postMessage:"Signup successfully"})
    } catch (error) {
        console.log("noo");
        return NextResponse.json({error:error.message},{status:500})
    }
}  