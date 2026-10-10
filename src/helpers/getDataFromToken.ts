import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request:NextRequest) {

    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        if (!encodedToken) {
            throw new Error("Authentication token is missing");
        }
        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET || '') as { id: string };
        return decodedToken.id;
    } catch (error:unknown) {
       const message =
    error instanceof Error
      ? error.message
      : "Something went wrong";

    throw new Error(message);
    }
    
}