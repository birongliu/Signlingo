"use client";

import React, { useState } from "react";
import LessonCard from "../components/LessonCard";
import Sidebar from "../components/Sidebar";
import Image from "next/image";

export default function LearningPage() {
  const sidebarItems = [
    { href: "/quiz", label: "Quiz", icon: "💯" },
    { href: "/progress", label: "Progress", icon: "📈" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🎯" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSign, setCurrentSign] = useState(0);

  const signs = ["/a.jpg", "/b.jpg", "/c.jpg"];

  const startLesson = () => {
    setModalOpen(true);
    setCurrentSign(0);
  };

  const nextSign = () => {
    if (currentSign < signs.length - 1) {
      setCurrentSign(currentSign + 1);
    }
  };

  const closeLesson = () => {
    setModalOpen(false);
  };

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
            onStart={startLesson}
          />
          <LessonCard
            unit={"Unit 2"}
            description={"Learn intermediate sign language."}
            onStart={startLesson}
          />
          <LessonCard
            unit={"Unit 3"}
            description={"Learn advanced sign language."}
            onStart={startLesson}
          />
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-10 shadow-lg">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Sign: {String.fromCharCode(65 + currentSign)}
            </h2>
            <div className="mb-6 flex justify-center">
              <Image
                src={signs[currentSign]}
                alt={`Sign language ${String.fromCharCode(65 + currentSign)}`}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={nextSign}
                className={`rounded-lg bg-blue-500 px-6 py-3 text-lg text-white ${
                  currentSign === signs.length - 1 &&
                  "cursor-not-allowed opacity-50"
                }`}
                disabled={currentSign === signs.length - 1}
              >
                Next
              </button>

              {currentSign === signs.length - 1 && (
                <button
                  onClick={closeLesson}
                  className="rounded-lg bg-green-500 px-6 py-3 text-lg text-white"
                >
                  Finish Lesson
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
