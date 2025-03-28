'use client'
import { onEducationalModalOpen, onGovtJobModalOpen, onServiceModalOpen, updateEduFormModalFunc, updateGovJobModalFunc, updateServiceModalFunc } from '@/app/redux/slices/adminSlice'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch } from 'react-redux'

const AddServiceButton = ({ type }) => {
    const dispatch = useDispatch()

    const addService = () => {
        if (type === "educational") {
            dispatch(updateEduFormModalFunc({ func: 'addEduForm', id: null }))
            dispatch(onEducationalModalOpen())
        } else if (type === "services") {
            dispatch(updateServiceModalFunc({ func: "addService", id: null }))
            dispatch(onServiceModalOpen())
        } else if (type === "govtJob") {
            dispatch(updateGovJobModalFunc({ func: 'addJob', id: null }))
            dispatch(onGovtJobModalOpen())
        }

    }

    return (
        <div onClick={addService} className="absolute top-7 right-10 rounded-full hover:bg-neutral-100 cursor-pointer">
            <IoMdAdd size={30} />
        </div>
    )
}

export default AddServiceButton