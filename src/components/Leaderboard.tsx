import { Candidate } from "@/types";
import React from "react";

const Leaderboard = ({
    candidates,
    limit,
    highlightCount,
}: {
    candidates: Candidate[];
    limit?: number;
    highlightCount: number;
}) => {
    return (
        <div className='bg-white shadow-md min-w-full'>
            <div className='bg-gray-300 py-2 px-4 z-10'>
                <h2 className='text-xl font-semibold text-gray-800 text-center'>
                    Candidate Leaderboard
                </h2>
            </div>
            <ul
                className='divide-y divide-gray-200 overflow-y-scroll'
                style={{ maxHeight: "480px" }}
            >
                {" "}
                {candidates.slice(0, limit).map((candidate, index) => (
                    <li
                        key={candidate._id}
                        className={
                            "flex items-start py-2 pl-5 " +
                            (index < highlightCount ? "bg-gray-50" : "")
                        }
                    >
                        <span
                            className={
                                "text-gray-700 text-lg " +
                                (index < highlightCount
                                    ? "font-bold"
                                    : "font-medium")
                            }
                        >
                            #{index + 1} &nbsp;
                        </span>
                        <div className='flex-1'>
                            <h3
                                className={
                                    "text-gray-800 text-lg " +
                                    (index < highlightCount
                                        ? "font-bold"
                                        : "font-medium")
                                }
                            >
                                {candidate.name}
                            </h3>
                            <p
                                className={
                                    "text-base" +
                                    (index < highlightCount
                                        ? "font-medium text-gray-900 "
                                        : "font-light text-gray-600")
                                }
                            >
                                {candidate.votes} votes
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
