"use client";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

export const NavBar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center bg-lime-300 px-4 font-sans">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Signlingo</Link>
        </div>

        {/* Navigations */}
        <div className="hidden space-x-6 lg:flex">
          <Link
            href="/login"
            className="text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-lg font-bold text-gray-800 transition-colors duration-300 hover:text-lime-600"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button className="focus:outline-none">
            <RxHamburgerMenu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </nav>
  );
};
