"use client";

import { useRouter } from "next/navigation";
import { SelectWithSearch } from "@/components/SelectWithSearch";
import { useEffect, useState } from "react";
import { Candidate } from "@/types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function AddVote() {
    const router = useRouter();

    const [candidates, setCandidates] = useState<Candidate[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api");
            const { data } = await response.json();
            setCandidates(data);
        };

        fetchData();
    }, []);

    const defaultVotes = Array(4).fill(null);

    // State to store the selected votes for each dropdown
    const [votes, setVotes] = useState<(string | null)[]>(defaultVotes);

    // Function to handle changing votes
    const handleChange = (index: number, value: string) => {
        const newVotes = [...votes];
        newVotes[index] = value;
        setVotes(newVotes);
    };

    // Function to check if the form is complete
    const isFormComplete = votes.every((vote) => vote !== null);

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // save the votes to the local storage
        localStorage.setItem("votes", JSON.stringify(votes));

        // go to "/verification" page
        router.push("/verification");
    };

    // populating the votes from local storage on page load.
    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem("votes") || "[]");

        if (!votes.length) {
            return;
        }

        setVotes(votes);
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
                <h1 className='text-3xl font-bold text-center'>Add Vote</h1>
            </div>
            <h2 className='text-lg font-semibold mb-8'>
                Each member gets 4 votes, and you can only vote for a candidate
                once.
            </h2>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col justify-center'
            >
                {votes.map((selectedVote, index) => (
                    <div key={index} className='mb-6'>
                        <SelectWithSearch
                            title={`Vote #${index + 1}`}
                            options={candidates
                                .filter(
                                    (candidate) =>
                                        !votes.includes(candidate._id) ||
                                        candidate._id === selectedVote
                                )
                                .sort((a, b) => b.votes - a.votes)}
                            value={
                                candidates.find(
                                    (candidate) =>
                                        candidate._id === selectedVote
                                ) || null
                            }
                            onChange={(value) => handleChange(index, value._id)}
                        />
                    </div>
                ))}
                <button
                    type='submit'
                    className={`mt-4 px-6 py-2 font-semibold rounded-lg ${
                        isFormComplete
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-400"
                    }`}
                    disabled={!isFormComplete}
                >
                    Submit Votes
                </button>
            </form>
        </div>
    );
}
