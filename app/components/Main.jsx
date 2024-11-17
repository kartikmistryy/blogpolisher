"use client"

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'

const Main = () => {

  const [selectedPrompt, setSelectedPrompt] = useState()

  return (
    <div className='flex flex-row w-full h-full'>
        <Sidebar changePrompt={setSelectedPrompt} currentPrompt={selectedPrompt}/>
        <MainPanel currentPrompt={selectedPrompt} changePrompt={setSelectedPrompt}/>
    </div>
  )
}

export default Main