import "./globals.css";
import { Noto_Sans_Thai } from 'next/font/google'

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CodeLeagues",
  description: "Platform for Thai students to learn code effiently from ground up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={noto_sans_thai.className}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
