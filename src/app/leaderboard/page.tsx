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
        <h1 className="mb-6 text-center text-3xl font-bold text-eel">
          Leaderboard
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-eel">Top Learners</h2>
          <div className="flex flex-col gap-3">
            {sortedLeaderboard.map((user, index) => (
              <div
                key={index}
                className="flex justify-between rounded-lg bg-feather-green p-4 shadow-md"
              >
                <span className="text-xl font-bold text-white">
                  {index + 1}. {user.username}
                </span>
                <span className="text-xl font-bold text-white">
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
