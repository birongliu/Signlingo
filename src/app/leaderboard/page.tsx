"use client";

import Sidebar from "../components/Sidebar"; // Reuse your Sidebar component
import React from "react";

const leaderboardData = [
  { name: "Joe", lessonsCompleted: 1 },
  { name: "Jane", lessonsCompleted: 3 },
  { name: "Bob", lessonsCompleted: 4 },
  { name: "123", lessonsCompleted: 9 },
  { name: "456", lessonsCompleted: 12 },
];

export default function LeaderboardPage() {
  const sortedLeaderboard = leaderboardData.sort(
    (a, b) => b.lessonsCompleted - a.lessonsCompleted,
  );

  const sidebarItems = [
    { href: "/learn", label: "Learn", icon: "🤓" },
    { href: "/quiz", label: "Quiz", icon: "💯" },
    { href: "/progress", label: "Progress", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Leaderboard
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Top Learners
          </h2>
          <div className="flex flex-col gap-3">
            {sortedLeaderboard.map((user, index) => (
              <div
                key={index}
                className="flex justify-between rounded-lg bg-lime-100 p-4 shadow-md hover:bg-lime-200"
              >
                <span className="text-xl font-bold text-gray-800">
                  {index + 1}. {user.name}
                </span>
                <span className="text-xl font-bold text-gray-600">
                  {user.lessonsCompleted} Lessons Completed
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
