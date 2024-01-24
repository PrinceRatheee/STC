import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import {NextRequest,NextResponse} from "next/server";
import User from "../../../../models/user";
import { connect } from "../../../../utils/database";
connect();

export async function GET(request){
    try {
        const userId=await getDataFromToken(request);
        const user=await User.findOne({_id:userId}).select("-password");
        // user.balance=3000;
        // user.save();
        if(!user){

            return NextResponse.json({
                status: 400,
                message:"Some error occured, please logout and signin again",
                data:user
            })
        }
        return NextResponse.json({
            status: 200,
            message:"User Found",
            data:user
        })
    } catch (error) {

        console.log("error in getting dashboard data");
        return NextResponse.json({error:error.message})
    }
}