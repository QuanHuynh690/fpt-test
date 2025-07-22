"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/trpc/react";
export interface FormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function CreateUserForm(createFormProps: FormProps) {
  const { setOpen } = createFormProps;
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isPending, isSuccess, isError, error } =
    api.user.create.useMutation({
      onSuccess: () => {
        void utils.user.getAll.invalidate();
        setName("");
        setEmail("");
        setOpen(false);
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 bg-white p-6"
    >
      <h2 className="text-lg font-semibold">Create New User</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
        <button
          data-autofocus
          type="submit"
          className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex w-full cursor-pointer justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:mr-3 sm:w-auto"
        >
          Cancel
        </button>
      </div>
      {isError && (
        <p className="text-sm text-red-600">Error: {error.message}</p>
      )}
    </form>
  );
}
