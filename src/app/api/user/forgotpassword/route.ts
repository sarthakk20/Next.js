import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {connect} from '@/dbConfig/dbconfig';
import User from "@/models/userModel";
import nodemailer from "nodemailer";

connect();
export async function POST(request: NextRequest){
    try {
        const reqBody = request.json();
        const {email} = await reqBody;
        console.log(email);
        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const token = await bcrypt.hash(user._id.toString(),10);

        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 480000;
        user.save()

        let transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.user,
                    pass: process.env.password
                }
                });
        
                const mailOptions = {
                    from : 'sarthak20.sonawane@gmail.com',
                    to: email,
                    subject:"Reset your password",
                    html:`<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${token}">here</a> to 
                    reset your password.
                    <br><br>
                    <a>${process.env.DOMAIN}/resetpassword?token=${token}</a>
                    </p>`
                }
                const mailResponse = await transporter.sendMail(mailOptions);
                return NextResponse.json
                ({message: "Password reset email sent", status: 200, mailResponse});
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}