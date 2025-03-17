"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";


export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until the component is mounted
  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={(e) => setTheme(e ? "light" : "dark")}
      color="danger"
      size="sm"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <FaSun className={className} /> : <FaMoon className={className} />
      }
    />
  );
}
