import { sendOTP } from "../../../utils/otp.js";

export async function POST(req) {
    try {
        const body = await req.json();

        const { to } = body;

        const verification = await sendOTP(to);

        console.log("verification", verification);

        return new Response(
            JSON.stringify({
                success: true,
                message: "OTP sent successfully",
                data: verification,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.log("error", error.message);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to send OTP",
                error: error.message,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
