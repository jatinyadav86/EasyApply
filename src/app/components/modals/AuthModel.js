'use client'
import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserCredential, onAuthenticationModalClose, onCodeVerificationModalOpen, onRegisterModalWithPhoneOpen } from '@/app/redux/slices/authSlice'
import { phoneValidation } from '@/app/zodSchemas/authetication/signUpSchema'
import { z } from 'zod'

const AuthModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const isOpen = useSelector((state) => state.auth.isAuthenticationModalOpen)
    const dispatch = useDispatch()
    const inputValidate = useMemo(() =>
        z.object({
            phone: phoneValidation
        }),
        []
    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(inputValidate),
        defaultValues: {
            phone: ""
        }
    });

    const onSubmit = (data) => {
        setIsLoading(true)
        dispatch(addUserCredential({ phone: data.phone }))
        axios.post('/api/checkUserExistanse', { phone: data.phone })
            .then((res) => {
                if (!res.data.isUserFind || !res.data.isVerified) {
                    dispatch(onAuthenticationModalClose())
                    dispatch(onRegisterModalWithPhoneOpen())
                } else {
                    dispatch(onAuthenticationModalClose())
                    dispatch(onCodeVerificationModalOpen())
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
        <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[40vh] md:h-[50vh] md:w-[40vw] overflow-auto">
            <div className="flex flex-col gap-2">
                <Heading title="Welcome to EaseApply" />
                <div className="text-xl font-serifbold">Please enter your phone number to continue</div>
                <Input id='phone' label='Phone number' type='number' disabled={isLoading} register={register} errors={errors} required />
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isLoading} label={"Cotinue"} onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={isOpen} onIconClick={() => { dispatch(onAuthenticationModalClose()) }} title="Log in or sign up" body={bodyContent} icon='close' />
    )
}

export default AuthModal