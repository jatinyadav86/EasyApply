'use client'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../Heading'
import toast from 'react-hot-toast'
import Button from '../Button'
import { MdDelete } from 'react-icons/md'
import { onEducationalModalClose, updateEduFormModalFunc } from '@/app/redux/slices/adminSlice'
import ImageUpload2 from '../inputs/ImageUpload2'
import { useRouter } from 'next/navigation'
import { deepEqual, formatDate, formatDate2 } from '@/app/utils/clientOnlyFunc'


const AuthModal = ({ educationalForms }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [begin, setBegin] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [applicationFee, setApplicationFee] = useState([])
    const [feeTitle, setFeeTitle] = useState('')
    const [feeValue, setFeeValue] = useState('')
    const [documetsRequired, setDocumetsRequired] = useState([])
    const [documentTitle, setDocumentTitle] = useState('')
    const [documentValue, setDocumentValue] = useState('')
    const isOpen = useSelector((state) => state.admin.isEducationalModalOpen)
    const eduFormModalFunc = useSelector((state) => state.admin.eduFormModalFunc)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (eduFormModalFunc.func === 'addEduForm') {
            setTitle('')
            setImage('')
            setBegin('')
            setLastDate('')
            setApplicationFee([])
            setDocumetsRequired([])
        }
        if (eduFormModalFunc.func === 'updateEduForm') {
            let form = educationalForms.filter((form) => form._id === eduFormModalFunc.id)[0]
            setTitle(form.title)
            setImage(form.image)
            setBegin(formatDate2(form.begin))
            setLastDate(formatDate2(form.lastDate))
            setApplicationFee(form.applicationFee)
            setDocumetsRequired(form.documetsRequired)
        }
    }, [eduFormModalFunc])


    const onSubmit = () => {
        setIsLoading(true)
        if (eduFormModalFunc.func === 'addEduForm') {
            axios.post('/api/educationalForm', {
                title,
                image,
                begin: formatDate(begin),
                lastDate: formatDate(lastDate),
                applicationFee,
                documetsRequired
            }).then((res) => {
                if (res.data.success) {
                    toast.success('Educatioal Form added successfully')
                }
                dispatch(onEducationalModalClose())
                router.refresh()
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Somethig went wrog")
                }
                dispatch(onEducationalModalClose())
            }).finally(() => {
                setIsLoading(false)
                dispatch(updateEduFormModalFunc({ func: null, id: null }))
            })
        }
        if (eduFormModalFunc.func === 'updateEduForm') {
            axios.put('/api/educationalForm', {
                id: eduFormModalFunc.id,
                title,
                image,
                begin: formatDate(begin),
                lastDate: formatDate(lastDate),
                applicationFee,
                documetsRequired
            }).then((res) => {
                if (res.data.success) {
                    toast.success('Educatioal Form updated successfully')
                }
                dispatch(onEducationalModalClose())
                router.refresh()
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error("Somethig went wrog")
                }
            }).finally(() => {
                setIsLoading(false)
                dispatch(updateEduFormModalFunc({ func: null, id: null }))
            })
        }
    }

    const addAppFee = useCallback(() => {
        setApplicationFee([...applicationFee, { title: feeTitle, value: feeValue }])
        setFeeTitle('')
        setFeeValue('')
    }, [applicationFee, feeTitle, feeValue])

    const deleteAppFee = useCallback((index) => {
        setApplicationFee(applicationFee.filter((fee, i) => i !== index))
    }, [applicationFee])

    const addDocumet = useCallback(() => {
        setDocumetsRequired([...documetsRequired, { title: documentTitle, value: documentValue }])
        setDocumentTitle('')
        setDocumentValue('')
    }, [documetsRequired, documentTitle, documentValue])

    const deleteDocument = useCallback((index) => {
        setDocumetsRequired(documetsRequired.filter((doc, i) => i !== index))
    }, [documetsRequired])


    const isSubmitButtonDisabled = () => {
        if (eduFormModalFunc.func === 'addEduForm') {
            return isLoading || !title.trim().length || !image.trim().length || !begin.length || !lastDate.length || !applicationFee.length || !documetsRequired.length
        }
        if (eduFormModalFunc.func === 'updateEduForm') {
            let form = educationalForms.filter((form) => form._id === eduFormModalFunc.id)[0]
            let initialForm = {
                title: form.title, image: form.image, begin: formatDate2(form.begin), lastDate: formatDate2(form.lastDate), applicationFee: form.applicationFee, documetsRequired: form.documetsRequired
            }
            let updatedForm = {
                title, image, begin, lastDate, applicationFee, documetsRequired
            }
            return isLoading || !title.trim().length || !image.trim().length || !begin.length || !lastDate.length || !applicationFee.length || !documetsRequired.length || deepEqual(initialForm, updatedForm)
        }
    }

    let bodyContent = (
        <div className="relative p-6 flex flex-col gap-4 w-[90vw] h-[50vh] md:h-[80vh] md:w-[40vw] overflow-auto">
            <div className="flex flex-col gap-2">
                <Heading title="Fill all the details" />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className="w-full p-2 font-light text-zinc-400 bg-white border-2 rounded-md outline-none" />
                <div className="w-full p-3 font-light bg-white border-2 rounded-md outline-none">
                    <label className="text-lg my-10 text-zinc-400">Image</label>
                    <ImageUpload2 value={image} folder="EasyApply_Admin" onChange={(value) => setImage(value)} />
                </div>
                <div className="w-full p-3 font-light space-y-3 bg-white border-2 rounded-md outline-none">
                    <label className="text-lg text-zinc-400">Important Dates</label>
                    <div className="w-full flex items-center gap-6">
                        <div className="text-zinc-500 text-base font-light w-36">Application Begin :</div>
                        <input type="date" value={begin} onChange={(e) => setBegin(e.target.value)} className="w-1/3 p-1 font-light bg-white border rounded-md outline-none" />
                    </div>
                    <div className="w-full flex items-center gap-6">
                        <div className="text-zinc-500 text-base font-light w-36">Last Date :</div>
                        <input type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} className="w-1/3 p-1 font-light bg-white border rounded-md outline-none" />
                    </div>
                </div>
                <div className="w-full p-3 font-light bg-white border-2 rounded-md outline-none">
                    <label className="text-lg my-10 text-zinc-400">Application Fee</label>
                    <div className="w-full flex justify-between items-center gap-2">
                        <input type="text" value={feeTitle} onChange={(e) => setFeeTitle(e.target.value)} placeholder='Fee Title' className="w-1/3 p-2 font-light bg-white border rounded-md outline-none" />
                        <input type="text" value={feeValue} onChange={(e) => setFeeValue(e.target.value)} placeholder='Fee Value' className="w-1/3 p-1 font-light bg-white border rounded-md outline-none" />
                        <div className="w-1/4">
                            <Button onClick={addAppFee} disabled={feeTitle.trim().length === 0 || feeValue.trim().length === 0} small label='Add' />
                        </div>
                    </div>
                    {applicationFee.length > 0 && (
                        <div className="w-full flex flex-col gap-2 my-3">
                            {applicationFee.map((fee, index) => (
                                <div key={index} className="w-full flex items-center gap-4 border p-1 rounded-md relative text-zinc-500">
                                    <div>{fee.title} :</div>
                                    <div>{fee.value}</div>
                                    <div onClick={() => deleteAppFee(index)} className="cursor-pointer absolute right-3"><MdDelete size={20} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-full p-3 font-light bg-white border-2 rounded-md outline-none">
                    <label className="text-lg my-10 text-zinc-400">Documents Required</label>
                    <div className="w-full flex justify-between items-center gap-2">
                        <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} placeholder='Title' className="w-1/3 p-2 font-light bg-white border rounded-md outline-none" />
                        <input type="text" value={documentValue} onChange={(e) => setDocumentValue(e.target.value)} placeholder='Documents' className="w-1/3 p-1 font-light bg-white border rounded-md outline-none" />
                        <div className="w-1/4">
                            <Button onClick={addDocumet} disabled={documentTitle.trim().length === 0 || documentValue.trim().length === 0} small label='Add' />
                        </div>
                    </div>
                    {documetsRequired.length > 0 && (
                        <div className="w-full flex flex-col gap-2 my-3">
                            {documetsRequired.map((doc, index) => (
                                <div key={index} className="w-full flex items-center gap-4 border p-1 rounded-md relative text-zinc-500">
                                    <div>{doc.title} :</div>
                                    <div>{doc.value}</div>
                                    <div onClick={() => deleteDocument(index)} className="cursor-pointer absolute right-3"><MdDelete size={20} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={isSubmitButtonDisabled()} label='Submit' onClick={onSubmit} />
            </div>
        </div>
    )


    const getTitle = useCallback(() => {
        if (eduFormModalFunc.func === 'addEduForm') {
            return "Add new Educational Form"
        }
        else if (eduFormModalFunc.func === 'updateEduForm') {
            return "Update Educational Form"
        }
    }, [eduFormModalFunc])

    const onClose = () => {
        dispatch(onEducationalModalClose())
        dispatch(updateEduFormModalFunc({ func: null, id: null }))
    }

    return (
        <Modal disabled={isSubmitButtonDisabled()} isOpen={isOpen} onIconClick={onClose} title={getTitle()} body={bodyContent} icon='close' />
    )
}

export default AuthModal