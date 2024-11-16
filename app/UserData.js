"use client"
import React, { useEffect, useState } from 'react'

const UserData = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await fetch('/api/user')
            const data = await res.json()
            setUserData(data)
        }
        getData()
    }, [])

    return (
        <div className='min-h-[60vh] bg-slate-500'>
            {userData.map((data) => (
                <div key={data._id}>
                    <h1>{data.name}</h1>
                    <p>{data.email}</p>
                </div>
            ))}
        </div>
    )
}

export default UserData
