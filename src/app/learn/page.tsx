"use client";

import React, { useEffect, useRef, useState } from "react";
import LessonCard from "../components/LessonCard";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import HandsContainer from "../inference/page";
import type { ConfettiRef } from "@/app/components/ui/confetti";
import Confetti from "@/app/components/ui/confetti";

export default function LearningPage() {
  const [num, setNum] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSign, setCurrentSign] = useState(0);
  const [signed, setSigned] = useState("Nothing");
  const signs = ["/a.jpg", "/b.jpg", "/c.jpg"];

  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    if (signed.predicted_letter == String.fromCharCode(65 + currentSign)) {
      setNum((e) => e + 1);
      setCurrentSign((e) => e + 1);
    } else {
      console.log(signed.predicted_letter);
    }
  }, [signed]);

  const startLesson = () => {
    setModalOpen(true);
    setCurrentSign(0);
  };

  const nextSign = () => {
    // if (currentSign < signs.length - 1) {
    //   setCurrentSign(currentSign + 1);
    // }

    setNum((e) => e + 1);
    if (num % 2 == 0) {
      setTimeout(() => {
        setNum((e) => e + 1);
        setCurrentSign((e) => e + 1);
      }, 8000);
    }
    console.log(num);
  };

  const closeLesson = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar selected="Learn" />

      {/* Main Content */}
      <main className="mt-12 flex flex-1 items-center justify-center bg-white p-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <LessonCard
            unit={"Unit 1"}
            description={"Learn the basics of sign language. I"}
            onStart={startLesson}
            type={"Lesson"}
          />
          <LessonCard
            unit={"Unit 2"}
            description={"Learn the basics of sign language. II"}
            onStart={startLesson}
            type={"Lesson"}
          />
          <LessonCard
            unit={"Unit 3"}
            description={"Learn the basics of sign language. III"}
            onStart={startLesson}
            type={"Lesson"}
          />
        </div>
      </main>
      {num !== 0 && num % 2 == 0 && (
        <Confetti
          ref={confettiRef}
          className="pointer-events-none absolute left-0 top-0 z-10 size-full"
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-3/4 w-3/4 overflow-hidden rounded-lg bg-white p-4 shadow-lg">
            <div className="flex flex-row items-center justify-center gap-12">
              {num % 2 != 0 && (
                <button
                  onClick={() => {
                    setNum((e) => e - 1);
                  }}
                  className="rounded-3xl bg-mask-green px-2 py-1 text-lg"
                >
                  Hint
                </button>
              )}
              <h2 className="mb-2 text-center text-4xl font-bold">
                Sign: {String.fromCharCode(65 + currentSign)}
              </h2>
              {num % 2 != 0 && (
                <button
                  onClick={() => {
                    if (signs.length + 1 + (num % 2) == num) {
                      closeLesson();
                      setNum(0);
                      setCurrentSign(0);
                    }

                    setNum((e) => e + 1);
                    if (currentSign < signs.length - 1) {
                      setCurrentSign(currentSign + 1);
                    }
                  }}
                  className="rounded-3xl bg-mask-green px-2 py-1 text-lg"
                >
                  {signs.length + 1 + (num % 2) == num ? "Finish" : "Skip"}
                </button>
              )}
            </div>
            {num % 2 == 0 || num == 0 ? (
              <>
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
                    onClick={
                      currentSign === signs.length ? closeLesson : nextSign
                    }
                    className={`mr-2 w-full items-center rounded-lg bg-mask-green px-6 py-3 text-lg text-white`}
                    // disabled={currentSign === signs.length - 1}
                  >
                    {currentSign === signs.length ? "Close" : "Next"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative h-full w-full bg-black">
                  <HandsContainer setSigned={setSigned} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
