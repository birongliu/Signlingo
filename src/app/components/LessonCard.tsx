import React from "react";

interface LessonCardProps {
  unit: string;
  description: string;
  onStart: () => void; // Pass function to start lesson
  type: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  unit,
  description,
  onStart,
  type,
}) => {
  return (
    <div className="bg-feather-green flex flex-col justify-between rounded-lg p-8 shadow-md transition-all duration-300 hover:-translate-y-2 md:flex-row">
      <div className="mb-6 md:mb-0">
        {" "}
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {unit}
        </h1>
        <p className="mb-6 text-lg font-semibold text-white">{description}</p>
      </div>
      <div className="flex justify-center md:items-end">
        <button
          className="max-h-14 w-full rounded-full border border-gray-400 bg-white px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-105 md:w-auto"
          onClick={onStart}
        >
          Start {type}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
