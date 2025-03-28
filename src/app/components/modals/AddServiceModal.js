'use client'
import axios from 'axios'
import React, { useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Button from '../Button'
import { onAddServiceModalClose } from '@/app/redux/slices/applySlice'
import Heading from '../Heading'

const AddServiceModal = ({user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [inputFeild, setInputFeild] = useState('')
    const isOpen = useSelector((state) => state.applyService.isAddServiceModalOpen)
    const dispatch = useDispatch()

    const togleInput = (type) => {
        setInputFeild(type)
    }

    const onSubmit = () => {
        setIsLoading(true)
        axios.post('/api/serviceRequest', { userId: user.id, contactPref: inputFeild, serviceType: "specified", serviceTitle: title })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Applied successfully")
                }
                dispatch(onAddServiceModalClose())
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Somethig went wrog")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="relative p-6 flex flex-col gap-4 h-[70vh] w-[40vw] overflow-auto">
            <div className="text-3xl font-bold">Specify your application form</div>
            <div className="text-xl font-serifbold">Title</div>
            <div className="flex flex-col gap-2">
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" name="title" id="title" className="w-full p-3 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" />
            </div>
            <div className="flex flex-col gap-2">
                <Heading title="" />
                <div className="text-xl font-serifbold">How can we contact you ?</div>
                <div className="flex flex-col items-center gap-4 w-full text-[#484e50]">
                    <div onClick={() => togleInput('phone')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">Phone</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'phone' && 'bg-rose-500'}`}></div>
                    </div>
                    <div onClick={() => togleInput('whatsApp')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">WhatsApp</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'whatsApp' && 'bg-rose-500'}`}></div>
                    </div>
                    <div onClick={() => togleInput('both')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">Both</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'both' && 'bg-rose-500'}`}></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isLoading} label={"Cotinue"} onClick={onSubmit} />
            </div>
        </div>
    )

    return (
        <Modal isOpen={isOpen} onIconClick={() => { dispatch(onAddServiceModalClose()) }} title="Application form not found !" body={bodyContent} icon='close' />
    )
}

export default AddServiceModal