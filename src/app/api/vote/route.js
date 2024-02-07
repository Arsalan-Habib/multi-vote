import { dbConnect } from "../../../utils/dbConnect";
import Vote from "../../../models/Vote";

export async function POST(req) {
    await dbConnect();

    const body = await req.json();

    console.log("body", body);

    const { voter, applicants } = body;

    if (!voter || !applicants || applicants.length !== 4) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Invalid input data",
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        const updatedVote = await Vote.findOneAndUpdate(
            { voter },
            { applicants },
            { new: true, upsert: true }
        );

        if (updatedVote) {
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Vote updated/saved successfully",
                    data: updatedVote,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Failed to update/save vote",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to save vote",
                error: error.message,
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
