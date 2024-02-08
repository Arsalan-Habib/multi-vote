// models/Vote.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
    {
        voter: {
            type: String,
            required: true,
            unique: true, // Ensure that each voter can only have one vote document
        },
        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Applicant",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Vote || mongoose.model("Vote", voteSchema);
