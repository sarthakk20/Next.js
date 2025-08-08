import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async({email, emailType , userid}:any) => {

    try {
        // Create a hashed token
        const hashedToken = await bcrypt.hash(userid.toString(),10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userid,
                {
                verifyToken : hashedToken,
                verifyTokenExpiry : Date.now() + 360000
                }
            )
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userid,
                {
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 360000
                }
            )
        }
        // paste the details from the mailtrap
        var transporter = nodemailer.createTransport({
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
            subject: emailType === 'VERIFY' ? "verify your email" : "reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
            <br><br>
            <a>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a>
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error("Error while sending email: ", error.message);
    }
}