'use client';

import { useState } from "react";
import { api } from "~/trpc/react";

export default function HomePage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const utils = api.useUtils();
  const createUser = api.user.create.useMutation({
    onSuccess: async () => {
      await utils.user.getAll.invalidate();
      setName("");
      setEmail("");
    }
  });

  const { data: users = [], isLoading } = api.user.getAll.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    createUser.mutate({ name, email });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Creating..." : "Create User"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">User List</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="border p-3 rounded bg-gray-50">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400">
                Created at: {new Date(user.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
