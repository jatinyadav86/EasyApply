'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import { onAuthenticationModalOpen, onRegisterModalWithPhoneClose } from '@/app/redux/slices/authSlice'
import Button from '../Button'
import { signUpSchemaWithPhone } from '@/app/zodSchemas/authetication/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RiInformation2Line } from 'react-icons/ri'

const RegisterModalWithPhone = () => {
    const [isLoading, setIsLoading] = useState(false)
    const isOpen = useSelector((state) => state.auth.isRegisterModalWithPhoneOpen)
    const user = useSelector((state) => state.auth.userCredential)
    const dispatch = useDispatch()
    const router = useRouter()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchemaWithPhone),
        defaultValues: {
            name: '',
            phone: '',
            verificationCode: ''
        }
    });

    useEffect(() => {
        if (user) {
            setValue("name", user.name || "");
            setValue("phone", user.phone || "")
        }
    }, [user, setValue])

    const login = (phone, verificationCode) => {
        let payload = {
            phone: phone.toString(),
            verifyCode: verificationCode.toString()
        }
        signIn('phoneCredential', {
            ...payload,
            redirect: false
        })
            .then((callback) => {
                if (callback.ok) {
                    toast.success('Logged in successfully')
                    router.refresh();
                }
                if (callback.error) {
                    toast.error(callback.error)
                }
            })
    }

    const onSubmit = (data) => {
        setIsLoading(true)
        axios.post('/api/signup', { name: data.name, phone: data.phone, verificationCode: data.verificationCode })
            .then((res) => {
                if (res.data.success) {
                    dispatch(onRegisterModalWithPhoneClose())
                    toast.success("User verified succesfully")
                    login(data.phone, data.verificationCode)
                }
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Something went wrog")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
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
                    toast.error("Somethig went wrog")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="relative p-6 flex flex-col gap-4 w-[85vw] h-[45vh] md:h-[60vh] md:w-[40vw] overflow-auto">
            <div className="flex flex-col gap-2">
                <Input id='phone' label='Phone number' type='number' disabled register={register} errors={errors} required />
                <Input id='verificationCode' label='verificationCode' type='number' disabled={isLoading} register={register} errors={errors} required />
                <div className="w-full md:w-96 flex items-start gap-1 font-bold text-[#484e50]">
                    <RiInformation2Line size={17} />
                    <div className=" text-xs">You will get the code via WhatsApp by the name "dccoder"</div>
                </div>
                <Input id='name' label='Name' type='text' disabled={isLoading} register={register} errors={errors} required />
                <div className="flex gap-2 items-center">
                    <span className="text-sm font-semibold">Didn't receive the code?</span>
                    <button disabled={isLoading} className="text-sm font-bold underline hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer" onClick={resendVerifyCode}>Resend code</button>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isLoading} label={"Cotinue"} onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    )

    const onIconClick = () => {
        dispatch(onRegisterModalWithPhoneClose());
        dispatch(onAuthenticationModalOpen());
        reset()
    }

    return (
        <Modal isOpen={isOpen} onIconClick={onIconClick} title="Finish signing up" body={bodyContent} icon='back' />
    )
}

export default RegisterModalWithPhone