"use client"
import { onConfirmationModalOpen, updateConfirmModalData } from '@/app/redux/slices/applySlice'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

const CancelServiceRequest = ({serviceRequestId, serviceRequestStatus}) => {
    const dispatch = useDispatch()

    const cancelRequest = useCallback((e) => {
        e.stopPropagation()
        e.preventDefault(); 
        dispatch(updateConfirmModalData({serviceRequestId, type: "cancel"}))
        dispatch(onConfirmationModalOpen())
    }, [ serviceRequestId])

  return (
    <div onClick={(e)=>cancelRequest(e)} className={`text-sm text-[#222222] ${serviceRequestStatus !== "applied" && "hidden"} font-semibold underline cursor-pointer hover:scale-105`}>Cancel</div>
  )
}

export default CancelServiceRequest