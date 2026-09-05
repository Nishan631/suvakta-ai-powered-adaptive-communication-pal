"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    (notify) => {
      window.addEventListener("suvakta-theme-change", notify);
      window.addEventListener("storage", notify);
      return () => {
        window.removeEventListener("suvakta-theme-change", notify);
        window.removeEventListener("storage", notify);
      };
    },
    () => document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    () => "light"
  ) as Theme;

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("suvakta-theme", nextTheme);
    window.dispatchEvent(new Event("suvakta-theme-change"));
  };

  return <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><span>{theme === "light" ? "Dark" : "Light"}</span></button>;
}
