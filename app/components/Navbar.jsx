"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
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
          <h1 className="text-lg font-bold  text-gray-900">BlogPolisher</h1>
        </span>

        <div className="flex flex-row items-center justify-center gap-4">
          <ul className="flex flex-row gap-4">
            <li><a className="text-2xl text-gray-700" href="https://x.com/kartikmistryy"><AiOutlineTwitter/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://github.com/developedbykmistry"><AiOutlineGithub/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.instagram.com/karrtikkk__/"><AiOutlineInstagram/></a></li>
            <li><a className="text-2xl text-gray-700" href="https://www.linkedin.com/in/kartikmistry19/"><FaLinkedin/></a></li>
          </ul>

          {!session?.user ? (
            <button className='border-0 px-2 py-1 text-xs rounded-2xl bg-[#1579dd] text-white font-medium' onClick={() => signIn('google')}>Login</button>
        ): (
          <span className='flex flex-row justify-center items-center p-1.5 gap-2'>
              <button className='border-[1px] border-gray-400 px-2 py-1 text-xs rounded-2xl font-medium' onClick={() => signOut()}>Logout</button>
              <span className='rounded-full border-red-100'>
              {session?.user.image ? <Image className='rounded-full' width={26} height={26} src={session?.user.image} alt='user-img'/> : ""}</span>
          </span>
        )}
        </div>
      </nav>
  )
}

export default Navbar