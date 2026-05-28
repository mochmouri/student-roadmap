import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";

const SYSTEM_PROMPT = `You are an experienced careers consultant and graduate recruiter who has reviewed thousands of student CVs. You give honest, specific, constructive feedback. You do not flatter. Structure your response in these sections:

## Overall impression
2-3 sentences, honest assessment.

## What's working
Bullet points, specific observations.

## What needs fixing
Bullet points, specific, with example rewrites where helpful.

## Red flags recruiters will notice
Bullet points of anything that will raise eyebrows or get the CV rejected.

## Formatting and structure issues
Bullet points on layout, length, section order.

## Suggested headline/summary rewrite
Rewrite their opening summary or headline to be stronger.

## Score
X/10 with a one-sentence justification.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isPremium && !session?.user?.hasBundle) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { cv, industry, level } = await req.json() as {
    cv: string;
    industry: string;
    level: string;
  };

  if (!cv?.trim()) {
    return new Response("CV required", { status: 400 });
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

  const prompt = `Please review this CV for a ${level} targeting ${industry} roles:\n\n${cv}`;

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
