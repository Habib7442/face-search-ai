import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./provider";
import { ReactLenis } from "@/lib/lenis";
import { Providers } from "./ReduxProvider";
import { AutoLogout } from "@/components/AutoLogout";
import { PersistLogin } from "@/components/PersistLogin";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FaceSearch AI | Advanced Facial Recognition & Search Platform",
  description: "Discover our powerful AI-driven facial recognition platform. Search, analyze, and find similar faces across the web with industry-leading accuracy. Enterprise-grade security, real-time results, and comprehensive analysis tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-gradient-to-b from-lightBlue to-white text-gray-800`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            
            <Providers>
            <PersistLogin>
                <main className="relative">
                  {/* <div
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-5"
                    style={{
                      backgroundImage: "url('/water-bubble.png')",
                    }}
                  /> */}
                  <AutoLogout />
                  {children}
                </main>
              </PersistLogin>
            </Providers>
            <Toaster />
          
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
