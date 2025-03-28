import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const ServiceModel =
    mongoose.models?.Service ||
    mongoose.model('Service', ServiceSchema);

export default ServiceModel;