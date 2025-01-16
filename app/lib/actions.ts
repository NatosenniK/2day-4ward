"use server";

import { redirect } from "next/navigation";
import { createUser, getUser } from "../db";
import { signIn } from "../auth";

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

  if (user.length > 0) {
    return "User already exists";
  } else {
    await createUser(email, password);
    redirect("/login");
  }
}

export async function loginUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      redirectTo: "/dashboard",
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  } catch (error) {
    console.log(error);
    return "Invalid email or password";
  }
}
