import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";

export async function GET(request: NextRequest) {

    try {
        await connect();
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password -isAdmin");
        
        return NextResponse.json({
            message: "User Found",
            data: user,
        })

    } catch (error: unknown) {
    const message =
        error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
        { error: message },
        { status: 500 }
    );
}
}