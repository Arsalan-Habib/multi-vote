import Applicant from "../../models/Applicant";
import Vote from "../../models/Vote"; // Make sure you import the Vote model
import { dbConnect } from "../../utils/dbConnect";

export async function GET() {
    try {
        await dbConnect();

        // Aggregate votes for each applicant
        const voteCounts = await Vote.aggregate([
            { $unwind: "$applicants" },
            {
                $group: {
                    _id: "$applicants",
                    votes: { $sum: 1 },
                },
            },
        ]);

        // Get all applicants
        const applicants = await Applicant.find();

        // Map vote counts to applicants
        const applicantsWithVotes = applicants.map((applicant) => {
            const vote = voteCounts.find(
                (v) => v._id.toString() === applicant._id.toString()
            );
            return {
                ...applicant.toObject(), // Convert Mongoose document to object
                votes: vote ? vote.votes : 0, // Assign vote count or 0 if not found
            };
        });

        return new Response(JSON.stringify(applicantsWithVotes), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "An error occurred" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
