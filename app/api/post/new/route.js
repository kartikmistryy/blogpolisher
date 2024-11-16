import { connectToDB } from "@/lib/db"
import Post from "@/models/post"
import { NextResponse } from "next/server"

export async function POST(request) {
    try{
        const {userId, prompt, generatedResponse} = await request.json()
        await connectToDB()
        await Post.create({userId, prompt, generatedResponse})
        return NextResponse.json({message: "Post saved to history"}, {status: 201})
    }
    catch(err) {
        console.log("Has error:", err)
    }
}