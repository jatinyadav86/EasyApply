import Container from "@/app/components/Container";
import dbConnect from "@/app/lib/dbConnect";
import ServiceRequestModel from "@/app/model/ServiceRequestModel";
import ServiceRequestCard from "@/app/components/cards/ServiceRequestCard";
import { getAppData } from "@/app/actions/getAppData";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import { redirect } from "next/navigation";

export default async function Home() {
    const currentUser = await getCurrentUser()
    if (currentUser?.phone !== "8595558488" || !currentUser?.isVerified || currentUser?.name !== "Jatin Yadav") {
        redirect("/")
    }
    const data = await getAppData()

    await dbConnect();
    const serviceRequest = await ServiceRequestModel.find().lean()

    return (
        <div className="py-[73px] md:py-20 px-5">
            <Container>
                <div className="text-4xl sm:text-5xl font-bold text-[#484848] w-full text-center mb-10">Service Requests</div>
                {serviceRequest?.length !== 0 ? (
                    <div className="w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {serviceRequest?.toReversed().map((request) => (
                            <ServiceRequestCard key={request?._id} request={request} data={data} />
                        ))}
                    </div>
                ) : (
                    <div className="w-[70%] md:w-full h-screen mx-auto">
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
            </Container>
        </div>
    );
}

export function generateMetadata() {
    return {
        title: "EaseApply - Hassle-free form applications, done for you",
        description: "Welcome to Ease Apply, your one-stop solution for educational forms and government job applications.",
    };
}
