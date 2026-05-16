import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Pirata_One } from "next/font/google";
import Script from "next/script";
import { THEME_COLOR_OPTIONS } from "@/helpers/theme-options";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export const metadata: Metadata = {
  title: "Chord",
  description: "Chord - A component library by dqnamo",
};

const themeColorInitScript = `
(() => {
  const axes = ${JSON.stringify(THEME_COLOR_OPTIONS)};

  for (const [axis, config] of Object.entries(axes)) {
    try {
      const stored = window.localStorage.getItem(config.storageKey);
      const allowed = new Set(config.values.map((option) => option.id));
      document.documentElement.dataset[axis] = allowed.has(stored)
        ? stored
        : config.defaultValue;
    } catch {
      document.documentElement.dataset[axis] = config.defaultValue;
    }
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-accent="blue"
      data-grayscale="gray"
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${pirataOne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-grayscale-1">
        <ThemeProvider>
          <Sidebar />
          <div className="root flex min-h-full flex-col">{children}</div>
        </ThemeProvider>
        <Script id="theme-colors-init" strategy="beforeInteractive">
          {themeColorInitScript}
        </Script>
      </body>
    </html>
  );
}
