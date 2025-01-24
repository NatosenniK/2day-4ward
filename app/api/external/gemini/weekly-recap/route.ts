import { NextResponse } from "next/server";

// const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    const weeklyDataString = JSON.stringify(body.weeklyData, null, 2);

    // Build the request body for the external Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text:
                "Analyze the following user journal data and provide insights in a warm, encouraging, and user-friendly way. Mood has three options (happy, meh, sad). The key 'today' is prompted by: What's one goal you want to accomplish today? The key 'yesterday' is prompted by: Did you reach your goal yesterday? Why or why not?\n\n" +
                weeklyDataString +
                ".\n\nWrite this as if you're speaking directly to the user, offering encouragement and motivation. Focus on making them feel good about their progress while also giving gentle guidance if needed.\n\n" +
                "Format the response into four natural, conversational paragraphs: one on mood consistency, one on goal completion, one on behavioral patterns, and a final summary. Avoid sounding analytical or robotic—be supportive, engaging, and friendly. Use positive reinforcement, acknowledge challenges, and encourage continued progress.\n\n" +
                "Example of tone: 'Hey! This week, you really showed up for yourself. Your mood has been steady, which is awesome to see. Even when things got tough, you kept pushing forward. Keep up that momentum!' or 'Not every day has to be a win, and that's totally okay. The fact that you're reflecting on your goals is already a big step forward. Next week is a fresh start, and you've got this!'",
            },
          ],
        },
      ],
    };

    // Call the Gemini API
    const url = `https://api.kinnesotan.com`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    // Parse and return the Gemini API response
    const responseData = await response.json();
    const aiSummary =
      responseData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No content available";

    return NextResponse.json({ success: true, summary: aiSummary });
  } catch (error) {
    console.error("Error in Gemini API POST route:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
