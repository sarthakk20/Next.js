import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async({email, emailType, userid}: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcrypt.hash(userid.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userid, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userid, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        }

        // nodemailer transport configuration
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER || process.env.MAIL_USER || process.env.user || process.env.users,
                pass: process.env.MAILTRAP_PASS || process.env.MAIL_PASS || process.env.password
            }
        });

        const isVerify = emailType === 'VERIFY';
        const targetPath = isVerify ? "verifyemail" : "resetpassword";
        const actionText = isVerify ? "verify your email" : "reset your password";
        const targetUrl = `${process.env.DOMAIN}/${targetPath}?token=${hashedToken}`;

        const mailOptions = {
            from: 'sarthak20.sonawane@gmail.com',
            to: email,
            subject: isVerify ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${targetUrl}">here</a> to ${actionText}.
            <br><br>
            <a href="${targetUrl}">${targetUrl}</a>
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error(`Error while sending email: ${error.message}`);
    }
}
