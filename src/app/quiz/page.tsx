"use client";

import Sidebar from "../components/Sidebar";
import LessonCard from "../components/LessonCard";

export default function QuizPage() {
  const sidebarItems = [
    { href: "/learn", label: "Learn", icon: "🤓" },
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
            unit={"Quiz 1"}
            description={"Get quizzed on the basics of sign language."}
          />
          <LessonCard
            unit={"Quiz 2"}
            description={"Quiz about intermediate sign language."}
          />
          <LessonCard
            unit={"Quiz 3"}
            description={"Quiz about advanced sign language."}
          />
        </div>
      </main>
    </div>
  );
}
