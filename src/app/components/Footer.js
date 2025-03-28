'use client'
import React from 'react'
import Logo from './navbar/Logo'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const Footer = () => {
    const pathname = usePathname();

    let isWhiteBackground = pathname === "/";

    return (
        <div className={`w-full lg:h-24 p-4 lg:p-6 ${isWhiteBackground ? "bg-white" : "bg-[#f7f7f7]"} flex justify-center items-center`}>
            <div className="w-full flex gap-5 flex-wrap justify-center md:justify-between items-center">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>
                <div className="flex gap-5 flex-wrap justify-center items-center text-[#4B5563]">
                    <div className="flex items-center justify-between gap-4 text-base font-semibold">
                        <Link href={"/privacy"}>
                            <div className="cursor-pointer hover:text-black">Privacy</div>
                        </Link>
                        <Link href={"/terms"}>
                            <div className="cursor-pointer hover:text-black">Terms</div>
                        </Link>
                        <Link href={"/contactUs"}>
                            <div className="cursor-pointer hover:text-black">Contact</div>
                        </Link>
                        <Link href={"/refund-policy"}>
                            <div className="cursor-pointer hover:text-black">Refund</div>
                        </Link>
                    </div>
                    <div className="">Copyright © 2025</div>
                </div>
                <div className=""></div>
                {/* <div className="flex items-center justify-between gap-4 text-[#4B5563]">
                    <FaFacebookF size={20} />
                    <FaTwitter size={20} />
                    <FaInstagram size={20} />
                    <FaGithub size={20} />
                </div> */}
            </div>
        </div>
    )
}

export default Footer