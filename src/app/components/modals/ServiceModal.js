'use client'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../Heading'
import toast from 'react-hot-toast'
import Button from '../Button'
import { MdDelete } from 'react-icons/md'
import { onServiceModalClose, updateServiceModalFunc } from '@/app/redux/slices/adminSlice'
import ImageUpload2 from '../inputs/ImageUpload2'
import { useRouter } from 'next/navigation'
import { deepEqual } from '@/app/utils/clientOnlyFunc'


const AuthModal = ({subServices}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [serviceTitle, setServiceTitle] = useState('')
    const [image, setImage] = useState('')
    const [subServiceTitle, setSubServiceTitle] = useState('')
    const [applicationFee, setApplicationFee] = useState('')
    const [documetsRequired, setDocumetsRequired] = useState([])
    const [documentValue, setDocumentValue] = useState('')
    const [serviceCharges, setServiceCharges] = useState('')
    const [discountedServiceCharges, setDiscountedServiceCharges] = useState('')
    const isOpen = useSelector((state) => state.admin.isServiceModalOpen)
    const serviceModalFunc = useSelector((state) => state.admin.serviceModalFunc)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        if (serviceModalFunc.func === 'addSubService'){
            setSubServiceTitle("")
            setApplicationFee("")
            setDocumetsRequired([])
            setServiceCharges("")
            setDiscountedServiceCharges("")
        }
        if (serviceModalFunc.func === 'updateSubService'){
            const subService = subServices.filter((subService)=> subService._id === serviceModalFunc.id)[0]
            setSubServiceTitle(subService.title)
            setApplicationFee(subService.applicationFee)
            setDocumetsRequired(subService.documetsRequired)
            setServiceCharges(subService.serviceCharges)
            setDiscountedServiceCharges(subService.discountedServiceCharges)
        }
    },[serviceModalFunc])

    const addDocumet = useCallback(() => {
        setDocumetsRequired([...documetsRequired,documentValue])
        setDocumentValue('')
    }, [documentValue, documetsRequired])

    const deleteDocument = useCallback((index) => {
        setDocumetsRequired(documetsRequired.filter((doc, i) => i !== index))
    },[documetsRequired])


    const onSubmit = () => {
        setIsLoading(true)
        if (serviceModalFunc.func === 'addService') {
            axios.post('/api/service', { serviceTitle, image })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('New Service added successfully')
                    }
                    dispatch(onServiceModalClose())
                    setServiceTitle('')
                    setImage('')
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(()=>{
                    setIsLoading(false)
                    dispatch(updateServiceModalFunc({ func: null, id: null }))
                })
        }
        if (serviceModalFunc.func === 'addSubService') {
            axios.post('/api/subService', { serviceId: serviceModalFunc.id, title: subServiceTitle, applicationFee, documetsRequired, serviceCharges, discountedServiceCharges })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('New subService added successfully')
                    }
                    dispatch(onServiceModalClose())
                    setSubServiceTitle('')
                    setApplicationFee('')
                    setDocumetsRequired([])
                    setServiceCharges('')
                    router.refresh()
                }).catch((err) => {
                    if (err.response.data) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(()=>{
                    setIsLoading(false)
                    dispatch(updateServiceModalFunc({ func: null, id: null }))
                })
        }
        if (serviceModalFunc.func === 'updateSubService') {
            axios.put('/api/subService', { id:serviceModalFunc.id, title: subServiceTitle, applicationFee, documetsRequired, serviceCharges, discountedServiceCharges })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('New subService added successfully')
                    }
                    dispatch(onServiceModalClose())
                    setSubServiceTitle('')
                    setApplicationFee('')
                    setDocumetsRequired([])
                    setServiceCharges('')
                    router.refresh()
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.message)
                    } else {
                        toast.error("Somethig went wrog")
                    }
                }).finally(()=>{
                    setIsLoading(false)
                    dispatch(updateServiceModalFunc({ func: null, id: null }))
                })
        }

    }

    const isSubmitButtonDisabled = () => {
        if (serviceModalFunc.func === 'addService') {
            return isLoading || !serviceTitle.trim().length || !image.trim().length
        }
        else if (serviceModalFunc.func === 'addSubService') {
            return isLoading || !subServiceTitle.trim().length || !applicationFee.trim().length || !documetsRequired.length || !serviceCharges.trim().length || !discountedServiceCharges.trim().length
        }
        else if ( serviceModalFunc.func === 'updateSubService') {
            const subService = subServices.filter((subService)=> subService._id === serviceModalFunc.id)[0]
            let initialForm = {
                title: subService.title, applicationFee: subService.applicationFee, documetsRequired: subService.documetsRequired, serviceCharges: subService.serviceCharges, discountedServiceCharges: subService.discountedServiceCharges
            }
            let updatedForm = {
                title:subServiceTitle, applicationFee, documetsRequired, serviceCharges, discountedServiceCharges
            }
            return isLoading || !subServiceTitle.trim().length || !applicationFee.trim().length || !documetsRequired.length || !serviceCharges.trim().length || deepEqual(initialForm, updatedForm)
        }
    }

    const getBodyContent = ()=>{
        if (serviceModalFunc.func === 'addService') {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[50vh] md:h-[80vh] md:w-[40vw] overflow-auto">
                    <div className="flex flex-col gap-2">
                        <Heading title="Fill all the details" />
                        <input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder='Title' className="w-full p-2 font-light bg-white border-2 rounded-md outline-none" />
                        <div className="w-full p-3 font-light bg-white border-2 rounded-md outline-none">
                            <label className="text-lg my-10 text-zinc-400">Image</label>
                            <ImageUpload2 value={image} folder="EasyApply_Admin" onChange={(value) => setImage(value)} />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isSubmitButtonDisabled()} label='Submit' onClick={onSubmit} />
                    </div>
                </div>
            )
        }
        if (serviceModalFunc.func === 'addSubService' || serviceModalFunc.func === 'updateSubService') {
            return (
                <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[50vh] md:h-[80vh] md:w-[40vw] overflow-auto">
                    <div className="flex flex-col gap-2">
                        <Heading title="Fill all the details" />
                        <input type="text" value={subServiceTitle} onChange={(e) => setSubServiceTitle(e.target.value)} placeholder='Title' className="w-full p-2 font-light bg-white border-2 rounded-md outline-none" />
                        <input type="text" value={applicationFee} onChange={(e) => setApplicationFee(e.target.value)} placeholder='Application Fee' className="w-full p-2 font-light bg-white border-2 rounded-md outline-none" />
                        <div className="w-full p-3 font-light bg-white border-2 rounded-md outline-none">
                            <label className="text-lg my-10 text-zinc-400">Documents Required</label>
                            <div className="w-full flex justify-between items-center gap-2">
                                <input type="text" value={documentValue} onChange={(e) => setDocumentValue(e.target.value)} placeholder='Documents' className="w-2/3 p-1 font-light bg-white border rounded-md outline-none" />
                                <div className="w-1/4">
                                    <Button onClick={addDocumet} disabled={ documentValue.trim().length === 0} small label='Add' />
                                </div>
                            </div>
                            {documetsRequired.length > 0 && (
                                <div className="w-full flex flex-col gap-2 my-3">
                                    {documetsRequired.map((doc, index) => (
                                        <div key={index} className="w-full flex items-center gap-4 border p-1 rounded-md relative text-zinc-500">
                                            <div>{doc}</div>
                                            <div onClick={() => deleteDocument(index)} className="cursor-pointer absolute right-3"><MdDelete size={20} /></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input type="text" value={serviceCharges} onChange={(e) => setServiceCharges(e.target.value)} placeholder='Service Charges' className="w-full p-2 font-light bg-white border-2 rounded-md outline-none" />
                        <input type="text" value={discountedServiceCharges} onChange={(e) => setDiscountedServiceCharges(e.target.value)} placeholder='Discounted Service Charges' className="w-full p-2 font-light bg-white border-2 rounded-md outline-none" />
                    </div>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Button disabled={isSubmitButtonDisabled()} label='Submit' onClick={onSubmit} />
                    </div>
                </div>
            )
        }
    }

    const getHeading = useCallback(()=>{
        if (serviceModalFunc.func === 'addSubService') {
            return 'Add new Sub Service'
        }
        else if (serviceModalFunc.func === 'updateSubService') {
            return 'Update Sub Service'
        }
        else {
            return 'Add new Service'
        }
    },[serviceModalFunc])

    return (
        <Modal disabled={isSubmitButtonDisabled()} isOpen={isOpen} onIconClick={() => { dispatch(onServiceModalClose()) }} title={getHeading()} body={getBodyContent()} icon='close' />
    )
}

export default AuthModal