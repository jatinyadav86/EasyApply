'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../Heading'
import toast from 'react-hot-toast'
import Button from '../Button'
import { onApplyModalClose } from '@/app/redux/slices/authSlice'
import { useRouter } from 'next/navigation'

const ApplyModal = ({user, subServices, jobs, eduForm}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [inputFeild, setInputFeild] = useState('')
    const [subService, setSubService] = useState('')
    const isOpen = useSelector((state) => state.auth.isApplyModalOpen)
    const { serviceId, subServiceId, serviceType, serviceData } = useSelector((state) => state.applyService.applyModalData)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if(serviceData?.length === 1){
            setSubService(serviceData[0].title)
        }
    }, [serviceData])

    const getSubServiceTitle = () => {
        return subServices.filter((item) => item._id === subServiceId)[0].title
    }

    const getServiceTitle = () => {
        if(serviceType === 'educational'){
            return eduForm.filter((item) => item._id === serviceId)[0]?.title
        }else{
            return jobs.filter((item) => item._id === serviceId)[0]?.shortTitle
        }
    }

    const onSubmit = () => {
        setIsLoading(true)
        if(serviceType === 'services'){
            axios.post('/api/serviceRequest', { userId: user.id, contactPref: inputFeild, serviceType: serviceType, serviceId: serviceId, subServiceId: subServiceId, subServiceTitle: getSubServiceTitle() })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Applied successfully. We will contact you soon !")
                }
                dispatch(onApplyModalClose())
                router.refresh()
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
        }else{
            axios.post('/api/serviceRequest', { userId: user.id, contactPref: inputFeild, serviceType: serviceType, serviceId: serviceId, subServiceTitle: subService, serviceTitle: getServiceTitle() })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Applied successfully. We will contact you soon !")
                }
                dispatch(onApplyModalClose())
                router.refresh()
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
        
    }

    const togleInput = (type) => {
        setInputFeild(type)
    }

    const togleSubService = (type) => {
        setSubService(type)
    }

    const isSubmitButtonDisabled = () => {
        if(serviceType === 'services'){
            return isLoading || !inputFeild.trim().length
        }else{
            return isLoading || !inputFeild.trim().length || !subService.trim().length
        }
    }

    const bodyContent = (
        <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[60vh] md:h-[80vh] md:w-[40vw] overflow-auto">
            {serviceType !== 'services' && serviceData?.length > 1  && (
                <div className="flex flex-col gap-2">
                    <Heading title={serviceType === 'educational' ? "Chosse the course you want to apply" : "Chosse the post you want to apply"} />
                    <div className="flex flex-col items-center gap-4 w-full text-[#484e50]">
                        {serviceData?.map((item, index) => (
                            <div key={index} onClick={() => togleSubService(item.title)} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                                <div className="w-[95%] font-bold text-wrap">{item.title}</div>
                                <div className={`size-3 rounded-full border-2 border-[#484e50] ${subService === item.title && 'bg-rose-500'}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-2">
                <Heading title="How can we contact you ?" />
                <div className="flex flex-col items-center gap-4 w-full text-[#484e50]">
                    <div onClick={() => togleInput('phone')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">Phone call</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'phone' && 'bg-rose-500'}`}></div>
                    </div>
                    <div onClick={() => togleInput('whatsApp')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">WhatsApp</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'whatsApp' && 'bg-rose-500'}`}></div>
                    </div>
                    <div onClick={() => togleInput('both')} className="w-full h-14 p-3 border rounded-xl flex items-center justify-between cursor-pointer">
                        <div className="text-xl font-bold ">Both</div>
                        <div className={`size-3 rounded-full border-2 border-[#484e50] ${inputFeild === 'both' && 'bg-rose-500'}`}></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isSubmitButtonDisabled()} label={"Cotinue"} onClick={onSubmit} />
            </div>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={isOpen} onIconClick={() => { dispatch(onApplyModalClose()) }} title="Contact Preference" body={bodyContent} icon='close' />
    )
}

export default ApplyModal