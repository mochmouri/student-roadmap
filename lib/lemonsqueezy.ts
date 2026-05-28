import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

function setup() {
  lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY! });
}

export async function createCheckoutUrl(variantId: string, userEmail?: string, redirectTo?: string): Promise<string> {
  setup();

  const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const redirectUrl = redirectTo ? `${baseUrl}${redirectTo}` : `${baseUrl}/en/pricing?success=true`;

  const { data, error } = await createCheckout(storeId, variantId, {
    checkoutData: {
      email: userEmail,
      custom: { user_email: userEmail ?? "" },
    },
    productOptions: {
      redirectUrl,
      receiptButtonText: "Back to site",
      receiptLinkUrl: redirectUrl,
    },
  });

  if (error || !data?.data.attributes.url) {
    throw new Error(error?.message ?? "Failed to create checkout session");
  }

  return data.data.attributes.url;
}
