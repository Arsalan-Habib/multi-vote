// models/Applicant.js
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name for this applicant."],
        },
        votes: [
            {
                type: String,
                required: "Phone number is required",
            },
        ],
    },
    {
        toJSON: { virtuals: true }, // Ensure virtuals are included when document is converted to JSON
        toObject: { virtuals: true },
    }
);

// Add a virtual field `voteCount` to the model
applicantSchema.virtual("voteCount").get(function () {
    return this.votes.length;
});

export default mongoose.models.Applicant ||
    mongoose.model("Applicant", applicantSchema);
