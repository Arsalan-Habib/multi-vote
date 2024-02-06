import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this applicant."],
    },
});

export default mongoose.models.Applicant ||
    mongoose.model("Applicant", applicantSchema);
