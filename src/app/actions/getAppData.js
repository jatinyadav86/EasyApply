import dbConnect from "../lib/dbConnect"
import EducationalFormModel from "../model/EducationalForm";
import GovtJobModel from "../model/GovtJobModel";
import ServiceModel from "../model/ServiceModel";
import SubServiceModel from "../model/SubServiceModel";
import { serializeData, serializeSubService } from "../utils/serverFunc";

export async function getAppData() {
    try {
        await dbConnect();
        const jobs = await GovtJobModel.find().lean()
        const eduForm = await EducationalFormModel.find().lean()
        const services = await ServiceModel.find().lean()
        const subServices = await SubServiceModel.find().lean()


        return {
            jobs: serializeData(jobs), eduForm: serializeData(eduForm), services: serializeData(services), subServices: serializeSubService(subServices)
        }
    } catch (error) {
        return null
    }
}