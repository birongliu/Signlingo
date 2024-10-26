import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import LoginButton from "./LoginOut";
import { createClient } from "../utils/supabase/server";
import NavItems from "./Navitems";

export const NavBar = async ({ isSigned }: { isSigned: boolean }) => {
  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center bg-lime-300 px-4 font-sans">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">Signlingo</Link>
        </div>

        {/* Navigations */}
        <div className="hidden space-x-6 lg:flex">
          <NavItems />
          <LoginButton />
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
