import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const formData = await req.formData();

    const sessionId = formData.get("sessionId") as string;
    const statement = formData.get("statement") as string;
    const field = formData.get("field") as string;
    const country = formData.get("country") as string;
    const worry = formData.get("worry") as string | null;
    const turnaround = formData.get("turnaround") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!sessionId || !statement || !field || !country || !turnaround) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify payment completed
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 403 });
    }

    const customerEmail = session.customer_details?.email ?? "unknown";

    const attachments: { filename: string; content: string }[] = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = await cvFile.arrayBuffer();
      attachments.push({
        filename: cvFile.name,
        content: Buffer.from(buffer).toString("base64"),
      });
    }

    await resend.emails.send({
      from: process.env.AUTH_RESEND_FROM!,
      to: process.env.TO_EMAIL!,
      subject: `PS Edit submission — ${customerEmail}`,
      html: `
        <p><strong>Customer email:</strong> ${customerEmail}</p>
        <p><strong>Stripe session:</strong> ${sessionId}</p>
        <p><strong>Applying for:</strong> ${field} (${country})</p>
        <p><strong>Turnaround:</strong> ${turnaround}</p>
        ${worry ? `<p><strong>Main worry:</strong> ${worry}</p>` : ""}
        <hr />
        <p><strong>Personal Statement:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${statement}</pre>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submit-ps-edit]", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
