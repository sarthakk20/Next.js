import {connect} from '@/dbConfig/dbconfig';
import User from '@/models/userModel';
import {  NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {z} from 'zod';

const loginSchema = z.object({
  username: z.string().min(3, "Invalid username"),
  password: z.string().min(6, "Invalid password"),
});

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();

        const validation = loginSchema.safeParse(reqBody);

        if (!validation.success) {
        return NextResponse.json(
            {
            success: false,
            errors: validation.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
        }

        const { username, password } = validation.data;
        console.log("Request body ",reqBody);

        //check if user exist or not
        const userName = await User.findOne({username});
        if(!userName) {
            console.log("User not found");
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // check password
        const isPasswordValid = await bcryptjs.compare(password, userName.password);
        if(!isPasswordValid){
            console.log("Invalid Password");
            return NextResponse.json({error: "Invalid Password!!!"}, {status:400})
        }
        // if user exist and password is valid, then return success response
        console.log("User found and password is valid");        
        // you can also generate a token here if needed
        // generate Token data

        const tokenData = {
            id : userName._id,
            email : userName.email,
            username : userName.username
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login successfully!",
            success: true
        })

        response.cookies.set("token",token,{
            httpOnly : true,
        })

        return response;
        
    } catch (error: unknown) {
    const message =
        error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
        { error: message },
        { status: 500 }
    );
}
}