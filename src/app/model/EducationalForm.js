import mongoose from 'mongoose';

const EducationalFormSchema = new mongoose.Schema({
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

const EducationalFormModel =
    mongoose.models?.EducationalForm ||
    mongoose.model('EducationalForm', EducationalFormSchema);

export default EducationalFormModel;