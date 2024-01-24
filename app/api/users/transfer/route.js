import { connect } from "../../../../utils/database";
import User from "../../../../models/user";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { amount, address } = reqBody;
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: address }).select("-password");
        const selfUser = await User.findOne({ _id: userId }).select("-password");
        console.log("backend user", user.balance, selfUser);

        if (user.balance === undefined) {
            user.balance = 0;
        }
        user.balance = parseInt(user.balance) + parseInt(amount);

        selfUser.balance = parseInt(selfUser.balance) - parseInt(amount);
        selfUser.save();
        user.save();
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

        const HistorySchema1 = {
            transactionType: `Send ${address}`, // Assuming coinId is meant to be address
            amount: amount,
            receiver: address,
            date: formattedDate
        };
        selfUser.history.push(HistorySchema1);
        selfUser.save();
        const HistorySchema2 = {
            transactionType: `Received ${selfUser._id}`, // Assuming coinId is meant to be address
            amount: amount,
            receiver: "self",
            date: formattedDate
        };

        user.history.push(HistorySchema2);
        user.save();

        return NextResponse.json({ status: 200 }, { message: "Fund has been transferred" });
    } catch (error) {
        console.log("Error occurred at the backend to transfer funds");
        console.log(error);
        return NextResponse.json({ status: 500 }, { message: "Internal server error" });
    }
}
