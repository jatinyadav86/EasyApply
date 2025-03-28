import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'


const ServiceCard = ({ service }) => {

    const setRoute = (str) => {
        return str.replace(/\s+/g, '_').toLowerCase()
    }

    return (
        <Link href={`/services/${setRoute(service.title)}/${service._id}`}>
            <div className="w-auto sm:w-[300px] md:w-[350px] lg:w-[300px] h-12 group bg-white mx-8 sm:mx-auto border rounded-md shadow-sm shadow-gray-400 flex items-center justify-between px-3 cursor-pointer lg:hover:scale-105">
                <div className="w-12 h-7 relative">
                    <Image alt='image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'contain', borderRadius: '2px' }} src={service.image} />
                </div>
                <div className="text-lg font-bold f">{service.title}</div>
                <div className="w-[20%]  rounded-full lg:group-hover:text-rose-500">
                    <FaArrowRight className='size-5 ml-auto' />
                </div>
            </div>
        </Link>
    )
}

export default ServiceCard