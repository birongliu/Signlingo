import React from "react";

interface LessonCardProps {
  unit: string;
  description: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ unit, description }) => {
  return (
    <div className="bg-mask-green rounded-lg p-8 shadow-md transition-all duration-300 hover:-translate-y-2">
      <h1 className="mb-4 text-4xl font-bold text-white">{unit}</h1>
      <p className="mb-6 text-lg font-semibold text-white">{description}</p>
      <button className="rounded-full bg-white px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-105">
        Start
      </button>
    </div>
  );
};

export default LessonCard;
