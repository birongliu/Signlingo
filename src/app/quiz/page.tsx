"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import LessonCard from "../components/LessonCard";
import Image from "next/image";

export default function QuizPage() {
  const sidebarItems = [
    { href: "/learn", label: "Learn", icon: "🤓" },
    { href: "/progress", label: "Progress", icon: "📈" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🎯" },
  ];

  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the sign for 'A'?", // question
      options: ["Option 1: A", "Option 2: B"], // options
      answer: 0, // correct option (index)
      image: "/a.jpg", // img used
    },
    {
      question: "What is the sign for 'B'?",
      options: ["Option 1: B", "Option 2: C"],
      answer: 0,
      image: "/b.jpg",
    },
    {
      question: "What is the sign for 'C'?",
      options: ["Option 1: C", "Option 2: A"],
      answer: 0,
      image: "/c.jpg",
    },
  ];

  const startQuiz = () => {
    setQuizModalOpen(true);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback("");
    setCorrectAnswers(0);
    setShowResults(false);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);

    if (index === questions[currentQuestion].answer) {
      setFeedback("Correct!");
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setFeedback("Incorrect.");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setFeedback("");
  };

  const finishQuiz = () => {
    setQuizModalOpen(false);
    setShowResults(true);
  };

  const closeResults = () => {
    setShowResults(false);
  };

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
            onStart={startQuiz}
          />
          <LessonCard
            unit={"Quiz 2"}
            description={"Quiz about intermediate sign language."}
            onStart={startQuiz}
          />
          <LessonCard
            unit={"Quiz 3"}
            description={"Quiz about advanced sign language."}
            onStart={startQuiz}
          />
        </div>
      </main>

      {/* Quiz */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-10 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">
              {questions[currentQuestion].question}
            </h2>
            <div className="mb-4 flex justify-center">
              <Image
                src={questions[currentQuestion].image}
                alt={`Sign for ${String.fromCharCode(65 + currentQuestion)}`}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>

            <div className="mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`hover:bg-mask-green mb-4 cursor-pointer rounded-lg border p-4 text-lg`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </div>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`mb-6 text-center text-lg font-semibold ${
                  feedback === "Correct!" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-10 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">
              Quiz Results
            </h2>
            <p className="mb-6 text-center text-lg">
              You got {correctAnswers} out of {questions.length} correct!
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeResults}
                className="bg-mask-green hover:bg-feather-green rounded-lg px-6 py-3 text-lg text-white transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
