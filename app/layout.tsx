import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./provider";
import { ReactLenis } from "@/lib/lenis";
import { Providers } from "./ReduxProvider";

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
  title: "Facesearch AI",
  description: "FaceSearchAI delivers premium facial recognition services within budget constraints, ensuring accessibility for everyone",
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
            <ClerkProvider>
              <Providers>
                <main className="relative">
                  <div
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-5"
                    style={{
                      backgroundImage: "url('/water-bubble.png')",
                    }}
                  />

                  {children}
                </main>
              </Providers>
              <Toaster />
            </ClerkProvider>
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
