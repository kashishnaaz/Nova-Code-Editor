import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], version } = await req.json();

    const model = version || "cohere/north-mini-code:free";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are an expert AI coding assistant. Help with coding, debugging, optimization and software development.",
            },
            ...history,
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("========== OPENROUTER ==========");
    console.log("Status:", response.status);
    console.log(JSON.stringify(data, null, 2));
    console.log("===============================");

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || "OpenRouter Error",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      response: data.choices?.[0]?.message?.content ?? "No response",
      model,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}