import { DailyLogs } from "@/app/types";

class GeminiAPIPrototype {
  async getWeeklyRecapAnalysis(weeklyData: DailyLogs): Promise<string> {
    try {
      const response = await fetch("/api/external/gemini/weekly-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weeklyData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error("Failed to fetch weekly recap:", error);
      throw error;
    }
  }
}

export const GeminiAPI = new GeminiAPIPrototype();
