"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [cooldownMessage, setCooldownMessage] = useState<string>("");

    const handleSendOtp = async () => {
        console.log("Sending OTP to", phoneNumber);
        setOtpSent(true);
        toast.info("OTP has been sent.");
        setIsButtonDisabled(true);
        setCooldownMessage("Please wait 15 seconds before sending OTP again.");

        // Disable the button for 15 seconds
        setTimeout(() => {
            setIsButtonDisabled(false);
            setCooldownMessage(""); // Clear the cooldown message after 15 seconds
        }, 15000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Verifying OTP:", otp);
        toast.success("OTP verified successfully!");
    };

    return (
        <div className='container mx-auto pt-12 px-3 max-w-sm'>
            <h1 className='text-3xl font-bold mb-12 text-center'>
                OTP Verification
            </h1>
            <p className='text-md mb-12'>
                Please enter your phone number in the format shown. This number
                should be the same as the one that is in the WhatsApp group.
            </p>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='phone-number'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Phone Number ( 923324567890 )
                    </label>
                    <input
                        type='number'
                        minLength={11}
                        id='phone-number'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none px-4 py-2 focus:ring-2 focus:ring-gray-300 focus:border-transparent'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button
                    type='button'
                    className={
                        isButtonDisabled || phoneNumber.toString().length < 11
                            ? "py-2 px-4 bg-gray-300 text-gray-200 rounded w-full mb-4"
                            : "py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 w-full mb-4"
                    }
                    onClick={handleSendOtp}
                    disabled={!phoneNumber || isButtonDisabled}
                >
                    Send OTP
                </button>
                {cooldownMessage && (
                    <p className='text-xs text-gray-800 mb-4'>
                        {cooldownMessage}
                    </p>
                )}
                <div className='mb-4'>
                    <div className='mb-4'>
                        <label
                            htmlFor='otp'
                            className='block text-sm font-medium text-gray-700'
                        >
                            OTP
                        </label>
                        <input
                            type='text'
                            id='otp'
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none px-4 py-2 focus:ring-2 focus:ring-gray-300 focus:border-transparent'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            disabled={!otpSent}
                        />
                    </div>
                    <button
                        type='submit'
                        className='py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 w-full mb-12'
                        disabled={!otpSent || !otp}
                    >
                        Verify OTP
                    </button>
                </div>
            </form>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default OtpVerification;
