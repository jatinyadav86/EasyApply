import Button from '../Button'
import Image from 'next/image'
import Link from 'next/link'

const JobCard = ({ job }) => {

    return (
        <Link href={`/govtJobs/${job._id}`}>
            <div className="w-80 h-96 sm:w-full rounded-md mx-auto bg-white overflow-hidden border-[1px] border-solid border-[#dddddd] shadow-xl shadow-[#00000014] flex flex-col items-center justify-between cursor-pointer">
                <div className="w-full h-44 relative">
                    <Image alt='image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: 'cover' }} src={job.image} />
                </div>
                <div className="text-[15px] px-4 space-y-1 w-full">
                    <div className="font-bold">{job.shortTitle}</div>
                    <div className="text-[#6a6a6a]">Apllication began on {job.begin}</div>
                    <div className="text-[#6a6a6a]">Last date to apply is <span className='text-rose-500'>{job.lastDate}</span></div>
                </div>
                <div className="w-full h-11 font-semibold flex items-center justify-between px-4 mb-2">
                    <Button small label={"View Detail"} />
                </div>
            </div>
        </Link>
    )
}

export default JobCard