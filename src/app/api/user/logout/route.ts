// backend/server side
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        
        // Clear the session or token here
        const response = NextResponse.json({ 
            message: 'Logout successful',
            success: true
            });

        response.cookies.set('token', '', { httpOnly:true ,expires: new Date(0)}); // Clear the token cookie
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