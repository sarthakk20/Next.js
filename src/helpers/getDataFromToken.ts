import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getDataFromToken(request:NextRequest) {

    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(encodedToken, process.env.TOKEN_SECRET || '') as { userId: string, email: string };

        return decodedToken.id;
    } catch (error:any) {
        throw new Error(`Error in getDataFromToken: ${error.message}`);
    }
    
}