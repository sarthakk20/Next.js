import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connect} from '@/dbConfig/dbconfig';
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import {z} from 'zod';

const forgotPasswordSchema = z.object({
    email : z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest){
    try {
        await connect();
        const reqBody = await request.json();
        const validation = forgotPasswordSchema.safeParse(reqBody);

        if (!validation.success) {
            return NextResponse.json(
            {
            success: false,
            errors: validation.error.flatten().fieldErrors,
        },
        { 
            status: 400
        }
        );
        }

        const { email } = validation.data;
        console.log(email);

        if (!email) {
            return NextResponse.json({ error: "Please provide an email" }, { status: 400 });
        }

        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const token = await bcrypt.hash(user._id.toString(), 10);

        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER || process.env.MAIL_USER || process.env.user || process.env.users,
                pass: process.env.MAILTRAP_PASS || process.env.MAIL_PASS || process.env.password
            }
        });

        const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${token}`;
        const mailOptions = {
            from: 'sarthak20.sonawane@gmail.com',
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.
            <br><br>
            <a href="${resetUrl}">${resetUrl}</a>
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return NextResponse.json({
            message: "Password reset email sent",
            success: true,
            mailResponse
        }, { status: 200 });

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
