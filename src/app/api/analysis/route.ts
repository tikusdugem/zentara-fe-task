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
      stream: false,
    });

    const content = completion.choices[0]?.message?.content;

    return NextResponse.json({ content });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "An unexpected error occurred." });
  }
}
