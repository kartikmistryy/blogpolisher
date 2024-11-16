import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = await params;

    try{
        console.log(userId)
        await connectToDB()
        const posts = await Post.find({userId: userId})
        console.log(posts)
        return NextResponse.json(posts)
    }catch(err) {
        console.log(err)
    }
}