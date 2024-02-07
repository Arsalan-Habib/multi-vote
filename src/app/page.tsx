"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Candidate } from "../types";

export default function Home() {
    const [candidates, setCandidates] = useState<Candidate[] | []>([]);

    useEffect(() => {
        // Fetch candidates data from the API
        const fetchData = async () => {
            const response = await fetch("/api");
            const data = await response.json();
            setCandidates(data); // Assuming the API returns an array of candidates
        };

        fetchData();
    }, []); // The empty array means this effect runs once on mount

    return (
        <div className='container mx-auto pt-12 px-3 max-w-sm'>
            <h1 className='text-3xl font-bold mb-12 text-center'>
                Top Candidates
            </h1>
            <div className='grid grid-cols-1 gap-4 mb-8'>
                {candidates.slice(0, 4).map((candidate, index) => (
                    <div
                        key={candidate._id}
                        className='p-4 shadow-lg rounded-lg bg-zinc-50 mx-auto min-w-full'
                    >
                        <h2 className='font-bold text-lg'>#{index + 1}</h2>
                        <h2 className='font-bold text-lg'>{candidate.name}</h2>
                        <p>Votes: {candidate.votes}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-between gap-4'>
                <Link
                    href='/add-vote'
                    className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full text-center'
                >
                    Add Vote
                </Link>
                <Link
                    className='px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full text-center'
                    href='/update-vote'
                >
                    Update Vote
                </Link>
            </div>
        </div>
    );
}
