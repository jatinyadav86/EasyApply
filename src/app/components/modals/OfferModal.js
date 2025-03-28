'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const OfferModal = () => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        if (showModal) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;  // Prevent layout shift
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';   // Reset padding
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';   // Cleanup on unmount
        }
    }, [showModal]);

    const handleClick = () => {
        setShowModal(false)
    }

    if (!showModal) {
        return null
    }

    return (
        <div className="flex justify-center h-screen items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="relative flex justify-center items-center mx-auto h-full">
                <div className={`translate duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative w-[90vw] md:w-[60vw] border-0 rounded-lg outline-none focus:outline-none">
                        <button onClick={handleClick} className="p-1 text-white border-0 transition absolute top-3 right-4 z-50">
                            <IoMdClose size={25} />
                        </button>
                        
                        {/* Wrapper with aspect ratio for auto height */}
                        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}> 
                            <Image src="/images/offer.png" alt="Slide 1" fill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferModal
