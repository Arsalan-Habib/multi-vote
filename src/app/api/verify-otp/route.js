import { verifyOTP } from "../../../utils/otp.js";

export async function POST(req) {
    try {
        const body = await req.json();

        const { to, code } = body;

        const verification = await verifyOTP(to, code);

        console.log("verification", verification);

        return new Response(
            JSON.stringify({
                success: true,
                message: "OTP verified successfully",
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
                message: "OTP verification failed. Please try again.",
                error: error.message,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
