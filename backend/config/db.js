import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGODB_URL)
        console.log("db conneted");
    } catch {
        console.log("db error");
    }
}

export default connectDB