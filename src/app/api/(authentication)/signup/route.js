import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { name, phone, verificationCode } = await request.json()
        const existingUser = await UserModel.findOne({ phone: phone })

        if (existingUser) {
            if (existingUser.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already verified"
                }, { status: 400 })
            } else {
                const currDate = new Date();
                currDate.setMinutes(currDate.getMinutes() + 330);
                if (existingUser.verifyCode === verificationCode && existingUser.verifyCodeExpiry > currDate) {
                    existingUser.name = name
                    existingUser.isVerified = true
                    await existingUser.save()
                    return Response.json({
                        success: true,
                        message: "User verified successfully"
                    }, { status: 200 })
                } else if (existingUser.verifyCodeExpiry < currDate) {
                    return Response.json({
                        success: false,
                        message: "Verification code expired"
                    }, { status: 400 })
                } else {
                    return Response.json({
                        success: false,
                        message: "Verification code is incorrect"
                    }, { status: 400 })
                }
            }
        } else {
            return Response.json({
                success: false,
                message: "User doesn't exist"
            }, { status: 400 })
        }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error registerig user"
        }, { status: 500 })
    }
}

