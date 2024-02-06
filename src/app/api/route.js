import Applicant from "../../models/Applicant";
import { dbConnect } from "../../utils/dbConnect";

export async function GET() {
    try {
        console.log("Route was hit!");
        await dbConnect();

        // Get all applicants
        const applicants = await Applicant.find();

        console.log(applicants);
        return Response.json(applicants);
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}
