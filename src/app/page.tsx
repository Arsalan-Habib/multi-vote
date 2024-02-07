"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Candidate } from "../types";
import { ClipLoader } from "react-spinners";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
    const [candidates, setCandidates] = useState<Candidate[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch("/api");
            const data = await response.json();
            setCandidates(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className='container mx-auto pt-6 px-3 max-w-sm'>
            <h1 className='text-3xl font-bold mb-4 text-center'>
                B17 Fund Voting
            </h1>
            {loading ? (
                <div
                    className='flex justify-center items-center mb-8'
                    style={{ height: "500px" }}
                >
                    <ClipLoader color='#666666' loading={loading} size={50} />{" "}
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 gap-4 mb-8'>
                        <Leaderboard
                            candidates={candidates}
                            highlightCount={4}
                        />
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
                            href='/add-vote'
                        >
                            Update Vote
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
