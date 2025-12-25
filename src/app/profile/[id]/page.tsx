/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>user profile page </h1>
      <h1 className="bold text-4xl"> this is dynamic route id {params.id}</h1>
    </div>
  );
}
