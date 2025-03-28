import Container from '@/app/components/Container'
import { getAppData } from '@/app/actions/getAppData';
import AddServiceButton from '@/app/components/admin/AddServiceButton';
import DeleteServiceButton from '@/app/components/admin/DeleteServiceButton';
import SubServiceButton from '@/app/components/admin/SubServiceButton';
import UpdateServiceButton from '@/app/components/admin/UpdateServiceButton';
import { arrangeDocs } from '@/app/utils/serverFunc';
import Image from 'next/image';


const page = async () => {
    const { subServices, eduForm, jobs, services } = await getAppData()

    const getSubServicesWithServiceId = (id) => {
        const subService = subServices.filter((subService) => subService.serviceId.toString() === id)
        return subService
    }

    return (
        <div className="bg-[#f1f5f9] pt-28 pb-3">
            <Container>
                <div className="w-full py-6 px-3 rounded-md bg-white relative">
                    <AddServiceButton type="educational" />
                    <div className="text-5xl font-bold w-full text-center mb-8">Educational Forms</div>
                    <div className="w-full space-y-5">
                        {eduForm?.toReversed().map((form) => (
                            <div key={form._id} className="mx-auto w-full  bg-white p-4 border rounded-md relative">
                                <div className="w-full md:flex justify-between items-center mb-6">
                                    <div className="w-full h-64 md:w-[40%] rounded-md overflow-hidden relative">
                                        <Image src={form.image} alt="image" fill />
                                    </div>
                                    <div className={`w-full md:w-[50%] pt-8 md:pt-0 md:pl-8 space-y-5`}>
                                        <div className="info mb-6 space-y-3">
                                            <h2 className={`text-xl font-bold font-playfair`}>Title</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold">{form.title}</div>
                                        </div>
                                        <div className="info mb-6">
                                            <h2 className={`text-xl font-bold font-playfair mb-3`}>Important Dates</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-6 flex-wrap">
                                                <div className="flex justify-between gap-3">
                                                    <div className="text-nowrap">Application Begin :</div>
                                                    <div className="font-bold">{form.begin}</div>
                                                </div>
                                                <div className="flex justify-between gap-3">
                                                    <div className="text-nowrap">Last Date :</div>
                                                    <div className="font-bold text-red-500">{form.lastDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info mb-6">
                                            <h2 className={`text-xl font-bold font-playfair mb-3`}>Apllication Fee</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                                                {form.applicationFee.map((fee, index) => (
                                                    <div key={index} className="flex justify-between gap-3">
                                                        <div className="text-nowrap">{fee.title} :</div>
                                                        <div className="font-bold">₹ {fee.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info mb-6">
                                    <h2 className={`text-xl font-bold mb-5 font-playfair`}>Documents Required</h2>
                                    <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                                        {form.documetsRequired.map((item) => (
                                            <div key={item.title} className="w-72 border rounded-xl p-4 space-y-2">
                                                <div className="flex gap-3">
                                                    <div className="text-nowrap">Title :</div>
                                                    <div className="font-bold">{item.title}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-nowrap">Documents :</div>
                                                    <div className="font-bold ">
                                                        <ul className="list-disc pl-5 text-wrap">
                                                            {arrangeDocs(item.value)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <DeleteServiceButton type="educational" id={form._id} />
                                <UpdateServiceButton type="educational" id={form._id} />
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="w-full py-6 px-3 rounded-md my-4 bg-white relative">
                    <AddServiceButton type="services" />
                    <div className="text-5xl font-bold w-full text-center mb-5">Services</div>
                    {services?.map((service) => (
                        <div key={service._id} className="info mb-6">
                            <div className="flex items-center gap-4 mb-5">
                                <h2 className={`text-2xl font-bold font-playfair`}>{service.title}</h2>
                                <SubServiceButton func="add" id={service._id} />
                                <DeleteServiceButton type="services" id={service._id} />
                            </div>
                            <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap mx-5">
                                {getSubServicesWithServiceId(service._id)?.map((subService) => (
                                    <div key={subService._id} className="w-72 border rounded-xl p-4 space-y-2 relative">
                                        <div className="flex gap-3">
                                            <div className="text-nowrap">Title :</div>
                                            <div className="font-bold">{subService.title}</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="text-nowrap">Application Fee :</div>
                                            <div className="font-bold">₹ {subService.applicationFee}</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="text-nowrap">Service Charges :</div>
                                            <div className="font-bold">₹ {subService.serviceCharges}</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="text-nowrap">Discounted Service Charges :</div>
                                            <div className="font-bold">₹ {subService.discountedServiceCharges}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-nowrap">Documents :</div>
                                            <div className="font-bold ">
                                                <ul className="list-disc pl-5 text-wrap">
                                                    {subService.documetsRequired.map((item, index) => (
                                                        <li key={index}>{item}.</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <SubServiceButton func="delete" id={subService._id} />
                                        <SubServiceButton func="update" id={subService._id} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
                <hr />
                <div className="w-full py-6 px-6 rounded-md bg-white relative">
                    <AddServiceButton type="govtJob" />
                    <div className="text-5xl font-bold w-full text-center mb-5">Govt. Jobs</div>
                    <div className="w-full space-y-5">
                        {jobs?.toReversed().map((job) => (
                            <div key={job._id} className="mx-auto w-full  bg-white p-4 border rounded-md relative">
                                <div className="md:flex justify-between items-center mb-6">
                                    <div className="w-full h-64 md:w-[40%] rounded-md overflow-hidden relative">
                                        <Image src={job.image} alt="image" fill />
                                    </div>
                                    <div className={`w-full md:w-[50%] pt-8 md:pt-0 md:pl-8 space-y-5`}>
                                        <div className="info mb-6 space-y-3">
                                            <h2 className={`text-xl font-bold font-playfair`}>Title</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold">{job.title}</div>
                                        </div>
                                        <div className="info mb-6 space-y-3">
                                            <h2 className={`text-xl font-bold font-playfair`}>Short Title</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold">{job.shortTitle}</div>
                                        </div>
                                        <div className="info mb-6">
                                            <h2 className={`text-xl font-bold font-playfair mb-3`}>Important Dates</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-6 flex-wrap">
                                                <div className="flex justify-between gap-3">
                                                    <div className="text-nowrap">Application Begin :</div>
                                                    <div className="font-bold">{job.begin}</div>
                                                </div>
                                                <div className="flex justify-between gap-3">
                                                    <div className="text-nowrap">Last Date :</div>
                                                    <div className="font-bold text-red-500">{job.lastDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info mb-6">
                                            <h2 className={`text-xl font-bold font-playfair mb-3`}>Apllication Fee</h2>
                                            <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                                                {job.applicationFee.map((fee, index) => (
                                                    <div key={index} className="flex justify-between gap-3">
                                                        <div className="text-nowrap">{fee.title} :</div>
                                                        <div className="font-bold">₹ {fee.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info mb-6">
                                    <h2 className={`text-xl font-bold mb-5 font-playfair`}>Documents Required</h2>
                                    <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                                        {job.documetsRequired.map((item) => (
                                            <div key={item.title} className="w-72 border rounded-xl p-4 space-y-2">
                                                <div className="flex gap-3">
                                                    <div className="text-nowrap">Title :</div>
                                                    <div className="font-bold">{item.title}</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-nowrap">Documents :</div>
                                                    <div className="font-bold ">
                                                        <ul className="list-disc pl-5 text-wrap">
                                                            {arrangeDocs(item.value)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <DeleteServiceButton type="govtJob" id={job._id} />
                                <UpdateServiceButton type="govtJob" id={job._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default page


export function generateMetadata() {
    return {
        title: "Admin - EaseApply",
        description: "Admin page for EaseApply",
    };
}