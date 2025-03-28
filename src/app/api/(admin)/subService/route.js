import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import dbConnect from "@/app/lib/dbConnect";
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
        const { serviceId, title, applicationFee, documetsRequired, serviceCharges, discountedServiceCharges } = await request.json()
        const existingData = await SubServiceModel.findOne({ title })

        if (existingData) {
            return Response.json({
                success: false,
                message: "subService already exist"
            }, { status: 400 })
        }

        const newsubService = new SubServiceModel({
            serviceId,
            title,
            applicationFee,
            documetsRequired,
            serviceCharges,
            discountedServiceCharges
        })

        await newsubService.save()
        return Response.json({
            success: true,
            message: "subService added successfully"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

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
        const { id, title, applicationFee, documetsRequired, serviceCharges, discountedServiceCharges } = await request.json()
        const existingData = await SubServiceModel.findOne({ _id: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "subService not found"
            }, { status: 404 })
        }

        existingData.title = title
        existingData.applicationFee = applicationFee
        existingData.documetsRequired = documetsRequired
        existingData.serviceCharges = serviceCharges
        existingData.discountedServiceCharges = discountedServiceCharges

        await existingData.save()
        return Response.json({
            success: true,
            message: "subService updated successfully"
        }, { status: 200 })
    }
    catch (error) {
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
        const existingData = await SubServiceModel.findOneAndDelete({ _id: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "subService not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "subService deleted successfully"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

