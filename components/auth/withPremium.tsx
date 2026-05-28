import { auth } from "@/auth";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ locale: string; [key: string]: string }> };

export function withPremium<P extends PageProps>(Page: (props: P) => Promise<React.ReactNode>) {
  return async function PremiumPage(props: P) {
    const session = await auth();
    const { locale } = await props.params;

    if (!session?.user?.isPremium && !session?.user?.hasBundle) {
      redirect(`/${locale}/pricing`);
    }

    return Page(props);
  };
}
