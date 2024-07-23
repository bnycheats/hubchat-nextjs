"use client";

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth-provider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import "react-day-picker/dist/style.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <Toaster />
            {children}
          </body>
        </html>
      </AuthProvider>
    </QueryClientProvider>
  );
}
