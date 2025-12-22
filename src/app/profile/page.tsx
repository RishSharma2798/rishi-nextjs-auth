"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { serialize } from "v8";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logout = async () => {
    await axios.get("/api/users/logout");
    toast.success("LoggedOut Successfully");
    router.push("/login");
    try {
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.meesage);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Profile</h1>

        <p className="mb-6 text-sm text-gray-500">
          Welcome to your profile page
        </p>

        <hr className="mb-6" />

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            You are successfully logged in.
          </p>
          <p>
            {data === "" ? (
              "Nothing"
            ) : (
              <Link className="text-blue-600" href={`profile/${data}`}>
                {data}
              </Link>
            )}
          </p>
        </div>
        <button
          onClick={getUserDetails}
          className="w-full mb-6 cursor-pointer rounded-lg bg-blue-500 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-95"
        >
          Click to get the details
        </button>

        <button
          onClick={logout}
          className="w-full cursor-pointer rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
        >
          Logout
        </button>

        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
