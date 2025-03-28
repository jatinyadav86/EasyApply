'use client'
import { onEducationalModalOpen, onGovtJobModalOpen, updateEduFormModalFunc, updateGovJobModalFunc } from '@/app/redux/slices/adminSlice'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

const UpdateServiceButton = ({ type, id }) => {
    const dispatch = useDispatch()

    const updateService = () => {
        if (type === "educational") {
            dispatch(updateEduFormModalFunc({ func: 'updateEduForm', id: id }))
            dispatch(onEducationalModalOpen())
        } else if (type === "govtJob") {
            dispatch(updateGovJobModalFunc({ func: 'updateJob', id: id }))
            dispatch(onGovtJobModalOpen())
        }

    }

    return (
        <div onClick={updateService} className="absolute top-4 right-16 rounded-full hover:bg-slate-100 cursor-pointer">
            <BsPencilSquare size={20} />
        </div>
    )
}

export default UpdateServiceButton