"use client";

import Link from "next/link";
import LessonCard from "../components/LessonCard";

export default function LearningPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-lime-300 p-6">
        <div className="mb-8 text-2xl font-bold text-gray-800">Signlingo</div>
        <nav className="space-y-6">
          <Link
            href="/learn"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            🤓 Learn
          </Link>
          <Link
            href="/quiz"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            💯 Quiz
          </Link>
          <Link
            href="/progress"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            📈 Progress
          </Link>
          <Link
            href="/leaderboard"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            🎯 Leaderboard
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center bg-white p-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <LessonCard
            unit={"Unit 1"}
            description={"Learn the basics of sign language."}
          />
          <LessonCard
            unit={"Unit 2"}
            description={"Learn intermediate sign language."}
          />
          <LessonCard
            unit={"Unit 3"}
            description={"Learn advanced sign language."}
          />
        </div>
      </main>
    </div>
  );
}
