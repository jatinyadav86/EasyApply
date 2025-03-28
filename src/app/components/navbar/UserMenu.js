'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useDispatch } from 'react-redux'
import { onAuthenticationModalOpen } from '@/app/redux/slices/authSlice'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const menuRef = useRef(null)

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (
    <div className="hidden md:block relative my-4">
      <div ref={menuRef} className="flex items-center gap-3">
        <Link href={"/about"}>
          <div className="text-sm font-semibold text-[#222222] p-3 rounded-full cursor-pointer hover:bg-neutral-100 transition text-nowrap">About EaseApply</div>
        </Link>
        <div onClick={toggleOpen} className="py-1 px-3 h-12 border-[1px] border-[#dddddd] hover:shadow-[#00000014] flex items-center gap-3 rounded-full cursor-pointer hover:shadow-lg transition">
          <AiOutlineMenu />
          <Avatar name={currentUser?.name} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute py-2 rounded-xl border-[0.5px] border-[#dddddd] shadow-lg shadow-[#0000000d] w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer text-[#222222] font-semibold text-sm">
            {currentUser ? (
              <>
                <Link href={"/profile"}>
                  <div className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">Profile</div>
                </Link>
                <Link href={"/applied"}>
                  <div className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">Applied Services</div>
                </Link>
                <Link href={"/about"}>
                  <div className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">About EaseApply</div>
                </Link>
                <div onClick={() => signOut()} className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">Logout</div>
              </>
            ) : (
              <>
                <div onClick={() => { dispatch(onAuthenticationModalOpen()) }} className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">Login</div>
                <div onClick={() => { dispatch(onAuthenticationModalOpen()) }} className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">Sign up</div>
                <span className="w-full h-[1px] bg-[#dddddd] my-2"></span>
                <Link href={"/about"}>
                  <div className="px-4 py-3 hover:bg-[#f7f7f7] transition font-semibold">About EaseApply</div>
                </Link>
              </>
            )}
          </div>
        </div>
      )
      }
    </div >
  )
}

export default UserMenu