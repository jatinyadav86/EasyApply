'use client'
import { onServiceModalOpen, updateServiceModalFunc } from '@/app/redux/slices/adminSlice'
import { onConfirmationModalOpen, updateConfirmModalData } from '@/app/redux/slices/applySlice'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const SubServiceButton = ({ func, id }) => {
    const dispatch = useDispatch()

    const addSubService = () => {
        dispatch(onServiceModalOpen())
        dispatch(updateServiceModalFunc({ func: "addSubService", id: id }))
    }

    const updateSubService = () => {
        dispatch(onServiceModalOpen())
        dispatch(updateServiceModalFunc({ func: "updateSubService", id: id }))
    }

    const deleteSubService = () => {
        dispatch(updateConfirmModalData({ serviceRequestId: id, type: "deleteSubService" }))
        dispatch(onConfirmationModalOpen())
    }

    return (
        <>
            {func === "add" && (
                <div onClick={addSubService} className="rounded-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer">
                    <IoMdAdd size={25} />
                </div>
            )}
            {func === "update" && (
                <div onClick={updateSubService} className="absolute top-2 right-12 rounded-full hover:bg-slate-100 cursor-pointer">
                    <BsPencilSquare size={15} />
                </div>
            )}
            {func === "delete" && (
                <div onClick={deleteSubService} className="absolute top-2 right-4 rounded-full hover:bg-slate-100 cursor-pointer">
                    <MdDelete size={20} />
                </div>
            )}
        </>
    )
}

export default SubServiceButton