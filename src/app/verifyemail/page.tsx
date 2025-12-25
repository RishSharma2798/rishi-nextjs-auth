"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data.status === 200) {
        setVerified(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    if (urlToken) setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Verify Your Email
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          {loading
            ? "Verifying your email..."
            : "Please wait while we verify your email"}
        </p>

        <hr className="mb-6" />

        {/* Loading */}
        {loading && (
          <p className="text-indigo-600 font-medium animate-pulse">
            Processing...
          </p>
        )}

        {/* Success */}
        {verified && (
          <div className="space-y-4">
            <p className="text-green-600 font-semibold">
              ✅ Email verified successfully!
            </p>
            <Link
              href="/login"
              className="inline-block w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="space-y-4">
            <p className="text-red-600 font-semibold">
              ❌ Invalid or expired verification link
            </p>
            <Link
              href="/signup"
              className="inline-block w-full rounded-lg border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Create Account Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
