"use client";

import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-green-500 px-4">
      <div className="lg:hidden">
        {" "}
        {/* Mobile View */}
        <div className="text-white">Menu</div>
      </div>
      <div className="hidden lg:flex w-full justify-between items-center">
        {/* Desktop View */}
        <div className="text-white">Signlingo</div>
        <div className="flex space-x-4">
          <Link href="/login" className="text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
