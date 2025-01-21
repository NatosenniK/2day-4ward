"use client";

import { useActionState } from "react";
import { FeelingForm } from "./feeling-form";
import { SubmitButton } from "@/app/ui/components/submit-button";
import { logToday } from "@/app/lib/actions";

interface DashboardUIProps {
  hasUserLoggedToday: boolean;
  name: string;
}
export default function DashboardUI({
  hasUserLoggedToday,
  name,
}: DashboardUIProps) {
  const [formState, formAction] = useActionState(logToday, { success: false });

  return (
    <>
      {hasUserLoggedToday || (formState && formState.success === true) ? (
        <>
          <h3 className="text-[30px] text-center">
            Thanks for checking in, {name}!
          </h3>
          <div>Come back tomorrow!</div>
        </>
      ) : (
        <>
          <h3 className="text-[30px] text-center">
            How are you feeling today, {name}?
          </h3>
          <FeelingForm action={formAction}>
            <SubmitButton>Submit</SubmitButton>
            {formState?.success === false && (
              <div className="text-red-800">{formState.message}</div>
            )}
          </FeelingForm>
        </>
      )}
    </>
  );
}
