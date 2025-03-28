'use client'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { GoHome } from 'react-icons/go'
import { GoHomeFill } from 'react-icons/go'
import { RiInformation2Line } from 'react-icons/ri'
import { RiInformation2Fill } from 'react-icons/ri'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { onAuthenticationModalOpen } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

const BottomBar = ({ currentUser }) => {
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();
    const dispatch = useDispatch()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if scrolling up or down
            if (currentScrollY < lastScrollY) {
                setIsScrollingUp(true);   // Scrolling up -> show bottom bar
            } else {
                setIsScrollingUp(false);  // Scrolling down -> hide bottom bar
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`w-full flex flex-col items-center justify-center border-t border-[#EBEBEB] fixed bottom-0 z-30 md:hidden transition-transform duration-300 ${isScrollingUp ? 'translate-y-0' : 'translate-y-full'
            }`}>
            <div className="w-full h-[70px]  bg-white text-neutral-500 flex items-center justify-around px-5">
                <Link href='/'>
                    <div className="home flex flex-col items-center gap-1">
                        {pathname === '/' ? <GoHomeFill className='size-6' /> : <GoHome className='size-6' />}
                        <span className='text-xs font-semibold'>Home</span>
                    </div>
                </Link>
                <Link href='/about'>
                    <div className="library flex flex-col items-center gap-1">
                        {pathname === '/about' ? <RiInformation2Fill className='size-6' /> : <RiInformation2Line className='size-6' />}
                        <span className='text-xs font-semibold '>About</span>
                    </div>
                </Link>
                {currentUser && (
                    <Link href='/applied'>
                        <div className="library flex flex-col items-center gap-1">
                            {pathname === '/applied' ? (
                                <Image src='/images/applied.png' alt='applied services' width={24} height={24} />
                            ) : (
                                <Image src='/images/applied2.png' alt='applied services' width={24} height={24} />
                            )}
                            <span className='text-xs font-semibold '>Applied Services</span>
                        </div>
                    </Link>
                )}
                {!currentUser ? (
                    <div onClick={() => { dispatch(onAuthenticationModalOpen()) }} className="logo flex flex-col items-center gap-1">
                        <div className="size-6">
                            <Avatar name={currentUser?.name} />
                        </div>
                        <span className='text-xs font-semibold'>Log in</span>
                    </div>
                ) : (
                    <Link href='/profile'>
                        <div className="logo flex flex-col items-center gap-1">
                            {pathname === '/profile' ? (
                                <div className="size-6">
                                    <Avatar name={currentUser?.name} />
                                </div>
                            ) : (
                                <div className="size-6 text-[#737373] rounded-full border-2 border-[#737373] flex items-center justify-center font-bold text-md">{currentUser.name?.charAt(0)}</div>
                            )}

                            <span className='text-xs font-semibold'>Profile</span>
                        </div>
                    </Link>
                )}

            </div>
        </div>
    )
}

export default BottomBar