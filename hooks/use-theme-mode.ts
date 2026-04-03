"use client"

import { useCallback, useEffect, useState } from "react"

export type ThemeValue = "light" | "dark"

const STORAGE_KEY = "theme"

function getPreferredTheme(): ThemeValue {
  if (typeof window === "undefined") return "light"
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === "light" || saved === "dark") return saved
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useThemeMode() {
  const [theme, setThemeState] = useState<ThemeValue>(() => getPreferredTheme())

  useEffect(() => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    root.setAttribute("data-theme", theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (event: MediaQueryListEvent) => {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "light" || saved === "dark") return
      setThemeState(event.matches ? "dark" : "light")
    }
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === "light" || event.newValue === "dark") {
        setThemeState(event.newValue)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const setTheme = useCallback(
    (value: ThemeValue | ((current: ThemeValue) => ThemeValue)) => {
      setThemeState((current) => (typeof value === "function" ? value(current) : value))
    },
    [],
  )

  return { theme, setTheme }
}

