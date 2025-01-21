"use server";

import { redirect } from "next/navigation";
import { createUser, createUserEntry, getUser } from "../db";
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
  let name = formData.get("name") as string;
  let user = await getUser(email);

  if (user) {
    return "User already exists";
  } else {
    await createUser(email, password, name);
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

    if (result?.error) {
      return "Invalid email or password";
    }

    // Manually fetch session to update state
    const session = await auth();

    if (session?.user) {
      redirect("/dashboard"); // Ensure redirection once session updates
    }
  } catch (error) {
    console.log(error);
    return "Invalid email or password";
  }
}

export async function logToday(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    let mood = formData.get("mood") as string;
    let today = formData.get("today") as string;
    let yesterday = formData.get("yesterday") as string;

    const session = await auth();

    if (!session) {
      return;
    }

    const userId = session.user?.id;
    console.log(formData);

    if (!userId) {
      return;
    }

    await createUserEntry(parseInt(userId), mood, today, yesterday);
  } catch (error) {
    console.log(error);
    return "Invalid entry for feelings form";
  }
}
