import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICES: Record<string, { amount: number; name: string }> = {
  consultation: { amount: 7500, name: "1:1 Consultation Call (45 min)" },
  "ps-edit": { amount: 14900, name: "Personal Statement Editing" },
};

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { product, sessionType, locale } = await req.json() as {
      product: "consultation" | "ps-edit";
      sessionType?: string;
      locale: string;
    };

    const price = PRICES[product];
    if (!price) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

    let successUrl: string;
    if (product === "consultation") {
      successUrl = `${baseUrl}/${locale}/services/consultation/booked?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      successUrl = `${baseUrl}/${locale}/services/personal-statement/submit?session_id={CHECKOUT_SESSION_ID}`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: sessionType ? `${price.name} — ${sessionType}` : price.name,
            },
            unit_amount: price.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      billing_address_collection: "auto",
      success_url: successUrl,
      cancel_url: `${baseUrl}/${locale}/services/${product === "consultation" ? "consultation" : "personal-statement"}`,
      metadata: { product, sessionType: sessionType ?? "" },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("[stripe-checkout]", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
