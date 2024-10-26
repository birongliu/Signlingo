"use client";

import LessonCard from "../components/LessonCard";
import Sidebar from "../components/Sidebar";

export default function LearningPage() {
  const sidebarItems = [
    { href: "/quiz", label: "Quiz", icon: "💯" },
    { href: "/progress", label: "Progress", icon: "📈" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🎯" },
  ];

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

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
