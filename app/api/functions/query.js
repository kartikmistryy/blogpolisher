"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { responseKeywords, responseWordCount, responselanguageManner } from "./data";
import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import Post from "@/models/post";

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY)

export async function generateResponse(prompt){
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const newPrompt = 
    prompt +
    `\n Rephrase this text for a real world blog with
    \n- ${responseWordCount * 2} words atleast
    \n- ${responselanguageManner} manner
    \n Include keywords like ${responseKeywords}
    `
    const result = await model.generateContent(newPrompt);
    const response = result.response;
    const text = response.text();
    return text
}

export async function saveData(user, prompt, result) {
    try{
        await connectToDB()
        const userData = await User.find({email: user})
        const userID = userData[0]._id
        const newPost = new Post({
            userId: userID,
            prompt: prompt,
            generateResponse: result
        })
        await newPost.save()
        const updatedPosts = await Post.find({userId: userID})
        return JSON.stringify(updatedPosts)
    }
    catch(err) {
        console.log("Has error:", err)
    }  
}


export const run = async(email) => {
    const userId = await User.find({email: email}).then((res) => res[0].id)
    const userPosts = await fetch(`${process.env.NEXT_URL}/api/post/${userId}`)
    const posts = await userPosts.json()
    return posts
}  