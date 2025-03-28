import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import Image from "next/image";
import ChangeStatus from "../admin/ChangeStatus";

const ServiceRequestCard = async ({ request, data }) => {
    const { services } = data
    await dbConnect();
    const currUser = await UserModel.findOne({ _id: request.userId }).lean()

    let serviceName = ""
    if (request.serviceType === "services") {
        const service = services.find(service => service._id == request.serviceId)
        serviceName = service.title
    } else {
        serviceName = request?.serviceTitle
    }

    // Convert MongoDB date string to Date object
    const date = new Date(request.appliedDate);

    // Format the date
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return (
        <div className="w-full h- rounded-md mx-auto bg-white overflow-hidden border-[1px] border-solid border-[#dddddd] shadow-xl shadow-[#00000014] flex flex-col items-center justify-betwe py-4">
            <div className="text-[15px] space-y-1 w-full px-4 mb-4">
                <div className="text-[#6a6a6a]">Name : <span className="font-bold">{currUser?.name}</span></div>
                <div className="text-[#6a6a6a]">Contact : <span className='text-rose-500 font-bold'>{currUser?.phone}</span></div>
            </div>
            <hr className="w-full" />
            <div className="w-full text-[15px] space-y-2 my-2 px-4">
                <div className="text-[#6a6a6a]">Service Name : <span className="font-bold">{serviceName}</span></div>
                <div className="text-[#6a6a6a]">SubService Name : <span className="font-bold">{request.subServiceTitle}</span></div>
                <div className="text-[#6a6a6a]">Service Type : <span className="font-bold">{request.serviceType}</span></div>
                <ChangeStatus status={request.status} userId={currUser?._id.toString()} serviceRequestId={request._id.toString()} />
                <div className="text-[#6a6a6a]">Contact Preference : <span className="font-bold">{request.contactPref}</span></div>
                <div className="text-[#6a6a6a]">Applied Date : <span className="font-bold">{formattedDate}</span></div>
            </div>
            <div className="w-full px-4">
                <div className="text-base text-[#6a6a6a] font-semibold mb-2">Documets</div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                    {currUser?.documents?.map((doc, index) => {
                        if (doc.value) {
                            return (
                                <div key={index} className="w-40 h-44 p-1 font-light bg-white border-2 rounded-md outline-none">
                                    <label className="text-lg text-zinc-400">{doc.title}</label>
                                    <div className="w-full h-[80%] text-neutral-600 flex flex-col gap-2 items-center justify-center relative border-dashed border-2 border-neutral-300">
                                        <Image alt='upload' fill style={{ objectFit: "contain" }} src={doc.value} />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="w-40 h-44 p-1 font-light bg-white border-2 rounded-md outline-none">
                                    <label className="text-lg text-zinc-400">{doc.title}</label>
                                    <div className="w-full h-[80%] text-sm font-bold text-neutral-600 flex flex-col gap-2 items-center justify-center relative border-dashed border-2 border-neutral-300">
                                        No Image Uploaded
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default ServiceRequestCard