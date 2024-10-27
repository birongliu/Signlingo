"use client";

import Link from "next/link";
import { signInWithGoogle } from "../../lib/auth-action";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <div className="bg-mask-green w-full max-w-md rounded-lg p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Login
        </h2>
        <form>
          <button
            type="button"
            onClick={async () => await signInWithGoogle()}
            className="text-eel w-full rounded-full border border-gray-300 bg-white p-3 text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            Sign in with Google
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-white transition-all duration-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
