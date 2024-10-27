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
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar selected={"Progress"} />

      {/* Main Content */}
      <main className="mt-16 flex-1 p-6">
        {/* User Profile */}
        <section className="mb-8">
          <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-center text-3xl font-bold text-black">
              Hello, {userData.name}
            </h1>
            <div className="text-center">
              <p className="mb-2 text-xl font-semibold text-black">
                Good work! You have completed {userData.lessonsCompleted}{" "}
                {userData.lessonsCompleted === 1 ? "lesson" : "lessons"} or
                quizzes!
              </p>
            </div>
          </div>
        </section>

        {/* Completed Lessons */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold text-black">
            Completed Lessons
          </h2>
          <div className="flex flex-col gap-4">
            {completedLessons.map((lesson, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <h3 className="text-lg font-medium text-black">
                  {lesson.unit}: {lesson.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Quizzes */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-black">
            Completed Quizzes
          </h2>
          <div className="flex flex-col gap-4">
            {completedQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <h3 className="text-lg font-medium text-black">
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
