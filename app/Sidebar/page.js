import React from 'react'

export default async function Sidebar() {

    const res = await fetch(`${process.env.NEXT_URL}/api/user`, {cache: 'no-store'})
    const data = await res.json()

    return (
        <div>
            {data.map((user) => (
                <div key={user._id}>
                    <h1>{user.name}</h1>
                    <h4>{user.email}</h4>
                </div>
            ))}
        </div>
    )
}
