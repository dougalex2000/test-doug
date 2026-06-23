import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inter } from "next/font/google";
import "./globals.css";
import { AccessibilityToolbar } from "./components/AccessibilityToolbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DAVI — Desenvolvimento Assistivo para Vida Independente",
  description:
    "Plataforma inteligente de tecnologia assistiva para avaliação, aprendizagem, comunicação, rastreamento visual e criação de soluções personalizadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${atkinson.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        {/* Aplica as preferências de acessibilidade antes do paint (sem flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('davi-a11y-scale');if(s){document.documentElement.style.setProperty('--font-scale',s);}if(localStorage.getItem('davi-a11y-contrast')==='1'){document.documentElement.classList.add('high-contrast');}if(localStorage.getItem('davi-a11y-motion')==='1'){document.documentElement.classList.add('davi-reduce-motion');}}catch(e){}})();",
          }}
        />
        <AccessibilityToolbar />
        {children}
      </body>
    </html>
  );
}
