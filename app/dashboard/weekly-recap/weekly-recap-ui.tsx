"use client";
import "./weekly-recap.css";

import { useEffect, useState } from "react";
import { SubmitButton } from "@/app/ui/components/submit-button";
import { logToday } from "@/app/lib/actions";
import { GeminiAPI } from "@/app/lib/api/external/gemini/gemini.api";
import { DailyLogs } from "@/app/types";
import ReactMarkdown from "react-markdown";

interface WeeklyRecaptUIProps {
  weeklyInfo: DailyLogs;
  name: string;
}
export default function WeeklyRecaptUI({
  weeklyInfo,
  name,
}: WeeklyRecaptUIProps) {
  const [weeklyRecap, setWeeklyRecap] = useState<string>("");
  useEffect(() => {
    if (weeklyInfo) {
      GeminiAPI.getWeeklyRecapAnalysis(weeklyInfo).then((res) => {
        setWeeklyRecap(res);
      });
    }
  }, [weeklyInfo]);

  return (
    <>
      {weeklyRecap === "" ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col items-center">
            <h3 className="text-[30px] text-center mb-4">
              Here is your recap, {name}!
            </h3>
            <div className="max-w-2xl weekly-recap">
              <ReactMarkdown>{weeklyRecap}</ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </>
  );
}
