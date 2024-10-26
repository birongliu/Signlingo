"use client";

import Link from "next/link";
import { signInWithGoogle } from "../../lib/auth-action";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-lime-300 font-sans">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h2>
        <form>
          <button
            type="button"
            onClick={async () => await signInWithGoogle()}
            className="w-full rounded-full border border-gray-300 bg-white p-3 text-lg font-bold text-gray-700 transition-all duration-300 hover:bg-gray-100"
          >
            Sign in with Google
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-lime-600 transition-all duration-300 hover:text-lime-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
