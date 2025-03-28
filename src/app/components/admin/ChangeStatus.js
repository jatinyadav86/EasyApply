'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ChangeStatus = ({ status, userId, serviceRequestId }) => {
    const [loading, setLoading] = useState(false)
    const [changedStatus, setChangedStatus] = useState(null)
    const router = useRouter()

    const changeStatus = () => {
        setLoading(true)
        axios.put('/api/changeStatus', { userId, serviceRequestId: serviceRequestId, status: changedStatus })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Status changed successfully")
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
                setLoading(false)
                setChangedStatus(null)
            })
    }

    return (
        <div className="flex gap-2">
            <div className="text-[#6a6a6a]">Status : <span className="font-bold text-rose-500">{status}</span></div>
            <select name="status" id="status" onChange={(e) => setChangedStatus(e.target.value)} className="border border-solid border-[#dddddd] rounded-md px-1">
                <option value=""></option>
                <option value="accepted">accepted</option>
                <option value="fullfiled">fullfiled</option>
                <option value="canceled">canceled</option>
            </select>
            <button onClick={changeStatus} disabled={loading} className={`text-sm text-[#222222] ${!changedStatus && "hidden"} font-semibold underline cursor-pointer hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed`}>Change</button>
        </div>
    )
}

export default ChangeStatus