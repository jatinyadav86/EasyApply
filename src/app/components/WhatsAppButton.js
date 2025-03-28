'use client'
import Image from 'next/image';
import React from 'react';

const WhatsAppButton = () => {
    const phoneNumber = '918383069013';
    const text = "Hello I need assistance with EaseApply"

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="fixed bottom-20 md:bottom-5 right-5 z-50 shadow-lg rounded-full cursor-pointer"
            title="Chat with us on WhatsApp"
        >
            <Image src='/images/whatsapp.png' alt='whatsApp' width={50} height={50}/>
        </div>
    );
};

export default WhatsAppButton;
