import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "The Student Roadmap", template: "%s | The Student Roadmap" },
  description: "An honest, practical guide from Grade 9 to university graduation — written by someone who has been through it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang/dir are set in the [locale] layout; this root shell stays neutral
    <html suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
