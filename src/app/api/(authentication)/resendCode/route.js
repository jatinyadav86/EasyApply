import sendVerificationCode from "@/app/helpers/sendVerificationCode";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { phone } = await request.json()
        const existingUser = await UserModel.findOne({ phone: phone })

        if (!existingUser) {
            return Response.json({
                success: false,
                message: "User doesn't exist"
            }, { status: 400 })
        }

        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 330);
        expiryDate.setHours(expiryDate.getHours() + 1);

        // send verification code to phone number
        const smsResponse = await sendVerificationCode(parseInt(phone), verifyCode);

        if (smsResponse.return) {
            existingUser.verifyCode = verifyCode;
            existingUser.verifyCodeExpiry = expiryDate;
            await existingUser.save()
            return Response.json({
                success: true,
                message: "Verification code sent successfully"
            }, { status: 200 });
        } else {
            return Response.json({
                success: false,
                message: "Failed to send verification code"
            }, { status: 500 });
        }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in sending verification code"
        }, { status: 500 })
    }
}

