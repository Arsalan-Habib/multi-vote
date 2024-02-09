import Applicant from "../../models/Applicant";
import Vote from "../../models/Vote"; // Make sure you import the Vote model
import { dbConnect } from "../../utils/dbConnect";

export async function GET(request) {
    try {
        console.log(`Request IP`, request?.ip);
        console.log("Request geo information", request?.geo);

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

        // Sort applicants by votes in descending order
        applicantsWithVotes.sort((a, b) => b.votes - a.votes);

        return Response.json({
            success: true,
            data: applicantsWithVotes,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "An error occurred" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
