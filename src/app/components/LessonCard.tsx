import React, { useState } from "react";

interface LessonCardProps {
  unit: string;
  description: string;
  onStart: () => void; // Pass function to start lesson
}

const LessonCard: React.FC<LessonCardProps> = ({
  unit,
  description,
  onStart,
}) => {
  return (
    <div className="bg-mask-green rounded-lg p-8 shadow-md transition-all duration-300 hover:-translate-y-2">
      <h1 className="mb-4 text-4xl font-bold text-white">{unit}</h1>
      <p className="mb-6 text-lg font-semibold text-white">{description}</p>
      {/* Start the lesson when clicked */}
      <button
        className="rounded-full bg-white px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-105"
        onClick={onStart}
      >
        Start
      </button>
    </div>
  );
};

export default LessonCard;
