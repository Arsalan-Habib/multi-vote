"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const OtpVerification = () => {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // retrieving votes from local storage
        const votes = JSON.parse(localStorage.getItem("votes") || "[]");

        if (votes.length < 4) {
            toast.error("Please select candidates to vote for first.");
            router.push("/add-vote");
            return;
        }

        // Prepare the body of the POST request
        const body = {
            voter: phoneNumber,
            applicants: votes,
        };

        try {
            // Send the votes to the server
            const response = await fetch("/api/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            // Check if the request was successful
            if (response.ok) {
                const data = await response.json();
                toast.success(
                    "Vote submitted successfully! Thank You! \n Redirecting to home page..."
                );

                setTimeout(() => {
                    setPhoneNumber("");
                    // Clear votes from localStorage
                    localStorage.removeItem("votes");
                    // Redirect or update UI as needed
                    router.push("/");
                }, 6000);
            } else {
                // Handle server errors or invalid responses
                const errorData = await response.json();
                toast.error(`Error submitting vote: ${errorData.message}`);
            }
        } catch (error) {
            // Handle network errors
            console.error("Failed to submit vote:", error);
            toast.error("Network error, please try again.");
        }
    };

    return (
        <div className='container mx-auto pt-12 px-3 max-w-sm relative'>
            <div className='mb-12'>
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className='absolute top-11 left-2 text-gray-500 border-gray-500 border-2 rounded-lg px-1 py-0 hover:bg-gray-100'
                >
                    <ChevronLeftIcon className='h-9 w-9 inline -mr-1' />
                </button>
                <h1 className='text-3xl font-bold text-center'>Verification</h1>
            </div>
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
                        type='tel'
                        minLength={11}
                        id='phone-number'
                        className='mt-1 block w-full rounded-md shadow-sm px-4 py-2 ring-2 outline-none ring-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className={
                        isButtonDisabled || phoneNumber.toString().length < 11
                            ? "py-2 px-4 bg-gray-300 text-gray-200 rounded w-full mb-4"
                            : "py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 w-full mb-4"
                    }
                    disabled={!phoneNumber || isButtonDisabled}
                >
                    Submit Vote
                </button>
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
