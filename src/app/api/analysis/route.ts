import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const NIM_API_KEY = process.env.NIM_API_KEY;
const NIM_API_URL = process.env.NIM_API_URL;

const client = new OpenAI({
  apiKey: NIM_API_KEY,
  baseURL: NIM_API_URL,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { country, threat, capital, continent } = body;

  const template = `
    Analyze the cybersecurity threat landscape for
    ${country}:
    
    Current Threats:
    ${threat}

    Country Context:
    - Capital: ${capital}
    - Region: ${continent}

    Provide:
    1. Risk assessment summary
    2. Top 3 immediate recommendations
    3. Long-term security strategy
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: template }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta?.content || "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "An unexpected error occurred." });
  }
}
