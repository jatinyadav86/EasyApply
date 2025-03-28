'use client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const Options = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (id) => {
    if (pathname !== "/") {
      router.push('/')
      setTimeout(() => {
        scrollToSection(id)
      }, 1000)
    } else {
      scrollToSection(id)
    }
  }

  return (
    <div className=" h-14 md:h-12 mx-6 md:mx-0 rounded-full border-[1px] border-solid border-[#dddddd] shadow-lg shadow-[#0000000d] hover:shadow-[#00000014] my-2 md:my-4">
      <div className="h-full mx-auto flex items-center">
        <div onClick={() => handleClick("services")} className="text-sm px-4 font-bold cursor-pointer">Services</div>
        <span className='w-[1px] h-6 bg-[#dddddd]'></span>
        <div onClick={() => handleClick("educatioal")} className="text-sm px-4 font-bold cursor-pointer">Edu. Form</div>
        <span className='w-[1px] h-6 bg-[#dddddd]'></span>
        <div onClick={() => handleClick("govt_Jobs")} className="text-sm px-4 font-bold cursor-pointer">Govt Jobs Form</div>
      </div>
    </div>
  )
}

export default Options