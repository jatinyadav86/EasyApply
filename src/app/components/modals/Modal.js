'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MdArrowBackIos } from 'react-icons/md'

const Modal = ({ isOpen, onIconClick, title, body, icon }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
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
    }, [isOpen]);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClick = useCallback(() => {
        setShowModal(false)
        setTimeout(() => {
            onIconClick()
        }, 300);
    }, [onIconClick])

    if (!isOpen) {
        return null
    }

    return (
        <div className="flex justify-center h-screen items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="relative flex justify-center items-center mx-auto h-full">
                <div className={`traslate duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="traslate border-0 rounded-lg relative flex flex-col bg-white outline-none focus:outline-none">
                        {/* HEADER */}
                        <div className="flex items-center p-4 rounded-t justify-center relative border-b-[1px]">
                            <button onClick={handleClick} className="p-1 border-0 transition absolute left-9">
                                {icon === 'close' ? <IoMdClose /> : <MdArrowBackIos />}
                            </button>
                            <div className="text-lg font-bold">{title}</div>
                        </div>
                        {/* BODY */}
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal