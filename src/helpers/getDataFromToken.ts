import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export function getDataFromToken (request: NextRequest){
    try {
        const token = request.cookies.get("access_token")?.value || ""
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        return decodedToken.id
    } catch (error: any) {
        throw new Error (error.message)
        
    }
    
}