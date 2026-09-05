import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "./components/PageLoader";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Suvakta",
  description: "AI-powered real-time speaking coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try { document.documentElement.dataset.theme = localStorage.getItem('suvakta-theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}" }} />
      </head>
      <body>
        <PageLoader />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
