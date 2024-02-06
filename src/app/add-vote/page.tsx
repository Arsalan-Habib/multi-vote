"use client"; // Mark the component for client-side execution in Next.js 13

import { Select } from "@/components/Select";
import { useState } from "react";
import { MOCK_CANDIDATES } from "../page";

export default function AddVote() {
    // State to store the selected votes for each dropdown
    const [votes, setVotes] = useState<(number | null)[]>(Array(4).fill(null));

    // Function to handle changing votes
    const handleChange = (index: number, value: number) => {
        const newVotes = [...votes];
        newVotes[index] = value;
        setVotes(newVotes);
    };

    // Function to check if the form is complete
    const isFormComplete = votes.every((vote) => vote !== null);

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Process form submission here (e.g., send data to backend)
        alert("Votes submitted: " + votes.join(", "));
    };

    return (
        <div className='container mx-auto pt-12 px-3 max-w-sm'>
            <h1 className='text-3xl font-bold mb-12 text-center'>Add Vote</h1>
            <h2 className='text-lg font-semibold mb-8'>
                You get 4 votes, and you can only vote for a candidate once.
            </h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col justify-center'
            >
                {votes.map((selectedVote, index) => (
                    <div key={index} className='mb-6'>
                        <Select
                            label={`Vote #${index + 1}`}
                            options={MOCK_CANDIDATES.filter(
                                (candidate) =>
                                    !votes.includes(candidate.id) ||
                                    candidate.id === selectedVote
                            ).sort((a, b) => b.votes - a.votes)}
                            value={
                                MOCK_CANDIDATES.find(
                                    (candidate) => candidate.id === selectedVote
                                ) || null
                            }
                            onChange={(value) => handleChange(index, value.id)}
                        />
                    </div>
                ))}
                <button
                    type='submit'
                    className={`mt-4 px-6 py-2 font-semibold rounded-lg ${
                        isFormComplete
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-blue-200 text-blue-800"
                    }`}
                    disabled={!isFormComplete}
                >
                    Submit Votes
                </button>
            </form>
        </div>
    );
}
