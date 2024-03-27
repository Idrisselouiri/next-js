import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)
    
        //Check if the user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message: "User Not Exist", success: false}, {status:400})
        }
        const verifyPassword = bcryptjs.compareSync(password, user.password)
        if(!verifyPassword){
            return NextResponse.json({message: "Invalid Password", success: false}, {status: 404})
        }
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET! )
        const response = NextResponse.json({message: "login successfull", success: true})
        response.cookies.set('access_token', token, {
            httpOnly: true, 

        })
        return response
    } catch (error: any) {
        return NextResponse.json({message: error.message , success: false}, {status: 500})

    }
}