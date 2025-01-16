"use server";

import { redirect } from "next/navigation";
import { createUser, getUser } from "../db";
import { auth, signIn } from "../auth";
import { AuthError } from "next-auth";

export async function registerUser(
  prevState: string | undefined,
  formData: FormData
) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(2000);

  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let user = await getUser(email);

  if (user) {
    return "User already exists";
  } else {
    await createUser(email, password);
    redirect("/login");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function loginUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      redirect: false, // Don't auto-redirect
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    console.log("Sign-in result:", result);

    if (result?.error) {
      return "Invalid email or password";
    }

    // Manually fetch session to update state
    const session = await auth();
    console.log("Session after login:", session);

    if (session?.user) {
      redirect("/dashboard"); // Ensure redirection once session updates
    }
  } catch (error) {
    console.log(error);
    return "Invalid email or password";
  }
}
