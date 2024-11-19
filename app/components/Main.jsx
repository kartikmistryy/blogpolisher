"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import Navbar from './Navbar'

const Main = () => {

  const [selectedPrompt, setSelectedPrompt] = useState()
  const [responsive, setResponsive] = useState(false)

  useEffect(() => {
    window.screen.width < 500 ? setResponsive(true) : setResponsive(false)
  }, [])

  return (
    <div className='flex flex-col w-full h-full relative'>
      <Navbar responsive={responsive} setResponsive={setResponsive}/>
      <div className='flex md:flex-row flex-col w-full'>
        <Sidebar responsive={responsive} setResponsive={setResponsive}
        changePrompt={setSelectedPrompt} currentPrompt={selectedPrompt}/>
        <MainPanel currentPrompt={selectedPrompt} changePrompt={setSelectedPrompt}/>
      </div>
    </div>
  )
}

export default Main