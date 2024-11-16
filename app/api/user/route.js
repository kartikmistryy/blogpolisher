import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email } = await request.json();
    await connectToDB();
    await User.create({ name, email });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
}

export async function GET() {
    await connectToDB()
    const usersData = await User.find({})
    return NextResponse.json(usersData)
}

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await connectToDB();
            const usersData = await User.find({});
            return res.status(200).json(usersData);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch users" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}