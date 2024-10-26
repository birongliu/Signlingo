"use client";

import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-100 font-thin">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded border p-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-emerald-600 p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-500"
          >
            Login
          </button>
          <button
            type="submit"
            className="mt-2 w-full rounded bg-blue-600 p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500"
          >
            Sign in with Google
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-emerald-600 transition-all duration-300 hover:text-emerald-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
