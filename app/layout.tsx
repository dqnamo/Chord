import type { Metadata } from "next";
import { Arvo, Inter, JetBrains_Mono, Pirata_One } from "next/font/google";
import MobileHeader from "@/components/MobileHeader";
import { ScrollArea } from "@/components/public/ScrollArea";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const pirataOne = Pirata_One({
  variable: "--font-pirata-one",
  subsets: ["latin"],
  weight: ["400"],
});

const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chord",
  description: "Chord - A component library by dqnamo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${pirataOne.variable} ${arvo.variable} h-dvh w-full overflow-hidden bg-grayscale-1 antialiased`}
      >
        <ThemeProvider>
          <MobileHeader />
          <div className="flex h-dvh w-full pt-14 md:pt-0">
            <Sidebar />
            <main className="min-w-0 flex-1">
              <ScrollArea.Root className="group/main-scroll h-full min-h-0 w-full">
                <ScrollArea.Viewport className="h-full w-full">
                  <ScrollArea.Content>{children}</ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="z-20 flex w-2 justify-center bg-transparent px-0.5 py-1 opacity-0 transition-opacity duration-150 group-hover/main-scroll:opacity-100 data-[hovering]:opacity-100 data-[scrolling]:opacity-100">
                  <ScrollArea.Thumb className="w-1 rounded-full bg-grayscale-5 transition-colors hover:bg-grayscale-7 dark:bg-grayscale-6 dark:hover:bg-grayscale-8" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
