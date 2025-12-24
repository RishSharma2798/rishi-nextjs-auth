"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const ResetPassword = async () => {
    try {
      setLoading(true);
      const { password } = user;
      const updateObject = {
        password: password,
        token: token,
      };
      const response = await axios.put("api/users/resetpassword", updateObject);
      console.log("Password reset successfull", response.data);
      toast.success("Password reset successful");
      router.push("/profile ");
    } catch (error: any) {
      console.log("password reset  failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.confirmPassword.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword === user.password
    ) {
      setButtonDisabled(false);
      setError("");
    } else {
      setButtonDisabled(true);
      setError("Password and confirm password should match");
    }
  }, [user]);

  useEffect(() => {
    const urlToken = window.location.href.split("=")[1];
    if (urlToken) setToken(urlToken || "");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Reset your password
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          {loading ? "processing" : "enter your new password"}
        </p>

        <hr className="mb-6" />

        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="confirm password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
        <p className="text-red-700 ">{error}</p>
        <button
          onClick={ResetPassword}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Please fill in the details" : "ResetPassword"}
        </button>
      </div>
    </div>
  );
}
