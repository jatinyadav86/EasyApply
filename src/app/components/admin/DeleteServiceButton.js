'use client'
import { onConfirmationModalOpen, updateConfirmModalData } from '@/app/redux/slices/applySlice'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const DeleteServiceButton = ({ type, id }) => {
    const dispatch = useDispatch()

    const deleteService = () => {
        if (type === "educational") {
            dispatch(updateConfirmModalData({ serviceRequestId: id, type: "deleteEducationalForm" }))
            dispatch(onConfirmationModalOpen())
        } else if (type === "services") {
            dispatch(updateConfirmModalData({ serviceRequestId: id, type: "deleteService" }))
            dispatch(onConfirmationModalOpen())
        } else if (type === "govtJob") {
            dispatch(updateConfirmModalData({ serviceRequestId: id, type: "deleteJobForm" }))
            dispatch(onConfirmationModalOpen())
        }
    }

    return (
        <>
            {type === "services" ? (
                <div onClick={deleteService} className="rounded-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer p-1">
                    <MdDelete size={25} />
                </div>
            ) : (
                <div onClick={deleteService} className="absolute top-4 right-6 rounded-full hover:bg-slate-100 cursor-pointer">
                    <MdDelete size={25} />
                </div>
            )}
        </>

    )
}

export default DeleteServiceButton