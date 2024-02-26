"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Candidate } from "../types";
import { ClipLoader } from "react-spinners";
import Leaderboard from "@/components/Leaderboard";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import { votingEndTime } from "@/config";

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [totalVoter, setTotalVoter] = useState(0);
  const [votesCollected, setVotesCollected] = useState(0);
  const { timeFinished, timeLeft } = useCountdownTimer(votingEndTime);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch("/api", {
        cache: "no-store",
      });
      const { data } = await response.json();
      setCandidates(data);

      const responseVotingDetails = await fetch("/api/vote", {
        cache: "no-store",
      });
      const votingDetails = await responseVotingDetails.json();
      setTotalVoter(votingDetails.data.totalVoterCount);
      setVotesCollected(votingDetails.data.totalVotesCollected);

      setLoading(false);
    };

    const _hasVoted = sessionStorage.getItem("hasVoted");
    if (_hasVoted) {
      setHasVoted(true);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto pt-6 px-3 max-w-sm">
      <h1 className="text-3xl font-semibold mb-2 text-center">B17 Fund Voting</h1>
      {!timeFinished && (
        <>
          <div className="flex items-center justify-center gap-2 mb-2 font-medium" style={{ color: "grey" }}>
            <div className="font-medium">Voting Ends in: </div>
            <div className="text-black">
              <span>{timeLeft.days}</span>d
            </div>
            <div className="text-black">
              <span>{timeLeft.hours}</span>h
            </div>
            <div className="text-black">
              <span>{timeLeft.minutes}</span>m
            </div>
            <div className="text-black">
              <span>{timeLeft.seconds}</span>s
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 font-medium" style={{ color: "grey" }}>
            <div className="font-medium">
              Votes Collected:&nbsp;
              <span className="text-black">
                {votesCollected}/{totalVoter}
              </span>
            </div>
          </div>
        </>
      )}
      {loading ? (
        <div className="flex justify-center items-center mb-8" style={{ height: "500px" }}>
          <ClipLoader color="#666666" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <Leaderboard candidates={candidates} highlightCount={4} />
          </div>
          <Link
            href="/add-vote"
            className={
              "px-6 py-2  text-white rounded  transition duration-300 w-full text-center block " +
              (hasVoted ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700")
            }
          >
            {hasVoted ? "Update Vote" : "Add Vote"}
          </Link>
        </>
      )}
    </div>
  );
}
