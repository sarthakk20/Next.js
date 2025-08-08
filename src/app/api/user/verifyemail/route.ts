import {connect} from "@/dbConfig/dbconfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = await reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if (!user) {
            return NextResponse.json({error:"Invalid token"},{status:404})
        }
        // if user found, then update the user to verified
        // and clear the verifyToken and verifyTokenExpiry
        console.log("User - ",user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })
        
    } catch (error:any) {
        console.error("Error in POST /api/user/verifyemail:", error.message);
        return NextResponse.json(
            {error: "Internal Server Error"}, 
            {status: 500});
    }
}