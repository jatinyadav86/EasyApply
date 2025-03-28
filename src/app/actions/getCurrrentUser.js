import {getServerSession} from "next-auth/next"
import { authOption } from "../api/(authentication)/auth/[...nextauth]/route"
import UserModel from "../model/UserModel"
import dbConnect from "../lib/dbConnect"
import ServiceRequestModel from "../model/ServiceRequestModel"
import { serializeServiceRequest } from "../utils/serverFunc"

export async function getSession() {
    const session = await getServerSession(authOption)
    return session
}

export async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session) {
            return null
        }
        await dbConnect();

        const currentUser = await UserModel.findOne({ phone: session.user.phone || null })
        if (!currentUser) {
            return null
        }

        const serviceRequest = await ServiceRequestModel.find({ userId: currentUser._id }).lean()

        return {
            id: currentUser._id.toString(),
            name: currentUser.name,
            phone: currentUser.phone,
            image: currentUser.image || '',
            isVerified: currentUser.isVerified,
            documents: currentUser.documents,
            otherDocs: currentUser.otherDocs,
            serviceRequest: serializeServiceRequest(serviceRequest)
        }
    } catch (error) {
        return null
    }
}