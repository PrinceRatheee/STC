
import {connect} from "../../../../utils/database";
import {NextResponse} from "next/server";
import User from "../../../../models/user";



connect();

export async function POST(request){
    try {
        const reqBody=await request.json();
        const {token}= reqBody;
        console.log("token");   
        console.log(token);

        const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt :Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token "},{status:400})
        }
        const id=user._id;
        console.log(user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        // console.log(user);
        // await User.findByIdAndUpdate(id,{verifyToken:NULL,verifyTokenExpiry:NULL,isVerified:true});
        // user.save();
        return NextResponse.json({
            message:"Email verified succesfully",
            success:true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}