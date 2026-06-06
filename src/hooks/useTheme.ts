"use client";
import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";
export type FontFamily =
  | "playfair"
  | "baskerville"
  | "merriweather"
  | "garamond"
  | "crimson";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [font, setFontState] = useState<FontFamily>("playfair");

  useEffect(() => {
    const saved = localStorage.getItem("gx-theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial: Theme = saved ?? (prefersDark ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.setAttribute("data-them", initial);

    const savedFont =
      (localStorage.getItem("gx-font") as FontFamily) ?? "playfair";
    setFontState(savedFont);
    document.documentElement.setAttribute("data-font", savedFont);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("gx-theme", next);
      return next;
    });
  }, []);

  const setFont = useCallback((f: FontFamily) => {
    setFontState(f);
    document.documentElement.setAttribute("data-font", f);
    localStorage.setItem("gx-font", f);
  }, []);

  return { theme, font, toggleTheme, setFont, isDark: theme === "dark" };
}
