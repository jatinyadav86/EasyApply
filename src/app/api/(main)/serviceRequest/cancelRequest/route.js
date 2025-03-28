import dbConnect from "@/app/lib/dbConnect";
import ServiceRequestModel from "@/app/model/ServiceRequestModel";

export async function PUT(request) {
    await dbConnect()

    try {
        const { userId, serviceRequestId } = await request.json()
        const requset = await ServiceRequestModel.findOne({_id: serviceRequestId, userId: userId})
        if (!requset) {
            return Response.json({
                success: false,
                message: "Service request not found"
            }, { status: 400 })
        }

        requset.status = "canceled"
        await requset.save()
        return Response.json({
            success: true,
            message: "Request canceled successfully"
        }, { status: 200 })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error cancelling request"
        }, { status: 500 })
    }
}

