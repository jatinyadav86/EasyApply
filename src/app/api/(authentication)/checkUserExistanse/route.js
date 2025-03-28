import sendVerificationCode from "@/app/helpers/sendVerificationCode";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";

export async function POST(request) {
    await dbConnect()

    try {
        const { phone } = await request.json()
        const existingUser = await UserModel.findOne({ phone: phone })

        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 330);
        expiryDate.setHours(expiryDate.getHours() + 1);

        if (existingUser) {
            existingUser.verifyCode = verifyCode;
            existingUser.verifyCodeExpiry = expiryDate;
            await existingUser.save()
            // send verification code to phone number
            const smsResponse = await sendVerificationCode(parseInt(phone),verifyCode)
            if (!smsResponse.return) {
                return Response.json({
                    success: false,
                    message: "Error sending verification code"
                }, { status: 500 })
            }

            if (existingUser.isVerified) {
                return Response.json({
                    success: true,
                    isUserFind: true,
                    isVerified: true,
                    message: "user exist with phone number"
                }, { status: 200 })
            } else {
                return Response.json({
                    success: true,
                    isUserFind: true,
                    isVerified: false,
                    message: "user exist with phone number"
                }, { status: 200 })
            }

        } else {
            const newUser = new UserModel({
                phone: phone, isVerified: false, verifyCode, verifyCodeExpiry: expiryDate,
                documents: [{ title: 'photo', value: null }, { title: 'sign', value: null }, { title: 'aadhar front', value: null }, { title: 'aadhar back', value: null }]
            })
            await newUser.save()
            // send verification code to phone number
            const smsResponse = await sendVerificationCode(parseInt(phone),verifyCode)
            if (!smsResponse.return) {
                return Response.json({
                    success: false,
                    message: "Error sending verification code"
                }, { status: 500 })
            }

            return Response.json({
                success: true,
                isUserFind: false,
                message: "New user created with phone number"
            }, { status: 200 })
        }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in checking user existance"
        }, { status: 500 })
    }
}

