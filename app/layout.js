import "./globals.css";

export const metadata = {
  title: "ITZFIZZ — Scroll hero",
  description: "A scroll-driven hero section built with Next.js, Tailwind and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
