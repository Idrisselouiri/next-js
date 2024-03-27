import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId})
        return NextResponse.json({message: "User Found", data: user})

    } catch (error: any) {
        return NextResponse.json({message: error.message})
    }
}