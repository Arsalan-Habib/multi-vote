"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { ClipLoader } from "react-spinners";

const OtpVerification = () => {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Get votes from localStorage or redirect to select candidates page.
    const getVotesOrRedirect = (): string[] | null => {
        const votes = JSON.parse(localStorage.getItem("votes") || "[]");
        if (votes.length < 4) {
            toast.error(
                "Please select candidates to vote for first. Redirecting to select candidates page.",
                {
                    autoClose: 3000,
                }
            );
            setTimeout(() => router.push("/add-vote"), 3000);
            return null;
        }
        return votes;
    };

    // util function to reset UI state.
    const resetUIState = (isLoading = false, isButtonDisabled = false) => {
        setIsLoading(isLoading);
        setIsButtonDisabled(isButtonDisabled);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsButtonDisabled(true);
        setIsLoading(true);

        const votes = getVotesOrRedirect();
        if (!votes) return;

        let trimmedPhoneNumber = phoneNumber.replace(/\s/g, "");
        const body = { voter: trimmedPhoneNumber, applicants: votes };

        try {
            const voterVerificationResponse = await fetch(
                `/api/verify-voter/${trimmedPhoneNumber}`
            );
            if (!voterVerificationResponse.ok) {
                const errorMessage =
                    voterVerificationResponse.status === 403 ? (
                        <div>
                            Sorry, You are not allowed to vote.
                            <br />
                            Please use the number you are using in the B17 Fund
                            Initiative Group.
                            <br />
                            If the problem persists, please contact the group
                            admin.
                        </div>
                    ) : (
                        "Error verifying your number. Please try again later."
                    );
                toast.error(errorMessage, {
                    autoClose:
                        voterVerificationResponse.status === 403 ? 15000 : 5000,
                });
                resetUIState();
                return;
            }

            const response = await fetch("/api/vote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Error submitting vote: ${errorData.message}`);
                resetUIState();
                return;
            }

            toast.success(
                <div>
                    Vote cast successfully!
                    <br />
                    Thank You for being part of this initiative!
                    <br />
                    Redirecting to Home page.
                </div>
            );
            setIsLoading(false);
            setTimeout(() => {
                setPhoneNumber("");
                sessionStorage.setItem("hasVoted", "true");
                localStorage.removeItem("votes");
                resetUIState();
                router.push("/");
            }, 6000);
        } catch (error) {
            console.error("Failed to submit vote:", error);
            toast.error("Network error, please try again.");
            resetUIState();
        }
    };

    useEffect(() => {
        getVotesOrRedirect();
    }, []);

    return (
        <div className='container mx-auto pt-8 px-3 max-w-sm relative'>
            <div className='mb-8'>
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className='absolute top-8 left-2 text-gray-500 border-gray-500 border-2 rounded-lg px-1 py-0 hover:bg-gray-100'
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
                        "w-full mb-4 py-2 px-4 rounded flex justify-center " +
                        (isButtonDisabled || phoneNumber.toString().length < 11
                            ? "bg-gray-300 text-gray-50"
                            : "bg-blue-500 text-white hover:bg-blue-700")
                    }
                    disabled={!phoneNumber || isButtonDisabled || isLoading}
                >
                    {
                        // Show loading spinner if the form is being submitted
                        isLoading ? (
                            <ClipLoader
                                color='#FFFFFF'
                                loading={isLoading}
                                size={24}
                            />
                        ) : (
                            "Submit Vote"
                        )
                    }
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
