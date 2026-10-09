import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbconfig';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {z} from 'zod';

const resetPasswordSchema = z.object({
    newPassword : z.string().min(6, "Password must be at least 6 characters"),
    urlToken : z.string(),
});

export async function POST(request: NextRequest) {

    try {
        await connect();
        const reqBody = await request.json();

        const validation = resetPasswordSchema.safeParse(reqBody);
        if (!validation.success) {
            return NextResponse.json(
            {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
            );
            }
        const {newPassword,urlToken} = validation.data;
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
        
    } catch (error: unknown) {
    const message =
        error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
        { error: message },
        { status: 500 }
    );
}
}