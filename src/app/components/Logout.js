'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {
  return (
    <div onClick={() => signOut()} className="text-sm font-semibold underline cursor-pointer hover:scale-105">Log out</div>
  )
}

export default Logout