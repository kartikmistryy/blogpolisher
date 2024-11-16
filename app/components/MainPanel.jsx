"use client"

import React, { useEffect, useState } from 'react'
import { generateResponse, saveData } from '../api/functions/query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MainPanel = ({ currentPrompt, changePrompt }) => {

    const router = useRouter()

    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")

    const {data: session } = useSession()

    const submit = () => {
      if(prompt){
        generateResponse(prompt)
        .then(data => setResult(data))
      }
    }
    const copyText = () => {}

    const saveToDB = async() => {
      const user = session?.user.email
      if((prompt != "" && result != "") || user){
        saveData(user, prompt, result)
          .then(() => {
            router.refresh()
            router.replace('/')
            changePrompt({})
          })
          .catch((err) => console.log(err))
      }
    }

    useEffect(() => {
      setPrompt(currentPrompt?.prompt || "")
      setResult(currentPrompt?.generateResponse || "")
    }, [currentPrompt])

  return (
    <div className='flex w-[85vw] h-full'>
        <section className="flex md:flex-row flex-col gap-5 md:ml-4 md:p-2 p-4  w-full">
          <div className="h-full md:w-[35vw] w-full">
            <h1 className="my-3 text-sm text-gray-900">👇 Your content here...</h1>
            <textarea 
            type="text" 
            placeholder="Enter text to be polished..."
            value={prompt}
            className="text-gray-900 font-normal md:w-[35vw] w-full md:h-[75vh] h-[50vh] rounded-xl p-3  border-[#d2cfcf] bg-[#f9f9f9] text-sm shadow-sm border-[1px] outline-none placeholder:text-gray-800 placeholder:font-normal"
            onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={() => submit()} className="w-full h-[5vh] bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-white text-sm font-medium mt-2">Generate</button>
          </div>
        
          <div className="flex flex-col w-full">
            <span className="flex flex-row justify-between items-center">
              <h1 className="text-sm py-3 text-gray-900">⚡️ Optimised content here..</h1>
              <button onClick={() => saveToDB()} className="text-xs px-3 py-0.5 h-6 w-fit bg-green-500 text-white rounded-md">Save</button>
              <button onClick={() => copyText()} className="text-xs px-3 py-0.5 h-6 w-fit bg-[#1579dd] text-white rounded-md">Copy</button>
            </span>
            <textarea   
              type="text" 
              placeholder="🤖 Generated text will be displayed here..."
              value={result}
              className="text-gray-800 md:w-[45vw] w-full md:h-[82vh] h-[70vh] rounded-xl p-3 bg-transparent border-[#d2cfcf] bg-[#f9f9f9] shadow-sm text-sm border-[1px] outline-none  relative placeholder:text-gray-800 placeholder:font-normal"
              onChange={(e) => setResult(e.target.value)}
              />
          </div>

        </section>
    </div>
  )
}

export default MainPanel