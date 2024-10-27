"use client";
import Link from "next/link";
import { signInWithGoogle } from "@/app/lib/auth-action";
export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <div className="bg-mask-green w-full max-w-md rounded-lg p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Create an Account
        </h2>

        <button
          onClick={async () => await signInWithGoogle()}
          type="button"
          className="text-eel w-full rounded-full border border-gray-300 bg-white p-3 text-lg font-bold transition-all duration-300 hover:scale-105"
        >
          Sign up with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-white transition-all duration-300 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
