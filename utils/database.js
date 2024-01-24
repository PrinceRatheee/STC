import mongoose from "mongoose";


export async function connect() {
    try{
            mongoose.connect("mongodb+srv://rathi26:Prince1234@cluster0.r4yor4s.mongodb.net/CryptoProject");
            const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database connected");
        })
        connection.on("error", () => {
            console.log("Error connecting to database");
            process.exit();
        })

    }catch(error){
        console.log("Error connecting to database");
    }
}