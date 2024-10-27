"use client";

import Sidebar from "../components/Sidebar";
import React from "react";

const userData = {
  name: "John Doe",
  lessonsCompleted: 1,
};

const completedLessons = [
  { unit: "Unit 1", title: "Basics of Sign Language" },
  { unit: "Unit 2", title: "Intermediate Sign Language" },
  { unit: "Unit 3", title: "Advanced Sign Language" },
];

const completedQuizzes = [
  { quiz: "Quiz 1", description: "Basics of Sign Language Quiz" },
  { quiz: "Quiz 2", description: "Intermediate Sign Language Quiz" },
];

export default function ProgressPage() {
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
        {/* User Profile */}
        <section className="mb-8">
          <div className="bg-mask-green mx-auto w-full max-w-md rounded-lg p-8 shadow-md">
            <h1 className="mb-4 text-center text-3xl font-bold text-white">
              Hello, {userData.name}
            </h1>
            <div className="text-center">
              <p className="mb-2 text-xl font-semibold text-white">
                Good work! You have completed {userData.lessonsCompleted}{" "}
                lessons or quizzes!
              </p>
            </div>
          </div>
        </section>

        {/* Completed Lessons */}
        <section className="mb-6">
          <h2 className="text-eel mb-4 text-2xl font-semibold">
            Completed Lessons
          </h2>
          <div className="flex flex-col gap-3">
            {completedLessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-mask-green hover:bg-feather-green rounded-lg p-4 shadow-md"
              >
                <h3 className="text-xl font-bold text-white">
                  {lesson.unit}: {lesson.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Quizzes */}
        <section>
          <h2 className="text-eel mb-4 text-2xl font-semibold">
            Completed Quizzes
          </h2>
          <div className="flex flex-col gap-3">
            {completedQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-mask-green hover:bg-feather-green rounded-lg p-4 shadow-md"
              >
                <h3 className="text-xl font-bold text-white">
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
