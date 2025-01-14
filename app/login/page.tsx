import Link from "next/link";
import { Form } from "app/form";
import { signIn } from "app/auth";
import { SubmitButton } from "app/submit-button";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16 dark:bg-slate-800">
          <h3 className="text-xl font-semibold dark:text-white">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Use your email and password to sign in
          </p>
        </div>
        <div className="dark:bg-slate-800">
          <Form
            action={async (formData: FormData) => {
              "use server";
              await signIn("credentials", {
                redirectTo: "/dashboard",
                email: formData.get("email") as string,
                password: formData.get("password") as string,
              });
            }}
          >
            <SubmitButton>Sign in</SubmitButton>
            <p className="text-center text-sm text-gray-600 dark:text-slate-400">
              {"Don't have an account? "}
              <Link
                href="/register"
                className="font-semibold text-gray-800 dark:text-slate-400"
              >
                Sign up
              </Link>
              {" for free."}
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
