"use client";
import * as React from "react";

// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from 'sonner';
function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <Toaster />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
export default Providers;
