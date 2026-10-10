import { connect } from '@/dbConfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { signupSchema } from "@/schemas/authSchema";
import toast from 'react-hot-toast';

export async function POST(request: NextRequest) {
    try {
        await connect();
        console.log("Inside signup route");
        const reqBody = await request.json();
        const validation = signupSchema.safeParse(reqBody);

        if (!validation.success) {
            toast.error("Invalid credentials");
        return NextResponse.json(
            {
            error: validation.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
        }

        const { username, email, password } = validation.data;
        // Check if user already exists with either email or username
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        console.log("existing user:", existingUser);

        if (existingUser) {
            const isEmailTaken = existingUser.email === email;

            return NextResponse.json(
                { error: isEmailTaken ? "User with this email already exists" : "Username is already taken" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Save user in database
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("Saved user:", savedUser);

        // Send verification email
        await sendEmail({
            email,
            emailType: 'VERIFY',
            userid: savedUser._id
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        toast.error(message);
        console.error("Signup error:", error);

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
