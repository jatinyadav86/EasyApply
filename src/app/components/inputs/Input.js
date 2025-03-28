'use client'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

const Input = ({ id, label, type = 'text', disabled, required, register, errors }) => {
  return (
    <div className="w-full relative flex flex-col gap-1">
      <input id={id} disabled={disabled} {...register(id, { required })} placeholder=" " type={type} className={`peer w-full p-4 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'} no-spinner`} />
      <label className={`absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}>{label}</label>
      {errors[id] && (
        <div className="text-xs text-rose-500 flex gap-2">
          <RiErrorWarningFill size={15} />
          {errors[id].message}</div>
      )}
    </div>
  )
}

export default Input