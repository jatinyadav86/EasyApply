import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { userId, newName } = await request.json()
        const user = await UserModel.findOne({_id: userId})
        if (!user) {
            return Response.json({
                success: false,
                message: "User doesn't exist"
            }, { status: 400 })
        }

        user.name = newName
        await user.save()
        return Response.json({
            success: true,
            message: "User's name updated successfully"
        }, { status: 200 })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error updating name"
        }, { status: 500 })
    }
}

