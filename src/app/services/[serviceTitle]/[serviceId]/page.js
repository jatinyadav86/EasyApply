import { RiInformation2Line } from 'react-icons/ri'
import AppliedServiceInfo from '@/app/components/services/AppliedServiceInfo';
import { getAppData } from '@/app/actions/getAppData';
import { getCurrentUser } from '@/app/actions/getCurrrentUser';
import ApplyServiceButton from '@/app/components/services/ApplyServiceButton';
import Image from 'next/image';


const page = async ({ params }) => {
  const { serviceId } = await params;

  const { subServices, services } = await getAppData()
  const currentUser = await getCurrentUser()
  let serviceRequest = currentUser?.serviceRequest

  let serviceTitle = services.filter((service) => service._id === serviceId)[0]?.title

  let currSubServices = await subServices.filter((subService) => subService.serviceId.toString() === serviceId)

  const isApplied = (id) => {
    if (currentUser && serviceRequest.length > 0) {
      let request = serviceRequest.filter((service) => service.subServiceId === id && service.status !== "canceled")
      return request.length > 0
    }
  }


  return (
    <>
      <div className="bg-[#f1f5f9] pt-[73px] w-full">
        <div className="w-full mx-auto">
          <div className="mx-auto w-full md:w-[80%] bg-white p-8">
            <div className={`w-full md:pt-0 md:pl-8 mb-6 font-playfair text-[2.875rem]/[3.25rem] text-[#484848] font-bold text-center`}>{serviceTitle}</div>
            <hr />
            {currSubServices.map((subService) => (
              <div key={subService._id} className="w-full p-5 my-4 rounded-md bg-[#f7f7f7]">
                <div className={`w-full mb-2 font-playfair text-3xl text-[#202628] text-center font-bold`}>{subService.title}</div>
                <hr />
                <div className="w-full mt-4 flex flex-col lg:flex-row justify-between items-center px-2 lg:px-6">
                  <div className="w-full lg:w-50%">
                    <div className="info mb-6">
                      <h2 className={`text-xl font-bold font-playfair mb-3`}>Apllication Fee</h2>
                      <div className="w-full text-[#484e50] text-sm font-semibold flex items-center gap-7 flex-wrap">
                        <div className="flex justify-between gap-3">
                          <div className="text-nowrap">Fee :</div>
                          <div className="font-bold">₹ {subService.applicationFee}</div>
                        </div>
                      </div>
                    </div>
                    <div className="info mb-6">
                      <h2 className={`text-xl font-bold mb-5 font-playfair`}>Documents Required</h2>
                      <div className="w-72 text-[#484e50] text-sm font-semibold border rounded-xl p-4 space-y-1">
                        <div className="text-nowrap">Documents :</div>
                        <div className="font-bold ">
                          <ul className="list-disc pl-5 text-wrap">
                            {subService.documetsRequired.map((item, index) => (
                              <li key={index}>{item}.</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isApplied(subService._id) ? (
                    <div className="info w-full lg:w-[50%] space-y-5">
                      <h2 className={`text-xl font-bold font-playfair mb-5 text-wrap`}>Struggling with Documents, don't worry ! we will apply for you !</h2>
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
                      <ApplyServiceButton currentUser={currentUser} serviceId={serviceId} serviceType="services" subServiceId={subService._id.toString()} />
                    </div>
                  ) : (
                    <AppliedServiceInfo id={subService._id} serviceRequest={serviceRequest} subServices={subServices} user={currentUser} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default page

export async function generateMetadata({ params }) {
  const { serviceId } = await params;
  const { services } = await getAppData()
  let serviceTitle = services.filter((service) => service._id === serviceId)[0]?.title

  return {
    title: serviceTitle,
    description: "Welcome to Ease Apply, your one-stop solution for educational forms and government job applications.",
  };
}