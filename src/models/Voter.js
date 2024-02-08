import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensure that the phone number is unique
    },
});

export default mongoose.model("Voter", voterSchema);
