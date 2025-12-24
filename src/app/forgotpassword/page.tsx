"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const sendLink = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        email,
      });
      console.log("Password reset link sent", response.data);
      toast.success("Password reset link sent successfully");
      setEmail("");
    } catch (error: any) {
      console.log("failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Forgot your password?
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          {loading ? "processing" : "enter your email for reset password link"}
        </p>

        <hr className="mb-6" />

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <button
          onClick={sendLink}
          className="mt-6 cursor-pointer w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          {buttonDisabled ? "Please enter you email" : "click to send the link"}
        </button>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <Link href="/login" className="hover:text-indigo-600 hover:underline">
            Login
          </Link>

          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
