// pages/index.js
import Link from "next/link";

export const MOCK_CANDIDATES = [
    { id: 1, name: "Hafiz Muhammad Mashhood Ahsan", votes: 99 },
    { id: 2, name: "Muhammad Mujtaba Khan Suri", votes: 90 },
    { id: 3, name: "Syed-Shayan-Ur-Rehman", votes: 85 },
    { id: 4, name: "Muhammad Arsal Naeem", votes: 80 },
    { id: 5, name: "muhammad khizar khalil", votes: 70 },
];

export default function Home() {
    return (
        <div className='container mx-auto pt-12 px-3 max-w-sm'>
            <h1 className='text-3xl font-bold mb-12 text-center'>
                Top Candidates
            </h1>
            <div className='grid grid-cols-1 gap-4 mb-8'>
                {MOCK_CANDIDATES.slice(0, 4).map((candidate, index) => (
                    <div
                        key={candidate.id}
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
                    href='/add-vote'
                    className='px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full text-center'
                >
                    Update Vote
                </Link>
            </div>
        </div>
    );
}
