import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)
    
        //Check if the user already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message: "User Already Exist", success: false}, {status:400})
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({username, email, password: hashedPassword})
        const savedUser = await newUser.save()
        console.log(savedUser)
        return NextResponse.json({message: "User has been created", success: true, savedUser})
    } catch (error: any) {
        return NextResponse.json({message: error.message , success: false}, {status: 500})

    }
}