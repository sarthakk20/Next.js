import {connect} from '@/dbConfig/dbconfig';
import User from '@/models/userModel';
import {  NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { log } from 'node:console';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, password} = reqBody;
        console.log("Request body ",reqBody);

        //check if user exist or not
        const userName = await User.findOne({username});
        if(!userName) {
            console.log("WTF - User not found");
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // check password
        const isPasswordValid = await bcryptjs.compare(password, userName.password);
        if(!isPasswordValid){
            console.log("WTF - Invalid Password");
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
        
    } catch (error: any) {
        return NextResponse.json({error: error.message , status: 500, success: false});
    }
}