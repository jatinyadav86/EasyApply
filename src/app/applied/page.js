import { SiTicktick } from 'react-icons/si'
import { TiCancel } from 'react-icons/ti'
import { getAppData } from '../actions/getAppData'
import { getCurrentUser } from '../actions/getCurrrentUser'
import Link from 'next/link'
import CancelServiceRequest from '../components/services/CancelServiceRequest'
import { formatDate, truncateString } from '../utils/serverFunc'

const page = async () => {
    const { subServices, eduForm, jobs, services } = await getAppData()
    const currentUser = await getCurrentUser()
    let serviceRequest = currentUser?.serviceRequest

    const getDetail = (serviceRequest) => {
        const getColor = () => {
            if (serviceRequest.status === "accepted") {
                return "text-yellow-500"
            } else if (serviceRequest.status === "fulfilled") {
                return "text-green-500"
            } else if (serviceRequest.status === "applied") {
                return "text-rose-500"
            } else if (serviceRequest.status === "canceled") {
                return "text-rose-500"
            }
        }
        const getIcon = () => {
            if (serviceRequest.status === "fulfilled") {
                return <div className="absolute top-3 right-4 text-green-500"><SiTicktick size={12} /></div>
            } else if (serviceRequest.status === "accepted") {
                return <div className="absolute top-3 right-4 rounded-full size-[6px] bg-yellow-500"></div>
            } else if (serviceRequest.status === "canceled") {
                return <div className="absolute top-3 right-4 text-rose-500"><TiCancel size={15} /></div>
            }
        }
        const setRoute = (str) => {
            return str.replace(/\s+/g, '_').toLowerCase()
        }

        let href = "#"
        let title = ""

        if (serviceRequest.serviceType === "services") {
            title = serviceRequest.subServiceTitle
            let isServiceExist = subServices.filter((service) => service._id === serviceRequest.subServiceId).length !== 0
            let serviceTitle = services.filter((service) => service._id === serviceRequest.serviceId)[0]?.title
            if (isServiceExist) {
                href = `/services/${setRoute(serviceTitle)}/${serviceRequest.serviceId}`
            }
        } else if (serviceRequest.serviceType === "educational") {
            title = serviceRequest.serviceTitle
            let isEduFormExist = eduForm.filter((form) => form._id === serviceRequest.serviceId).length !== 0
            if (isEduFormExist) {
                href = `/educational/${serviceRequest.serviceId}`
            }
        } else if (serviceRequest.serviceType === "govtJob") {
            title = serviceRequest.serviceTitle
            let isJobExist = jobs.filter((form) => form._id === serviceRequest.serviceId).length !== 0
            if (isJobExist) {
                href = `/govtJobs/${serviceRequest.serviceId}`
            }
        } else if (serviceRequest.serviceType === "specified") {
            title = serviceRequest.serviceTitle
        }

        return (
            <Link href={href}>
                <div className="h-24 rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-4 mx-3 md:mx-0  flex flex-col justify-between relative cursor-pointer">
                    <div className="flex justify-between items-center">
                        <div className="text-base font-bold text-nowrap">{truncateString(title)}</div>
                        <CancelServiceRequest serviceRequestId={serviceRequest._id.toString()} serviceRequestStatus={serviceRequest.status} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-[#6A6A6A]">Applied on {formatDate(serviceRequest.appliedDate)}</div>
                        <div className="text-sm text-[#6A6A6A]">Status: <span className={`${getColor()}`}>{serviceRequest.status}</span></div>
                    </div>
                    {getIcon()}
                </div>
            </Link>
        )

    }

    return (
        <div className={`w-full md:w-[70%] ${serviceRequest?.length < 3 && "h-screen"} pt-[73px] mx-auto`}>
            <div className="text-3xl font-bold mt-10 mb-2 text-center md:text-left">Applied Services</div>
            <hr className='mb-5' />
            {serviceRequest?.length !== 0 ? (
                <div className="w-full lg:w-[50%] mb-5">
                    {serviceRequest?.toReversed().map((request, index) => (
                        <div key={request._id} className='space-y-5 mb-5'>
                            {getDetail(request)}
                            {index !== (serviceRequest.length - 1) && (
                                <div className="w-full h-[1px] bg-[#e5e7eb] "></div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-[70%] md:w-full mx-auto">
                    <div className="my-8">
                        <div className="text-2xl font-semibold text-[#222222]">No service booked ... yet!</div>
                        <div className="text-base mt-2">Get your documents or apllication form done while sitting at comfort of your home.</div>
                        <Link href={"/"}>
                            <div className="w-40 h-12 flex justify-center items-center border border-black text-[#222222] font-semibold rounded-md hover:bg-[#f7f7f7] mt-5 cursor-pointer">Start exploring</div>
                        </Link>
                    </div>
                    <hr />
                </div>
            )}
        </div>
    )
}

export default page

export function generateMetadata() {
    return {
        title: "EaseApply - Hassle-free form applications, done for you",
        description: "Welcome to Ease Apply, your one-stop solution for educational forms and government job applications.",
    };
}