import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { META_THEME_COLORS } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoadingProvider } from "@/components/providers/global-loading-provider";
import GlobalLoadingIndicator from "@/components/global-loading-indicator";
import WordSelectListener from "@/components/word-select-listener";

export const metadata: Metadata = {
  title: "Lingzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <GlobalLoadingProvider>
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <SidebarInset>
                  {children}
                  <Toaster />
                  <GlobalLoadingIndicator />
                  <WordSelectListener />
                </SidebarInset>
              </SidebarProvider>
            </GlobalLoadingProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
