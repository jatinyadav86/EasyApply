'use client'
import { onConfirmationModalOpen, updateConfirmModalData } from '@/app/redux/slices/applySlice'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

const CancelRequestButton = ({ serviceRequestId }) => {
    const dispatch = useDispatch()

    const cancelRequest = useCallback(() => {
        dispatch(updateConfirmModalData({ serviceRequestId, type: "cancel" }))
        dispatch(onConfirmationModalOpen())
    }, [serviceRequestId])

    return (
        <div onClick={cancelRequest} className="h-9 w-40 bg-rose-500 rounded-md text-white text-lg font-semibold flex items-center justify-center my-4 cursor-pointer">Cancel Request</div>
    )
}

export default CancelRequestButton