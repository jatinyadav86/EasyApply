'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { onCodeVerificationModalClose } from '@/app/redux/slices/authSlice'
import Button from '../Button'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

const CodeVerificationModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState("")
    const isOpen = useSelector((state) => state.auth.isCodeVerificationModalOpen)
    const user = useSelector((state) => state.auth.userCredential)
    const dispatch = useDispatch()
    const router = useRouter()

    const onSubmit = () => {
        setIsLoading(true)
        let payload = {
            phone: user.phone.toString(),
            verifyCode: code.toString()
        }
        signIn('phoneCredential', {
            ...payload,
            redirect: false
        })
            .then((callback) => {
                setIsLoading(false)
                if (callback.ok) {
                    toast.success('Logged in successfully')
                    router.refresh();
                    dispatch(onCodeVerificationModalClose())
                }
                if (callback.error) {
                    toast.error(callback.error)
                }
            })
        setIsLoading(true)
    }

    const resendVerifyCode = () => {
        setIsLoading(true)
        axios.post('/api/resendCode', { phone: user.phone.toString() })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Verification code sent successfully")
                }
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Somethig went wrong")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[50vh] md:h-[60vh] md:w-[40vw] overflow-auto">
            <div className="text-3xl font-bold">Enter your verification code</div>
            <div className="text-xl font-serifbold">Enter the code we've sent via WhatsApp to +91 {user.phone}</div>
            <div className="flex flex-col gap-2">
                <input value={code} onChange={(e) => { setCode(e.target.value) }} placeholder='You will get the code by the name "dccoder"' type="number" name="code" id="code" className="w-full py-3 px-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed no-spinner" />
                <div className="flex gap-2 items-center">
                    <span className="text-sm font-semibold">Didn't receive the code?</span>
                    <button disabled={isLoading} className="text-sm font-bold underline hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer" onClick={resendVerifyCode}>Resend code</button>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isLoading || code.length < 6} label={"Cotinue"} onClick={onSubmit} />
            </div>
        </div>
    )

    const onIconClick = () => {
        dispatch(onCodeVerificationModalClose());
        setIsLoading(false)
    }

    return (
        <Modal isOpen={isOpen} onIconClick={onIconClick} title='Verify your number' body={bodyContent} icon='close' />
    )
}

export default CodeVerificationModal