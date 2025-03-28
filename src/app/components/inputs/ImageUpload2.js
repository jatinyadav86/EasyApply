'use client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'


const ImageUpload2 = ({ onChange, value,folder }) => {

    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget onSuccess={handleUpload} uploadPreset='easyApply' options={{ maxFiles: 1, folder: folder }}>
            {({ open }) => (
                <div onClick={() => open?.()} className="w-full text-neutral-600 flex flex-col gap-4 items-center justify-center relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 p-20 ">
                    {value ? (
                        <Image alt='upload' src={value} fill style={{objectFit: 'cover'}} />
                    ) : (
                        <>
                            <TbPhotoPlus size={50} />
                            <div className="font-semibold text-lg">Click to upload</div>
                        </>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default ImageUpload2