"use client";

import { useActionState } from "react";
import { FeelingForm } from "./feeling-form";
import { SubmitButton } from "@/app/ui/components/submit-button";
import { logToday } from "@/app/lib/actions";

interface DashboardUIProps {
  hasUserLoggedToday: boolean;
}
export default function DashboardUI({ hasUserLoggedToday }: DashboardUIProps) {
  const [errorMessage, formAction] = useActionState(logToday, undefined);

  return (
    <>
      {!hasUserLoggedToday ? (
        <FeelingForm action={formAction}>
          <SubmitButton>Submit</SubmitButton>
          <div className="text-red-800">{errorMessage}</div>
        </FeelingForm>
      ) : (
        <div>Come back tomorrow!</div>
      )}
    </>
  );
}
