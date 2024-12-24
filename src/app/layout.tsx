import type { Metadata } from "next";
import "./globals.css";
import UserAvatar from "@/components/user/user-avatar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Lingzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserAvatar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
