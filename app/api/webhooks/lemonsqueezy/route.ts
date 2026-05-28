import crypto from "crypto";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
  const digest = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(payload) as {
    meta?: { event_name?: string };
    data?: { attributes?: { user_email?: string; customer_id?: number; status?: string } };
  };

  const eventName = event.meta?.event_name ?? "";
  const attrs = event.data?.attributes ?? {};
  const userEmail = attrs.user_email;
  const lsCustomerId = String(attrs.customer_id ?? "");

  if (!userEmail) return NextResponse.json({ ok: true });

  if (["subscription_created", "subscription_updated", "subscription_resumed"].includes(eventName)) {
    const isPremium = attrs.status === "active" || attrs.status === "trialing";
    await pool.query(
      `INSERT INTO users (email, "isPremium", "lsCustomerId")
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET "isPremium" = $2, "lsCustomerId" = $3`,
      [userEmail, isPremium, lsCustomerId]
    );
  }

  if (["subscription_cancelled", "subscription_expired"].includes(eventName)) {
    await pool.query(`UPDATE users SET "isPremium" = false WHERE email = $1`, [userEmail]);
  }

  if (eventName === "order_created") {
    await pool.query(
      `INSERT INTO users (email, "hasBundle", "lsCustomerId")
       VALUES ($1, true, $2)
       ON CONFLICT (email) DO UPDATE SET "hasBundle" = true, "lsCustomerId" = $2`,
      [userEmail, lsCustomerId]
    );
  }

  return NextResponse.json({ ok: true });
}
