import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import dbConnect from "@/app/lib/dbConnect";
import ServiceRequestModel from "@/app/model/ServiceRequestModel";

export async function PUT(request) {
    const currentUser = await getCurrentUser()
    if (currentUser.phone !== "8595558488" || !currentUser.isVerified || currentUser.name !== "Jatin Yadav") {
        return Response.json({
            success: false,
            message: "Not authorized"
        }, { status: 400 })
    }
    await dbConnect()

    try {
        const { userId, serviceRequestId, status } = await request.json()
        const requset = await ServiceRequestModel.findOne({ _id: serviceRequestId, userId: userId })
        if (!requset) {
            return Response.json({
                success: false,
                message: "Service request not found"
            }, { status: 400 })
        }

        requset.status = status
        await requset.save()
        return Response.json({
            success: true,
            message: "Status changed successfully"
        }, { status: 200 })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error changing status"
        }, { status: 500 })
    }
}

