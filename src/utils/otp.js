// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require("twilio")(accountSid, authToken);

export const sendOTP = async (to) => {
    const verification = await client.verify.v2
        .services(serviceId)
        .verifications.create({
            to: `+${to}`,
            channel: "whatsapp",
        });
    return verification;
};

export const verifyOTP = async (to, code) => {
    const verification = await client.verify.v2
        .services(serviceId)
        .verificationChecks.create({
            to: `+${to}`,
            code,
        });
    return verification;
};
