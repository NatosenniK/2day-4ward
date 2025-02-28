"use client";

import Link from "next/link";
import { SubmitButton } from "@/app/ui/components/submit-button";
import { useActionState } from "react";
import { registerUser } from "../lib/actions";
import { RegisterForm } from "./register-form";

export default function Login() {
  const [errorMessage, formAction] = useActionState(registerUser, undefined);

  return (
    <div className="flex flex-grow w-full items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16 dark:bg-slate-800">
          <h3 className="text-xl font-semibold dark:text-white">Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Create an account with your email and password
          </p>
        </div>
        <RegisterForm action={formAction}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 dark:text-slate-400">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-semibold text-gray-800 dark:text-slate-400"
            >
              Sign in
            </Link>
            {" instead."}
          </p>
          <div className="text-red-700">{errorMessage}</div>
        </RegisterForm>
      </div>
    </div>
  );
}
