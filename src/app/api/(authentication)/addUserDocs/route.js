import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { userId, title, value, type } = await request.json()
        const user = await UserModel.findOne({_id: userId})
        if (!user) {
            return Response.json({
                success: false,
                message: "User doesn't exist"
            }, { status: 400 })
        }

        if (type === "necessaryDocs") {
            let updatedElement = { title, value }
            let updatedDocuments = user.documents.map(doc => doc.title === title ? updatedElement : doc)
            user.documents = updatedDocuments
            await user.save()
            return Response.json({
                success: true,
                message: "Document added successfully"
            }, { status: 200 })
        }

        if (type === "otherDocs") {
            let updatedElement = { title, value }
            let updatedDocuments = user.otherDocs.map(doc => doc.title === title ? updatedElement : doc)
            user.otherDocs = updatedDocuments
            await user.save()
            return Response.json({
                success: true,
                message: "Document added successfully"
            }, { status: 200 })
        }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error adding document"
        }, { status: 500 })
    }
}

