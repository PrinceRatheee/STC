import { connect } from "../../../../utils/database";
import User from "../../../../models/user";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request) {
    try {
        console.log("dtyuioghj")
        const reqBody = await request.json();
        const { stakeNo,amount,address,coinId } = reqBody;
        console.log("coinId",coinId);
        console.log("stakeNo",stakeNo);
        console.log("amount",amount);

        const user = await User.findOne({ _id: address }).select("-password");
        const userId = await getDataFromToken(request);
        const selfUser = await User.findOne({ _id: userId }).select("-password");
        console.log(user,"user",selfUser,"selfUser");
        let cond=0;
        user.holdings.map(holding=>{
            // console.log("holding map",holding);      
            if(holding.coinId===coinId){
                let newstakeNo=parseInt(holding.stakeNo)+parseInt(stakeNo);
                // console.log(newstakeNo,"newStakeNo");
                holding.stakeNo=newstakeNo;
                let newamount=parseInt(holding.amount)+parseInt(amount);
                holding.amount=newamount;
                cond=1;
                user.save();  
               
                return NextResponse.json({status:200},{message:"holdings added to database"});
            }
        })
        if(cond==0){

            const HoldingCryptoSchema1 = { 
                coinId: coinId,
                stakeNo: stakeNo,
                amount: amount
            };
            console.log("beckend");
            user.holdings.push(HoldingCryptoSchema1);
            user.save();
            return NextResponse.json({status:200},{message:"Crypto sent to the address"});
        }
       
        
        selfUser.holdings.map(holding=>{
            // console.log("holding map",holding);      
            if(holding.coinId===coinId){
                let newstakeNo=parseInt(holding.stakeNo)-parseInt(stakeNo);
                // console.log(newstakeNo,"newStakeNo");
                holding.stakeNo=newstakeNo;
                let newamount=parseInt(holding.amount)-parseInt(amount);
                holding.amount=newamount;
                
                selfUser.save();  
                
                return NextResponse.json({status:200},{message:"Crypto sent to the address"});
            }
        })
        const timestamp = Date.now();

        // Create a new Date object using the timestamp
        const date = new Date(timestamp);

        // Extract the components of the date
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;

        const HistorySchema1={
            transactionType:`Send ${coinId}`,
            amount:amount,
            receiver:address,
            date:formattedDate,

        }
        selfUser.history.push(HistorySchema1);
        selfUser.save();
        const HistorySchema2={
            transactionType:`Send ${coinId}`,
            amount:amount,
            receiver:"self",
            date:formattedDate,
            crypto:coinId,
            stakeNo:stakeNo,
            transferType:"received crypto"



        }
        user.history.push(HistorySchema2);
        user.save();
        
        return NextResponse.json({status:200},{message:"Crypto sent at the address"});
    } catch (error) {
        console.log("Failed to send crypto at");
        console.log(error);
        return NextResponse.json({status:400},{error:"Failed to send crypto at the address"});
    }

}