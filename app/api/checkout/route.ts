import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCheckoutUrl } from "@/lib/lemonsqueezy";

export async function POST(req: Request) {
  try {
    const { variantId } = await req.json() as { variantId: string };
    if (!variantId) {
      return NextResponse.json({ error: "variantId required" }, { status: 400 });
    }

    const session = await auth();
    const url = await createCheckoutUrl(variantId, session?.user?.email ?? undefined);
    return NextResponse.json({ checkoutUrl: url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
