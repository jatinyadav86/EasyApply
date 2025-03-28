import mongoose from 'mongoose';

const SubServiceSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    applicationFee: {
        type: String,
        required: true
    },
    documetsRequired: {
        type: [],
        required: true
    },
    serviceCharges:{
        type: String,
        required: true
    },
    discountedServiceCharges:{
        type: String,
        required: true
    }
});

const SubServiceModel =
    mongoose.models?.SubService ||
    mongoose.model('SubService', SubServiceSchema);

export default SubServiceModel;