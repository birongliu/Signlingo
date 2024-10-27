"use client";

import Sidebar from "../components/Sidebar"; // Reuse your Sidebar component
import React, { useEffect } from "react";
import { getleaderboard, LeaderBoard } from "../lib/leaderboard-action";

const leaderboardData = [
  { name: "Joe", lessonsCompleted: 1 },
  { name: "Jane", lessonsCompleted: 3 },
  { name: "Bob", lessonsCompleted: 4 },
  { name: "123", lessonsCompleted: 9 },
  { name: "456", lessonsCompleted: 12 },
];

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<LeaderBoard[]>([]);

  useEffect(() => {
    getleaderboard().then(setLeaderboard);
  }, []);


  const sidebarItems = [
    { href: "/learn", label: "Learn", icon: "🤓" },
    { href: "/quiz", label: "Quiz", icon: "💯" },
    { href: "/progress", label: "Progress", icon: "📈" },
  ];

  const sortedLeaderboard = leaderboard.sort((a, b) => b.lesson_completed - a.lesson_completed);
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-eel mb-6 text-center text-3xl font-bold">
          Leaderboard
        </h1>

        <section className="mb-8">
          <h2 className="text-eel mb-4 text-2xl font-semibold">Top Learners</h2>
          <div className="flex flex-col gap-3">
            {sortedLeaderboard.map((user, index) => (
              <div
                key={index}
                className="bg-mask-green hover:bg-feather-green flex justify-between rounded-lg p-4 shadow-md"
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
