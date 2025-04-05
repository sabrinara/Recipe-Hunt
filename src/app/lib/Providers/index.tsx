"use client";
import * as React from "react";


import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from 'sonner';
function Providers({ children }: { children: React.ReactNode }) {

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
