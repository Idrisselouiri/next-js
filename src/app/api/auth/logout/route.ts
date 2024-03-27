import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function GET(){
    try {
        const response = NextResponse.json({message: "User has been Logout", success: true})
        response.cookies.set("access_token", "", {httpOnly: true, expires: new Date(0)})
        return response
    } catch (error: any) {
        return NextResponse.json({message:error.message, success: false})
    }
}