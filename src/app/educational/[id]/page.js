import { RiInformation2Line } from 'react-icons/ri'
import { getAppData } from '@/app/actions/getAppData';
import { getCurrentUser } from '@/app/actions/getCurrrentUser';
import ApplyServiceButton from '@/app/components/services/ApplyServiceButton';
import { arrangeDocs } from "@/app/utils/serverFunc";
import Image from "next/image";
import CancelRequestButton from "@/app/components/services/CancelRequestButton";


const page = async ({ params }) => {
  const { id } = await params;
  const { eduForm } = await getAppData()
  const currentUser = await getCurrentUser()
  let serviceRequest = currentUser?.serviceRequest

  const currEduForm = await eduForm.filter((form) => form._id === id)[0]

  let service = {}
  if (currentUser) {
    let request = serviceRequest.filter((service) => service.serviceId === id && service.status !== "canceled")
    if (request.length > 0) {
      service = request[0]
    }
  }

  return (
    <>
      <div className="bg-[#f1f5f9] pt-[73px] w-full">
        <div className="w-full mx-auto">
          <div className="mx-auto w-full md:w-[80%] bg-white p-8">
            <div className="md:flex justify-between items-center mb-6">
              <div className=" w-full md:w-[50%] h-64 rounded-md overflow-hidden relative">
                <Image src={currEduForm?.image} alt="image" fill style={{ objectFit: 'contain', borderRadius: '6px' }} />
              </div>
              <div className={`w-full md:w-[50%] pt-8 md:pt-0 md:pl-8 space-y-5 font-playfair text-3xl lg:text-[2.875rem]/[3.25rem] text-[#202628] font-bold text-center`}>{currEduForm.title}</div>
            </div>
            <div className="info mb-6">
              <h2 className={`text-xl font-bold font-playfair mb-5`}>Important Dates</h2>
              <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-6 flex-wrap">
                <div className="flex justify-between gap-3">
                  <div className="text-nowrap">Application Begin :</div>
                  <div className="font-bold">{currEduForm.begin}</div>
                </div>
                <div className="flex justify-between gap-3">
                  <div className="text-nowrap">Last Date :</div>
                  <div className="font-bold text-red-500">{currEduForm.lastDate}</div>
                </div>
              </div>
            </div>
            <div className="info mb-6">
              <h2 className={`text-xl font-bold font-playfair mb-3`}>Apllication Fee</h2>
              <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                {currEduForm.applicationFee.map((fee, index) => (
                  <div key={index} className="flex justify-between gap-3">
                    <div className="text-nowrap">{fee.title} :</div>
                    <div className="font-bold">₹ {fee.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="info mb-6">
              <h2 className={`text-xl font-bold mb-5 font-playfair`}>Documents Required</h2>
              <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                {currEduForm.documetsRequired.map((item) => (
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
            <hr />
            {Object.keys(service).length === 0 ? (
              <div className="info my-6">
                <h2 className={`text-xl font-bold font-playfair mb-5`}>Struggling with Form Application, don't worry ! we will apply for you !</h2>
                <div className="flex gap-7 flex-wrap">
                  <div className="">
                    <div className="w-[85%] h-9 md:w-[340px] p-1 bg-rose-500 rounded-md text-white text-sm md:text-lg font-semibold flex items-center justify-center gap-7 flex-nowrap mb-2 relative">
                      <div className="flex justify-between gap-3">
                        <div className="text-nowrap">EaseApply Charges  :</div>
                        <div className="font-bold line-through">₹ 150\-</div>
                        <div className="font-bold">₹ 50\-</div>
                      </div>
                      <div className="absolute -right-16 -top-2 z-20">
                        <Image src="/images/discount.png" width={70} height={35} alt="discount" />
                      </div>
                      <div className="text-white text-xl font-bold absolute -right-[44px] -top-[6px] z-30">{Math.floor(((150 - 50) / 150) * 100)}</div>
                      <div className="size-1 bg-zinc-500 rounded-full absolute right-[3px] top-2 z-10"></div>
                    </div>
                    <div className="w-full md:w-96 flex items-start gap-1 font-bold text-[#484e50]">
                      <RiInformation2Line size={29} />
                      <div className=" text-xs">Having Trust Issue, No worries! You only pay the application charges after your application has been successfully submitted.</div>
                    </div>
                  </div>
                  <ApplyServiceButton currentUser={currentUser} serviceId={id} serviceType="educational" serviceData={currEduForm.documetsRequired} />
                </div>
              </div>
            ) : (
              <div className="info my-6 space-y-4">
                <h2 className={`text-xl font-bold font-playfair mb-5`}>You had applied for this form application</h2>
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
                  <div className="w-[85%] h-9 md:w-[340px] p-1 bg-rose-500 rounded-md text-white text-sm md:text-lg font-semibold flex items-center justify-center gap-7 flex-nowrap mb-2 relative">
                    <div className="flex justify-between gap-3">
                      <div className="text-nowrap">EaseApply Charges  :</div>
                      <div className="font-bold line-through">₹ 150\-</div>
                      <div className="font-bold">₹ 50\-</div>
                    </div>
                    <div className="absolute -right-16 -top-2 z-20">
                      <Image src="/images/discount.png" width={70} height={35} alt="discount" />
                    </div>
                    <div className="text-white text-xl font-bold absolute -right-[44px] -top-[6px] z-30">{Math.floor(((150 - 50) / 150) * 100)}</div>
                    <div className="size-1 bg-zinc-500 rounded-full absolute right-[3px] top-2 z-10"></div>
                  </div>
                  <div className="w-full md:w-96 flex items-start gap-1 font-bold text-[#484e50]">
                    <RiInformation2Line size={29} />
                    <div className=" text-xs">Having Trust Issue, No worries! You only pay the application charges after your application has been successfully submitted.</div>
                  </div>
                </div>
                <CancelRequestButton serviceRequestId={service._id} />
                {/* <h2 className={`text-xl font-bold font-playfair mb-5`}>Documents</h2>
                      <div className="w-full flex items-center gap-5 flex-wrap">
                        {documents.split("||").map((item, index) => (
                          <div key={index} className="w-72 p-3 font-light bg-white border-2 rounded-md outline-none">
                            <label className="text-lg my-10 text-zinc-400">{item}</label>
                            <ImageUpload value={image} onChange={(value) => setImage(value)} />
                          </div>
                        ))}
                      </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default page

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { eduForm } = await getAppData()
  const currEduForm = await eduForm.filter((form) => form._id === id)[0]

  return {
    title: currEduForm.title,
    description: "Welcome to Ease Apply, your one-stop solution for educational forms and government job applications.",
  };
}

