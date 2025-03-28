import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        // console.log("Already connected to database")
        return;
    } 

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/project_2`);
        connection.isConnected = db.connections[0].readyState;
        // console.log("Connected to database")

    } catch (error) {
        throw new Error(error)
        // process.exit(1)
    }
}

export default dbConnect;