'use client'
import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { onConfirmationModalClose } from '@/app/redux/slices/applySlice'
import axios from 'axios'

const ConfirmationModal = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const isOpen = useSelector((state) => state.applyService.isConfirmationModalOpen)
    const confirmModalData = useSelector((state) => state.applyService.confirmModalData)
    const dispatch = useDispatch()
    const router = useRouter()

    const onSubmit = () => {
        setIsLoading(true)
        if (confirmModalData.type === "cancel") {
            axios.put('/api/serviceRequest/cancelRequest', { userId, serviceRequestId: confirmModalData.serviceRequestId })
                .then((res) => {
                    if (res.data.success) {
                        toast.success("Request canceled successfully")
                        router.refresh()
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrong")
                    }
                }).finally(() => {
                    setIsLoading(false)
                    dispatch(onConfirmationModalClose())
                })
        } else if (confirmModalData.type === "deleteEducationalForm") {
            axios.delete('/api/educationalForm', { data: { id: confirmModalData.serviceRequestId } })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Educational Form deleted')
                    }
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(() => {
                    setIsLoading(false)
                    dispatch(onConfirmationModalClose())
                })
        } else if (confirmModalData.type === "deleteService") {
            axios.delete('/api/service', { data: { id: confirmModalData.serviceRequestId } })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Service deleted')
                    }
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(() => {
                    setIsLoading(false)
                    dispatch(onConfirmationModalClose())
                })
        } else if (confirmModalData.type === "deleteSubService") {
            axios.delete('/api/subService', { data: { id: confirmModalData.serviceRequestId } })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Sub Service deleted')
                    }
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(() => {
                    setIsLoading(false)
                    dispatch(onConfirmationModalClose())
                })
        } else if (confirmModalData.type === "deleteJobForm") {
            axios.delete('/api/govtJobs', { data: { id: confirmModalData.serviceRequestId } })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Govt Job deleted')
                    }
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(() => {
                    setIsLoading(false)
                    dispatch(onConfirmationModalClose())
                })
        }
    }

    const bodyContent = useCallback(() => {
        if (confirmModalData.type === "cancel") {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[20vh] md:h-[30vh] md:w-[30vw] overflow-auto">
                    <div className="text-xl font-serifbold">Are you sure to cancel this request !</div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isLoading} label={"Cancel This Request"} onClick={onSubmit} />
                    </div>
                </div>
            )
        } else if (confirmModalData.type === "deleteEducationalForm") {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[20vh] md:h-[30vh] md:w-[30vw] overflow-auto">
                    <div className="text-xl font-serifbold">Are you sure to delete this form !</div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isLoading} label={"Delete"} onClick={onSubmit} />
                    </div>
                </div>
            )
        } else if (confirmModalData.type === "deleteService") {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[20vh] md:h-[30vh] md:w-[30vw] overflow-auto">
                    <div className="text-xl font-serifbold">Are you sure to delete this service !</div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isLoading} label={"Delete"} onClick={onSubmit} />
                    </div>
                </div>
            )
        } else if (confirmModalData.type === "deleteSubService") {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[20vh] md:h-[30vh] md:w-[30vw] overflow-auto">
                    <div className="text-xl font-serifbold">Are you sure to delete this subService !</div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isLoading} label={"Delete"} onClick={onSubmit} />
                    </div>
                </div>
            )
        }else if (confirmModalData.type === "deleteJobForm") {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[20vh] md:h-[30vh] md:w-[30vw] overflow-auto">
                    <div className="text-xl font-serifbold">Are you sure to delete this form !</div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isLoading} label={"Delete"} onClick={onSubmit} />
                    </div>
                </div>
            )
        }
    }, [confirmModalData])

    const getTitle = useCallback(() => {
        if (confirmModalData.type === "cancel") {
            return "Cancel Request"
        } else if (confirmModalData.type === "deleteEducationalForm") {
            return "Delete Form"
        } else if (confirmModalData.type === "deleteService") {
            return "Delete Service"
        } else if (confirmModalData.type === "deleteSubService") {
            return "Delete Sub Service"
        }else if (confirmModalData.type === "deleteJobForm") {
            return "Delete Form"
        }

    }, [confirmModalData])

    return (
        <Modal isOpen={isOpen} onIconClick={() => { dispatch(onConfirmationModalClose()) }} title={getTitle()} body={bodyContent()} icon='close' />
    )
}

export default ConfirmationModal