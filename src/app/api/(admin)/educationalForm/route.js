import { getCurrentUser } from "@/app/actions/getCurrrentUser";
import dbConnect from "@/app/lib/dbConnect";
import EducationalFormModel from "@/app/model/EducationalForm";



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
        const { title, image, begin, lastDate, applicationFee, documetsRequired } = await request.json()
        const existingData = await EducationalFormModel.findOne({ title: title })

        if (existingData) {
            return Response.json({
                success: false,
                message: "Educational Form already exist"
            }, { status: 400 })
        }

        const newForm = new EducationalFormModel({
            title,
            image,
            begin,
            lastDate,
            applicationFee,
            documetsRequired
        })

        await newForm.save()
        return Response.json({
            success: true,
            message: "Educational Form added successfully"
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
        const { id, title, image, begin, lastDate, applicationFee, documetsRequired } = await request.json()
        const existingData = await EducationalFormModel.findOne({ _id: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "Educational Form not found"
            }, { status: 404 })
        }

        existingData.title = title
        existingData.image = image
        existingData.begin = begin
        existingData.lastDate = lastDate
        existingData.applicationFee = applicationFee
        existingData.documetsRequired = documetsRequired

        await existingData.save()
        return Response.json({
            success: true,
            message: "Educational Form updated successfully"
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
        const existingData = await EducationalFormModel.findOneAndDelete({ _id: id })

        if (!existingData) {
            return Response.json({
                success: false,
                message: "Educational Form not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "Educational Form deleted successfully"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}

