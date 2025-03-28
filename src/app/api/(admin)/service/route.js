import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import dbConnect from "@/app/lib/dbConnect";
import ServiceModel from "@/app/model/ServiceModel";
import SubServiceModel from "@/app/model/SubServiceModel";


export async function POST(request) {
    const currentUser = await getCurrentUser()
    if (currentUser.phone !== "8595558488" || !currentUser.isVerified || currentUser.name !== "Jatin Yadav") {
        return Response.json({
            success: false,
            message: "Not authorized"
        }, { status: 400 })
    }
    await dbConnect()

    try {
        const { serviceTitle, image } = await request.json()
        const existingData = await ServiceModel.findOne({ title: serviceTitle })

        if (existingData) {
            return Response.json({
                success: false,
                message: "Service already exist"
            }, { status: 400 })
        }

        const newService = new ServiceModel({
            title: serviceTitle,
            image: image
        })

        await newService.save()
        return Response.json({
            success: true,
            message: "Service added successfully"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

export async function DELETE(request) {
    const currentUser = await getCurrentUser()
    if (currentUser.phone !== "8595558488" || !currentUser.isVerified || currentUser.name !== "Jatin Yadav") {
        return Response.json({
            success: false,
            message: "Not authorized"
        }, { status: 400 })
    }
    await dbConnect()

    try {
        const { id } = await request.json()
        const existingData = await ServiceModel.findOneAndDelete({ _id: id })
        const existingData2 = await SubServiceModel.deleteMany({ serviceId: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "Service not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "Service deleted successfully"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

