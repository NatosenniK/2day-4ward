import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { HeaderElement } from "./ui/layout/header";
import { FooterElement } from "./ui/layout/footer";

let title = "2day 4ward - Track today, focus forward";
let description =
  "2Day 4Ward helps you stay mindful of today and focused on tomorrow. Log your daily check-ins, set goals, and reflect on your progress with ease. Build positive habits one step at a time.";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <HeaderElement />

        {children}

        <FooterElement />
      </body>
    </html>
  );
}
