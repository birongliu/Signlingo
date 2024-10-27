"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItems from "./Navitems";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-feather-white fixed top-0 z-50 flex h-16 w-full items-center px-4 font-sans text-black">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black transition-all duration-300 hover:scale-110">
          <Link href="/">Signlingo</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden space-x-6 lg:flex">
          <NavItems />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <RxHamburgerMenu className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full space-y-4 bg-feather-green px-4 py-6 shadow-lg lg:hidden">
          <Link
            href="/learn"
            className="block text-lg font-bold text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Learn"
          >
            🤓 Learn
          </Link>
          <Link
            href="/quiz"
            className="block text-lg font-bold text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Quiz"
          >
            💯 Quiz
          </Link>
          <Link
            href="/progress"
            className="block text-lg font-bold text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Progress"
          >
            📈 Progress
          </Link>
          <Link
            href="/leaderboard"
            className="block text-lg font-bold text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Leaderboard"
          >
            🎯 Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
};
