import { log } from "console";
import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)

            const connection = mongoose.connection;

                connection.on("connected", () => {
                console.log("MongoDB connected successfully");

                connection.on('error',(err)=>{
                console.log("MongoDB connection error please check your connection" + err);
                process.exit();
            })
        });
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}