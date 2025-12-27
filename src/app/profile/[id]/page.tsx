import LogoutButton from "@/app/components/logoutbutton";
import { getUserById } from "@/lib/user";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function ProfilePage({ params }: PageProps) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          User Profile
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Welcome back, {user.username}
        </p>

        <hr className="mb-6" />

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <span className="font-medium">User ID:</span>
            <p className="break-all text-gray-600">{user._id.toString()}</p>
          </div>

          <div>
            <span className="font-medium">Username:</span>
            <p className="text-gray-600">{user.username}</p>
          </div>

          <div>
            <span className="font-medium">Email:</span>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
