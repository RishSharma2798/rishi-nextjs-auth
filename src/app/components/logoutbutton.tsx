// LogoutButton.tsx (Client Component)
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
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

  return (
    <button
      className="mt-8 w-full rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
      onClick={logout}
    >
      Logout
    </button>
  );
}
