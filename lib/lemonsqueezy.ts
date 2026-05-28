import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

function setup() {
  lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY! });
}

export async function createCheckoutUrl(variantId: string, userEmail?: string): Promise<string> {
  setup();

  const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const { data, error } = await createCheckout(storeId, variantId, {
    checkoutData: {
      email: userEmail,
      custom: { user_email: userEmail ?? "" },
    },
    productOptions: {
      redirectUrl: `${baseUrl}/en/pricing?success=true`,
      receiptButtonText: "Back to site",
      receiptLinkUrl: `${baseUrl}/en/pricing`,
    },
  });

  if (error || !data?.data.attributes.url) {
    throw new Error(error?.message ?? "Failed to create checkout session");
  }

  return data.data.attributes.url;
}
