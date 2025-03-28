'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCircleArrowRight } from 'react-icons/fa6'


const SubServiceCard = ({ serviceTitle, subService}) => {
    const router  = useRouter()

    const setRoute = (str)=>{
        return str.replace(/\s+/g, '_').toLowerCase()

    }

    return (
        <div onClick={()=> router.push(`/services/${setRoute(serviceTitle)}/${subService._id}`)} className="w-[350px] lg:w-[320px] xl:w-[350px] h-14 border rounded-md shadow-sm shadow-gray-400 flex items-center justify-between px-5">
            <Image alt='aadhar' width={50} height={50} src="/icon/aadhar.svg" />
            <div className="text-lg font-bold">{subService.title}</div>
            <div className="w-[20%]">
                <FaCircleArrowRight className='size-7 text-rose-400 ml-auto' />
            </div>
        </div>
    )
}

export default SubServiceCard