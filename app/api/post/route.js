import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB()
    const allPosts = await Post.find({})
    return NextResponse.json(allPosts)
}