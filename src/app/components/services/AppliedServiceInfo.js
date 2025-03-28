import { RiInformation2Line } from 'react-icons/ri';
import CancelRequestButton from "./CancelRequestButton";
import Image from 'next/image';

const AppliedServiceInfo = async ({ id, serviceRequest, subServices, user }) => {

    let subService = await subServices.filter((subService) => subService._id.toString() == id)[0] || {}

    let service = {}


    if (user && serviceRequest.length > 0) {
        let request = serviceRequest.filter((service) => service.subServiceId === id && service.status !== "canceled")
        if (request.length > 0) {
            service = request[0]
        }
    }

    return (
        <div className="info w-full lg:w-[50%] space-y-3">
            <h2 className={`text-xl font-bold font-playfair `}>You had applied for this service.</h2>
            <div className="">
                <div className="h-9 w-40 py-1 px-3 bg-rose-500 rounded-md text-white text-lg font-semibold flex items-center justify-between gap-3 flex-nowrap mb-1">
                    <div className="text-nowrap">Status  :</div>
                    <div className="font-bold">{service.status}</div>
                </div>
                <div className="w-full md:w-96 flex items-start gap-1 font-bold text-[#484e50]">
                    <RiInformation2Line size={17} />
                    <div className=" text-xs">We will contact you soon !</div>
                </div>
            </div>
            <div className="">
                <div className="w-[90%] h-9 md:w-[340px] p-1 bg-rose-500 rounded-md text-white text-sm md:text-lg font-semibold flex items-center justify-center gap-7 flex-nowrap mb-2 relative">
                    <div className="flex justify-between gap-3">
                        <div className="text-nowrap">EaseApply Charges  :</div>
                        <div className="font-bold line-through">₹ {subService.serviceCharges}\-</div>
                        <div className="font-bold">₹ {subService?.discountedServiceCharges}\-</div>
                    </div>
                    <div className="absolute -right-16 -top-2 z-20">
                        <Image src="/images/discount.png" width={70} height={35} alt="discount" />
                    </div>
                    <div className="text-white text-xl font-bold absolute -right-[44px] -top-[6px] z-30">{Math.floor(((subService.serviceCharges - subService?.discountedServiceCharges) / subService.serviceCharges) * 100)}</div>
                    <div className="size-1 bg-zinc-500 rounded-full absolute right-[3px] top-2 z-10"></div>
                </div>
                <div className="w-full md:w-96 flex items-start gap-1 font-bold text-[#484e50]">
                    <div className="size-10">
                        <RiInformation2Line />
                    </div>
                    <div className=" text-xs">Having Trust Issue, No worries! You only pay the application charges after your application has been successfully submitted.</div>
                </div>
            </div>
            <CancelRequestButton serviceRequestId={service._id} />
            {/* <h2 className={`text-xl font-bold font-playfair mb-5`}>Upload Documents</h2>
            <div className="w-full flex items-center gap-7 flex-wrap">
                {documents.split("||").map((item, index) => (
                    <div key={index} className="w-52 h-56 p-1 font-light bg-white border-2 rounded-md outline-none">
                        <label className="text-lg text-zinc-400">{item}</label>
                        <div className="h-[80%]">
                            <ImageUpload title={item} callbackFunc={callbackFunc} value={getImage(item.trim())} />
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default AppliedServiceInfo