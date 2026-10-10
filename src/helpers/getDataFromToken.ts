import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  email: string;
}

export function getDataFromToken(request:NextRequest) {

    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        if (!encodedToken) {
        throw new Error("Authentication token is missing");
        }

        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET || '') as { userId: string, email: string };
         if (
        typeof decodedToken === "string" ||
        typeof decodedToken.userId !== "string" ||
        typeof decodedToken.email !== "string"
        ) {
        throw new Error("Invalid token payload");
        }
        return decodedToken.userId;
                
    } catch (error:unknown) {
       const message =
    error instanceof Error
      ? error.message
      : "Something went wrong";

    throw new Error(message);
    }
    
}