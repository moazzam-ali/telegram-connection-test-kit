import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Telegram Bot Connection Test",
    description: "Telegram Bot Connection Test kit",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
