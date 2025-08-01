import {connect} from '@/dbConfig/dbconfig';
import User from '@/models/userModel';
import {  NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


connect();
export async function POST(request:NextRequest){
try {
    const ReqBody = await request.json();
    const {username,email,password} = ReqBody;

    // check if user already exist
    const user = await User.findOne({email});

    if(user){
        return NextResponse.json({error:"User already exist"},{status:400});
    }

    // hashPassword

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt);
    console.log("Hashed Password: ", hashedPassword);
    

    // save user in a database
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser);

    return NextResponse.json(
        {message: "User created successfully",
        success:true,
        status:200});
    
    
} catch (error:any) {
    return NextResponse.json({error: error.message},{status:500});
}
}