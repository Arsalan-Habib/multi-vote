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
            <div className='py-2 px-4 z-10 bg-gray-200'>
                <h2 className='text-xl font-medium text-gray-800 text-center'>
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
                                "text-lg " +
                                (index < highlightCount
                                    ? "font-semibold text-gray-900"
                                    : "font-medium text-gray-800")
                            }
                        >
                            {index + 1}. &nbsp;
                        </span>
                        <div className='flex-1'>
                            <h3
                                className={
                                    "text-lg capitalize " +
                                    (index < highlightCount
                                        ? "font-semibold text-gray-900"
                                        : "font-normal text-gray-800")
                                }
                            >
                                {candidate.name}
                            </h3>
                            <p
                                className={
                                    "text-lg " +
                                    (index < highlightCount
                                        ? "font-semibold text-gray-900 "
                                        : "font-normal text-gray-800")
                                }
                            >
                                {candidate.votes}{" "}
                                <span
                                    className={
                                        "text-base " +
                                        (index < highlightCount
                                            ? "font-medium text-gray-900 "
                                            : "font-light text-gray-800")
                                    }
                                >
                                    votes
                                </span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
