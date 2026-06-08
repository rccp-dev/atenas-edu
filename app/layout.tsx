import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-primary",
});

export const metadata: Metadata = {
    title: "Atenas Edu",
    description: "Plataforma acadêmica",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-screen bg-background text-foreground">
                {children}
            </body>
        </html>
    );
}