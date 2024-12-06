import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = params;

    try {
        console.log("Fetching posts for userId:", userId);

        // Connect to the database
        await connectToDB();

        // Validate userId
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Fetch posts for the user
        const posts = await Post.find({ userId });

        console.log("Posts found:", posts);

        // Return the posts as JSON
        return NextResponse.json(posts, { status: 200 });
    } catch (err) {
        console.error("Error fetching posts:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
