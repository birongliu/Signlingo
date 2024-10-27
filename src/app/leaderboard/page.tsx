"use client";

import Sidebar from "../components/Sidebar";
import React, { useEffect } from "react";
import { getleaderboard, LeaderBoard } from "../lib/leaderboard-action";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<LeaderBoard[]>([]);

  useEffect(() => {
    getleaderboard().then(setLeaderboard);
  }, []);

  const sortedLeaderboard = leaderboard.sort(
    (a, b) => b.lesson_completed - a.lesson_completed,
  );

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <Sidebar selected={"Leaderboard"} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-black">
          Leaderboard
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-black">
            Top Learners
          </h2>
          <div className="flex flex-col gap-4">
            {sortedLeaderboard.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-feather-green text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-lg font-medium text-black">
                    {user.username}
                  </span>
                </div>
                <span className="text-lg font-semibold text-black">
                  {user.lesson_completed} Lessons Completed
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
