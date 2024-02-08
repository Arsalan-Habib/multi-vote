import Voter from "../../../../models/Voter";
import { dbConnect } from "../../../../utils/dbConnect";

export async function GET(req, { params }) {
    try {
        await dbConnect();

        const { voterNumber } = params;

        // removing all dashes and spaces
        const cleanedNumber = voterNumber.replace(/[-\s]/g, "");
        const formattedNumber = `+${cleanedNumber}`;

        console.log("phone number", formattedNumber);

        const voterExists = await Voter.exists({
            phoneNumber: formattedNumber,
        });

        console.log("voterExists", !!voterExists);

        if (!voterExists) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Provided number is not a registered member.",
                }),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
        return new Response(
            JSON.stringify({ success: false, message: "Voter not found" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error occurred verifying voter." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
