"use client";
import Link from "next/link";
import { signInWithGoogle, signup } from "../../lib/auth-action";
import { FormEvent, useState } from "react";
import bcrypt from "bcryptjs";
export default function Signup() {
  const [formData, setFormData] = useState(() => new FormData());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);
  };

  const createFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      if(e.target.name === 'password') {
        prev.set(e.target.name, bcrypt.hashSync(e.target.value, 10))
        return prev
      }
      prev.set(e.target.name, e.target.value)
      return prev
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lime-300 font-sans">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create an Account
        </h2>

        <button
          onClick={async () => await signInWithGoogle()}
          type="button"
          className="w-full rounded-full border border-gray-300 bg-white p-3 text-lg font-bold text-gray-700 transition-all duration-300 hover:bg-gray-100"
        >
          Sign up with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
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
