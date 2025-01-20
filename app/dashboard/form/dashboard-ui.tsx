"use client";

import { useActionState } from "react";
import { FeelingForm } from "./feeling-form";
import { SubmitButton } from "@/app/ui/components/submit-button";
import { logToday } from "@/app/lib/actions";

export default function DashboardUI() {
  const [errorMessage, formAction] = useActionState(logToday, undefined);

  return (
    <>
      <FeelingForm action={formAction}>
        <SubmitButton>Submit</SubmitButton>
        <div className="text-red-800">{errorMessage}</div>
      </FeelingForm>
    </>
  );
}
