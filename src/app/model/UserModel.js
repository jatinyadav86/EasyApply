import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String,
        match: [/^[6-9]\d{9}$/, 'Please use a valid phone number'],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String
    },
    verifyCodeExpiry: {
        type: Date
    },
    documents: {
        type: Array
    },
    otherDocs: {
        type: Array,
        default: []
    }
});

const UserModel =
    mongoose.models?.User ||
    mongoose.model('User', UserSchema);

export default UserModel;