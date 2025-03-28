import sendVerificationCode from "@/app/helpers/sendVerificationCode";
import dbConnect from "@/app/lib/dbConnect";
import ServiceRequestModel from "@/app/model/ServiceRequestModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { userId, contactPref, serviceType, serviceId,serviceTitle, subServiceId, subServiceTitle } = await request.json()
        let searchParams = {}
        if (serviceType === 'services') {
            searchParams = { userId, serviceId, subServiceId }
        }else if(serviceType === 'specified'){
            searchParams = { userId, serviceTitle }
        }else{
            searchParams = { userId, serviceId, subServiceTitle }
        }
        const existingData = await ServiceRequestModel.findOne(searchParams)

        if (existingData && existingData.status !== "canceled") {
            return Response.json({
                success: false,
                message: "Service Request already exist"
            }, { status: 400 })
        }

        const newServiceReq = new ServiceRequestModel({
            userId,
            contactPref,
            serviceType,
            serviceId,
            serviceTitle,
            subServiceId,
            subServiceTitle
        })

        await newServiceReq.save()
        await sendVerificationCode(8383069013, 200);
        return Response.json({
            success: true,
            message: "Service Request added successfully"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

