"use client";
import Link from "next/link";
import { signInWithGoogle, signup } from "../../lib/auth-action";
import { FormEvent, useState } from "react";
export default function Signup() {
  const [formData, setFormData] = useState(() => new FormData());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);
  };

  const createFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      prev.set(e.target.name, e.target.value)
      return prev
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lime-300 font-sans">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} id="sign_up">
          <input
            onChange={createFormData}
            type="text"
            name="first-name"
            form="sign_up"
            placeholder="First Name"
            className="mb-4 w-full rounded-full border p-3 text-gray-700 focus:outline-none"
          />
          <input
            type="text"
            onChange={createFormData}
            form="sign_up"
            name="last-name"
            placeholder="Last Name"
            className="mb-4 w-full rounded-full border p-3 text-gray-700 focus:outline-none"
          />
          <input
            type="email"
            onChange={createFormData}
            form="sign_up"
            name="email"
            placeholder="Email"
            className="mb-4 w-full rounded-full border p-3 text-gray-700 focus:outline-none"
          />
          <input
            form="sign_up"
            type="password"
            name="password"
            onChange={createFormData}
            placeholder="Password"
            className="mb-4 w-full rounded-full border p-3 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="mb-4 w-full rounded-full bg-lime-500 p-3 text-lg font-bold text-white transition-all duration-300 hover:bg-lime-400"
          >
            Register
          </button>
          <button
            onClick={async () => await signInWithGoogle()}
            type="button"
            className="w-full rounded-full border border-gray-300 bg-white p-3 text-lg font-bold text-gray-700 transition-all duration-300 hover:bg-gray-100"
          >
            Sign up with Google
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?
            <Link
              href="/login"
              className="font-bold text-lime-600 transition-all duration-300 hover:text-lime-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
