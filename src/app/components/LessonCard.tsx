import React from "react";

interface LessonCardProps {
  unit: string;
  description: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ unit, description }) => {
  return (
    <div className="rounded-lg bg-lime-100 p-8 shadow-md transition-all duration-300 hover:scale-105">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">{unit}</h1>
      <p className="mb-6 text-gray-700">{description}</p>
      <button className="rounded-full bg-lime-500 px-6 py-3 text-lg font-bold text-white transition-all duration-300 hover:bg-lime-400">
        Start
      </button>
    </div>
  );
};

export default LessonCard;
