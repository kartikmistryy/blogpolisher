"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineGithub } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

const Navbar = () => {

  const {data: session} = useSession()

  return (
    <nav className="flex flex-row justify-between items-center py-2 px-4 h-[5vh] w-full border-b border-[#e5e5e5]">
        <span>
          <h1 className="text-lg font-medium  text-gray-900">BlogPolisher</h1>
        </span>

        <div className="flex flex-row">
          <ul className="flex flex-row gap-4">
            <li><a className="text-2xl text-gray-700" href="https://x.com/kartikmistryy"><AiOutlineTwitter/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://github.com/developedbykmistry"><AiOutlineGithub/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.instagram.com/karrtikkk__/"><AiOutlineInstagram/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.linkedin.com/in/kartikmistry19/"><FaLinkedin/></a></li>
          </ul>
        </div>

        {!session?.user ? (
          <button onClick={() => signIn('google')}>Login</button>
        ): (
          <button onClick={() => signOut()}>Logout</button>
        )}
      </nav>
  )
}

export default Navbar