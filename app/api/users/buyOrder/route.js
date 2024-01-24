import { connect } from "../../../../utils/database";
import User from "../../../../models/user";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { coinId, stakeNo, amount } = reqBody;
        // console.log("coinId",coinId);
        // console.log("stakeNo",stakeNo);
        // console.log("amount",amount);

        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        let cond = 0;
        user.holdings.map(holding => {
            // console.log("holding map",holding);      
            if (holding.coinId === coinId) {
                let newstakeNo = parseInt(holding.stakeNo) + parseInt(stakeNo);
                // console.log(newstakeNo,"newStakeNo");
                holding.stakeNo = newstakeNo;
                let newamount = parseInt(holding.amount) + parseInt(amount);
                holding.amount = newamount;
                let newBalance = parseInt(user.balance) - parseInt(amount);
                user.balance = newBalance;
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

                // Create a formatted date string
                const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;
                const HistorySchema1 = {
                    transactionType: `Bought ${coinId}`,
                    amount: amount,
                    receiver: "self",
                    date: formattedDate

                }
                user.history.push(HistorySchema1);
                user.save();
                cond = 1;
                return NextResponse.json({ status: 200 }, { message: "holdings added to database" });
            }
        })
        if (cond == 0) {

            const HoldingCryptoSchema1 = {
                coinId: coinId,
                stakeNo: stakeNo,
                amount: amount
            };
            console.log("beckend");
            user.holdings.push(HoldingCryptoSchema1);
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

            // Create a formatted date string
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;
            const HistorySchema1 = {
                transactionType: `Bought ${coinId}`,
                amount: amount,
                receiver: "self",
                date: formattedDate

            }
            user.history.push(HistorySchema1);
            user.save();
            return NextResponse.json({ status: 200 }, { message: "holdings added to database" });
        }



        return NextResponse.json({ status: 200 }, { message: "holdings added to database" });
    } catch (error) {
        console.log("gfdcghj");
        console.log(error);
    }

}