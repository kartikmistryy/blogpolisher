"use client"

import React, { useEffect, useState } from 'react'
import { changeKeywords, changeLanguageManner, changeSelectedPrompt, changeWordCount } from '../api/functions/data'
import { useSession } from 'next-auth/react'
import { run } from '../api/functions/query'
import uuid from 'react-uuid'

const Sidebar = ({ changePrompt, currentPrompt }) => {

    const languages = ["💼 Professional", "🤝 Friendly", "📚 Educative", "🤭 Sarcastic"]

    const [languageManner ,setLanguageManner] = useState("")
    const [keywords, setKeywords] = useState([])
    const [keyword, setKeyword] = useState("")
    const [wordCount, setWordCount] = useState(200)
    const [userHistory, setUserHistory] = useState([])
    const { data:session, status } = useSession()

    const addKeyword = (e) => {
        if(e.key == "Enter"){
            if(keyword.length > 1){
                setKeywords(prev => [...prev, keyword])
                setKeyword("")
            }
        }
    }

    const renderPromptAndResponse = (element) => {
        changePrompt(element)
    }
    
    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            run(session.user.email)
            .then((res) => setUserHistory(res))
        }
    }, [status, session, currentPrompt]);

    useEffect(() => {
        changeKeywords(keywords)
    }, [keywords])

    const removeKeyword = (e) => {
        setKeywords(keywords.filter((key) => {
            return key != e.target.innerText
        }))
    }
    
    return (
        <div className="flex flex-col max-w-[15vw] w-full max-h-[100vh] overflow-y-scroll border-r-[1px] pb-4">
            {userHistory.length >= 1 && (
                <div className='flex flex-col p-0 py-4 gap-2'>
                {userHistory.map((element) => (
                        <span onClick={() => renderPromptAndResponse(element)} key={element._id} className="flex item-center justify-start font-normal text-[14px] text-[#4b5563] px-2 py-1.5 hover:bg-[#eee] rounded-md ml-2 cursor-pointer">{ element.prompt.length > 28 ? element.prompt.slice(0, 28) + "..." : element.prompt
                        }</span>
                ))}
            </div>
            )}

            <ul className="flex flex-col gap-2 px-2 py-2">
                <label className="text-sm font-[420] my-1 ml-2 text-gray-900" htmlFor="">Select your tone</label>
                {languages.map((language) => (
                    <li
                    onClick={(e) => {
                        setLanguageManner(e.target.innerText)
                        changeLanguageManner(e.target.innerText)
                    }}
                    className={language == languageManner ? "flex item-center justify-start font-normal text-[14px] text-[#4b5563] px-3  py-1.5 bg-[#eeeeee] hover:bg-[#eee] rounded-md ml-2 cursor-pointer" : "flex item-center justify-start font-normal text-[14px] text-[#4b5563] px-3 py-1.5 hover:bg-[#eee] rounded-md ml-2 cursor-pointer"} key={language}>{language}</li>
                ))}
            </ul>

            <span className="flex flex-col gap-4 w-full border-b-[1px] p-4">
                <label className="text-sm" htmlFor=""><span className="text-sm font-[420] text-gray-900">Words</span>:
                <input type="number" onChange={(e) => {
                    setWordCount(e.target.value)
                    changeWordCount(e.target.value)
                }} value={wordCount} className="bg-transparent w-[50px] mx-2 text-gray-900"
                />
                </label>
                <input type="range" name="wordCount" 
                value={wordCount}
                onChange={(e) => {
                    setWordCount(e.target.value)
                    changeWordCount(e.target.value)
                }}
                min={100}
                max={1000}/>
            </span>

            <span className='flex flex-col p-4 gap-2'>
                <label className="text-sm font-[420] text-gray-900">Keywords</label>
                <input type="text" className="py-1 px-2 text-sm bg-transparent border-[1px] rounded-md border-[#e5e5e5] outline-none text-gray-900" 
                value={keyword}
                onKeyDown={(e) => addKeyword(e)}
                onChange={(e) => setKeyword(e.target.value)}/>

                <div className="grid grid-cols-auto-fill gap-1 max-h-[350px] overflow-scroll">
                    {keywords.map((word) => {
                        return <span
                        onClick={(e) => removeKeyword(e)} className="border-[1px] border-[#1579dd] text-[#1579dd] py-1 px-2 rounded-xl flex items-center justify-center text-xs w-fit hover:bg-[hsl(209,100%,95%)]" key={uuid()}>{word}</span>
                    })}
                </div>
            </span>
        </div>
  )
}

export default Sidebar