'use client'
import axios from 'axios'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { TbPhotoPlus } from 'react-icons/tb'


const ImageUpload = ({ title, value, folder, user }) => {
    const [image, setImage] = useState(null)

    useEffect(() => {
        setImage(value)
    }, [])

    const handleUpload = useCallback((result) => {
        setImage(result.info.secure_url)
        callbackFunc(result.info.secure_url, title)
    }, [])

    const callbackFunc = (url, title) => {
        axios.post('/api/addUserDocs', { userId: user.id, title, value: url, type: "necessaryDocs" })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Document added successfully")
                }
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Somethig went wrog")
                }
            })
    }

    return (
        <CldUploadWidget onSuccess={handleUpload} uploadPreset='easyApply' options={{ maxFiles: 1, folder: folder }}>
            {({ open }) => (
                <div onClick={() => open?.()} className="w-full h-full text-neutral-600 flex flex-col gap-2 items-center justify-center relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300">
                    {image ? (
                        <Image alt='upload' src={image} fill style={{ objectFit: 'contain' }} />
                    ) : (
                        <>
                            <TbPhotoPlus size={50} />
                            <div className="font-semibold text-sm text-nowrap">Click to add image</div>
                        </>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default ImageUpload