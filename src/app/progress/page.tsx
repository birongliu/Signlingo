"use client";

import Sidebar from "../components/Sidebar";
import React from "react";

export default function ProgressPage() {
  const completedLessons = [
    { unit: "Unit 1", title: "Basics of Sign Language" },
    { unit: "Unit 2", title: "Intermediate Sign Language" },
    { unit: "Unit 3", title: "Advanced Sign Language" },
  ];

  const completedQuizzes = [
    { quiz: "Quiz 1", description: "Basics of Sign Language Quiz" },
    { quiz: "Quiz 2", description: "Intermediate Sign Language Quiz" },
  ];

  const sidebarItems = [
    { href: "/learn", label: "Learn", icon: "🤓" },
    { href: "/quiz", label: "Quiz", icon: "💯" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🎯" },
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <main className="mt-16 flex-1 p-6">
        {/* Completed Lessons */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Completed Lessons
          </h2>
          <div className="flex flex-col gap-3">
            {completedLessons.map((lesson, index) => (
              <div
                key={index}
                className="rounded-lg bg-lime-100 p-4 shadow-md hover:bg-lime-200"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {lesson.unit}: {lesson.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Quizzes */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Completed Quizzes
          </h2>
          <div className="flex flex-col gap-3">
            {completedQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="rounded-lg bg-blue-100 p-4 shadow-md hover:bg-blue-200"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {quiz.quiz}: {quiz.description}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
