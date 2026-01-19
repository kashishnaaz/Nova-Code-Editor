import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], version } = body;

    const systemPrompt = "You are a helpful AI assistant.";

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message },
    ];

    const model = version || "mistralai/devstral-2512:free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages
      })
    });

    const data = await response.json();

    console.log("🔍 Executed Model:", data.model);

    return NextResponse.json({
      response: data.choices?.[0]?.message?.content || "No response",
      executedModel: data.model,
      requestedModel: model
    });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
