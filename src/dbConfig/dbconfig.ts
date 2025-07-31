import { log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connect(){
    dotenv.config();
    try{
        const MONGO_URI = process.env.MONGO_URI;
        if(!MONGO_URI){
            throw new Error("MongoDB URI is not defined in environment variables");
        }
            mongoose.connect(MONGO_URI);
            console.log("MongoDB uri : ", MONGO_URI);
            
            const connection = mongoose.connection;

                    connection.on("connected", () => {
                        console.log("MongoDB connected successfully");
                    });

                    connection.on('error',(err)=>{
                        console.log("MongoDB connection error please check your connection " + err);
                        process.exit();
                    });

                    connection.on('disconnected', () => {
                        console.log("MongoDB disconnected");
                    })
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}