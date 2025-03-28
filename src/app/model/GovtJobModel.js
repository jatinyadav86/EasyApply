import mongoose from 'mongoose';

const GovtJobSchema = new mongoose.Schema({
    shortTitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    begin: {
        type: String,
        required: true
    },
    lastDate: {
        type: String,
        required: true
    },
    applicationFee: {
        type: [Object],
        required: true
    },
    documetsRequired: {
        type: [Object],
        required: true
    }
});

const GovtJobModel =
    mongoose.models?.GovtJob ||
    mongoose.model('GovtJob', GovtJobSchema);

export default GovtJobModel;