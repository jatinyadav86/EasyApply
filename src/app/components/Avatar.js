import Image from 'next/image'
import React from 'react'

const Avatar = ({ name }) => {
  return (
    <>
      {name ? (
          <div className="size-6 md:size-[30px] bg-[#78909c] text-white rounded-full flex items-center justify-center font-bold text-sm">{name?.charAt(0)}</div>
      ) : (
        <Image height={30} width={30} alt='Avatar' src={'/images/placeholder.svg'} className='rounded-full' />
      )}
    </>
  )
}

export default Avatar