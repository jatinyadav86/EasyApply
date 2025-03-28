import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import dbConnect from "@/app/lib/dbConnect";
import GovtJobModel from "@/app/model/GovtJobModel";

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
        const { shortTitle, title, image, begin, lastDate, applicationFee, documetsRequired } = await request.json()
        const existingData = await GovtJobModel.findOne({ title: title })

        if (existingData) {
            return Response.json({
                success: false,
                message: "GovtJob already exist"
            }, { status: 400 })
        }

        const newGovtJob = new GovtJobModel({
            shortTitle,
            title,
            image,
            begin,
            lastDate,
            applicationFee,
            documetsRequired
        })

        await newGovtJob.save()
        return Response.json({
            success: true,
            message: "GovtJob added successfully"
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
        const { id, shortTitle, title, image, begin, lastDate, applicationFee, documetsRequired } = await request.json()
        const existingData = await GovtJobModel.findOne({ _id: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "GovtJob not found"
            }, { status: 404 })
        }

        existingData.shortTitle = shortTitle
        existingData.title = title
        existingData.image = image
        existingData.begin = begin
        existingData.lastDate = lastDate
        existingData.applicationFee = applicationFee
        existingData.documetsRequired = documetsRequired

        await existingData.save()
        return Response.json({
            success: true,
            message: "GovtJob updated successfully"
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
        const existingData = await GovtJobModel.findOneAndDelete({ _id: id })


        if (!existingData) {
            return Response.json({
                success: false,
                message: "GovtJob not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "GovtJob deleted successfully"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

