"use client"

import React, { useEffect, useRef, useState } from 'react'
import { generateResponse, saveData } from '../api/functions/query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MainPanel = ({ currentPrompt, changePrompt }) => {

    const router = useRouter()

    const responseRef = useRef(null)

    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)

    const {data: session } = useSession()

    const submit = () => {
      if(prompt){
        setLoading(true)
        generateResponse(prompt)
        .then(data => {
          setResult(data)
          setLoading(false)
        })
      }
    }
    
    const copyText = () => {
      navigator.clipboard.writeText(responseRef.current.value)
    }

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
              <span className='flex flex-row gap-2 pr-5'>
                <button onClick={() => saveToDB()} className=' border-0 px-3 py-1 text-sm rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium'>Save</button>
                <button onClick={() => copyText()} className='border-[1px] border-[#2997ff] px-3 py-1 text-sm rounded-2xl bg-[] text-[#2997ff] font-medium'>Copy</button>
              </span>
            </span>
            <textarea   
              ref={responseRef}
              type="text" 
              value={result}
              placeholder={!loading ? '🤖 Generated text will be displayed here...': 'loading...'}
              className={`text-gray-800 md:w-[45vw] w-full md:h-[82vh] h-[70vh] rounded-xl p-3 border-[#d2cfcf] bg-[#f9f9f9] shadow-sm text-sm border-[1px] outline-none  relative placeholder:text-gray-800 placeholder:font-normal ${result.length > 0 ? "bg-transparent" : "bg-gray-200 opacity-[0.75]"}`}
              onChange={(e) => setResult(e.target.value)}
              >
              </textarea>
          </div>

        </section>
    </div>
  )
}

export default MainPanel