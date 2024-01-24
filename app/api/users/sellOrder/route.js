import { connect } from "../../../../utils/database";
import User from "../../../../models/user";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { price, cryptoNumber, cryptoId } = reqBody;
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        let coinSold = false; // Flag to check if the coin has been sold

        user.holdings.map((holding) => {
            if (holding.coinId === cryptoId) {
                let newstakeNo = parseInt(holding.stakeNo) - parseInt(cryptoNumber);
                holding.stakeNo = newstakeNo;
                let newamount = parseInt(holding.amount) - parseInt(cryptoNumber * price);
                holding.amount = newamount;
                let newBalance = parseInt(user.balance) + parseInt(cryptoNumber * price);
                user.balance = newBalance;
                coinSold = true; // Set the flag to true if the coin is sold
            }
        });

        if (coinSold) {
            const timestamp = Date.now();
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;

            const HistorySchema1 = {
                transactionType: `Sold ${cryptoId}`,
                amount: cryptoNumber * price,
                receiver: "self",
                date: formattedDate
            };
            console.log(HistorySchema1);

            user.history.push(HistorySchema1);
            await user.save(); // Ensure to wait for the save operation to complete
            return NextResponse.json({ status: 200 }, { message: "Coin has been sold" });
        } else {
            // Handle the case where the coin is not found in user holdings
            return NextResponse.json({ status: 404 }, { message: "Coin not found in user holdings" });
        }

    } catch (error) {
        console.log("Error occurred at the backend of sellOrder");
        console.log(error);
        return NextResponse.json({ status: 500 }, { message: "Internal server error" });
    }
}
