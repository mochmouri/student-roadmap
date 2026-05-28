import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";

const SYSTEM_PROMPT = `You are an experienced university admissions consultant who has read thousands of personal statements. You give honest, specific, constructive feedback. You do not flatter. You point out what works, what doesn't, and exactly how to fix it. Structure your response in these sections:

## Overall impression
2-3 sentences, honest assessment.

## What's working
Bullet points, specific observations.

## What needs fixing
Bullet points, specific, with example rewrites where helpful.

## Red flags admissions officers will notice
Bullet points of anything that will raise eyebrows.

## Suggested opening line rewrite
Rewrite their opening line to be stronger.

## Score
X/10 with a one-sentence justification.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isPremium && !session?.user?.hasBundle) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { statement, field, targetSystem } = await req.json() as {
    statement: string;
    field: string;
    targetSystem: string;
  };

  if (!statement?.trim()) {
    return new Response("Statement required", { status: 400 });
  }

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const prompt = `Please review this personal statement for ${field} applications via ${targetSystem}:\n\n${statement}`;

  const result = await model.generateContentStream(prompt);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
