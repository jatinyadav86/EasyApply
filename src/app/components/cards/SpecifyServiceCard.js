"use client"
import { onAddServiceModalOpen } from '@/app/redux/slices/applySlice'
import { onAuthenticationModalOpen } from '@/app/redux/slices/authSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../Button'
import Image from 'next/image'
import toast from 'react-hot-toast'

const SpecifyServiceCard = ({ user, formType }) => {
    const dispatch = useDispatch()

    const applyService = async () => {
        if (!user) {
            toast.error("You have to login first")
            dispatch(onAuthenticationModalOpen())
            return
        }
        dispatch(onAddServiceModalOpen())
    }

    return (
        <div onClick={applyService} className="w-80 sm:w-full h-96 rounded-md mx-auto bg-white overflow-hidden border-[1px] border-solid border-[#dddddd] shadow-xl shadow-[#00000014] flex flex-col items-center justify-between cursor-pointer">
            <div className="w-full h-44 relative">
                <Image alt='image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} src="/images/not-found.jpg" />
            </div>
            <div className="text-[15px] px-4 space-y-1 w-full">
                <div className="font-bold">{formType === "educational" ? "Application Form Not Found !" : "Job Not Found !"}</div>
                <div className="font-bold"></div>
                <div className="text-[#6a6a6a]">Click below to let us Know what are you looking for</div>
            </div>
            <div className="w-full h-11 font-semibold flex items-center justify-between px-4 mb-2">
                <Button small label={"Specify your application form"} />
            </div>
        </div>
    )
}

export default SpecifyServiceCard