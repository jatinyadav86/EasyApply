import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        default: 'applied',
        required: true
    },
    contactPref: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId
    },
    serviceTitle: {
        type: String
    },
    subServiceId: {
        type: mongoose.Schema.Types.ObjectId
    },
    subServiceTitle: {
        type: String
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
});

const ServiceRequestModel =
    mongoose.models?.serviceRequest ||
    mongoose.model('serviceRequest', ServiceRequestSchema);

export default ServiceRequestModel;