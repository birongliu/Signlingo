"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import LoginButton from "./LoginOut";
import { createClient } from "../utils/supabase/server";
import NavItems from "./Navitems";

export const NavBar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center bg-lime-300 px-4 font-sans">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Signlingo</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden space-x-6 lg:flex">
          <NavItems />
          <LoginButton />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <RxHamburgerMenu className="h-8 w-8 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full space-y-4 bg-lime-300 px-4 py-6 shadow-lg lg:hidden">
          <Link
            href="/learn"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
            onClick={() => setIsMenuOpen(false)}
          >
            🤓 Learn
          </Link>
          <Link
            href="/quiz"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
            onClick={() => setIsMenuOpen(false)}
          >
            💯 Quiz
          </Link>
          <Link
            href="/progress"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
            onClick={() => setIsMenuOpen(false)}
          >
            📈 Progress
          </Link>
          <Link
            href="/leaderboard"
            className="block text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
            onClick={() => setIsMenuOpen(false)}
          >
            🎯 Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
};
