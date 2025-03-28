'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const UserName = ({user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [editName, setEditName] = useState(false)
    const [newName, setNewName] = useState("")
    const router = useRouter()

    const toggleEditName = () => {
        setNewName(user?.name)
        setEditName(!editName)
    }

    const onSubmit = () => {
        setIsLoading(true)
        axios.post('/api/updateUserName', { userId: user.id, newName })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Legal name updated")
                }
                setEditName(false)
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

    return (
        <div className="w-[50%] py-6">
            <div className="text-[#222222] flex justify-between items-center">
                <div className="text-base font-semibold">Legal Name</div>
                <div onClick={toggleEditName} className="text-sm font-semibold underline cursor-pointer">{editName ? "Cancel" : "Edit"}</div>
            </div>
            {editName ? (
                <>
                    <div className="text-sm text-[#6A6A6A]">Make sure this matches the name on your government ID.</div>
                    <input value={newName} type="text" name="updated name" onChange={(e) => setNewName(e.target.value)} className='w-56 h-10 border border-[#8c8c8c] rounded-md p-3 my-4' />
                    <button onClick={onSubmit} disabled={isLoading || newName.length === 0 || newName === user?.name} className='w-24 h-10 text-white bg-black rounded-md flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed'>Save</button>
                </>
            ) : (
                <div className="text-sm text-[#6A6A6A]">{user?.name}</div>
            )}
        </div>
    )
}

export default UserName