import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbconfig';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const {newPassword,urlToken} = reqBody;
        console.log("New pass : ", newPassword);

        const user = await User.findOne({
            forgotPasswordToken : urlToken,
            forgotPasswordTokenExpiry: {$gt : Date.now()},
        })

        if(!user){
            return NextResponse.json({error:"Invalid or expired token"},{status:400})
        }
        
        const hasedNewPass = await bcrypt.hash(newPassword,10);
        user.password = hasedNewPass;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message : "Password Updated Successfully"},{status:200})
        
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({message: "Error resetting password", status: 500});
    }
}