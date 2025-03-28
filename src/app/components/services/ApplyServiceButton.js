"use client"
import { updateApplyModalData } from '@/app/redux/slices/applySlice'
import { onApplyModalOpen, onAuthenticationModalOpen } from '@/app/redux/slices/authSlice'
import React, { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const ApplyServiceButton = ({ currentUser, serviceId, serviceType, subServiceId, serviceData}) => {
    const dispatch = useDispatch()

    const applyService = useCallback(() => {
        if (!currentUser) {
            toast.error("You have to login first")
            dispatch(onAuthenticationModalOpen())
            return
        }
        dispatch(updateApplyModalData({ serviceId: serviceId, serviceType, subServiceId, serviceData }))
        dispatch(onApplyModalOpen())
    }, [currentUser, serviceId, serviceType, subServiceId, serviceData])

    return (
        <div onClick={applyService} className="w-full md:w-32 h-9 p-1 bg-rose-500 rounded-md text-white text-lg font-semibold flex items-center justify-center mb-2 cursor-pointer">Apply Now</div>
    )
}

export default ApplyServiceButton