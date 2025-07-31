import { log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connect(){
    const MONGO_URI = 'mongodb+srv://sample_user:sampleUser123@cluster0.2yyoivv.mongodb.net/';

    try{
            mongoose.connect(process.env.MONGO_URI || MONGO_URI);
            // mongoose.connect(MONGO_URI);
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