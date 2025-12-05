"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavorites(JSON.parse(raw))
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
      // Broadcast a custom event so other hook instances in the same window update
      try {
        window.dispatchEvent(new CustomEvent("favorites-updated", { detail: favorites }))
      } catch (e) {
        // ignore if window not available
      }
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e)
    }
  }, [favorites])

  // Listen for updates broadcast by other instances (same-window) or other tabs (storage event)
  useEffect(() => {
    const onUpdated = (ev: Event) => {
      try {
        // If this is a CustomEvent with detail provided
        // @ts-ignore - runtime check
        const detail = ev?.detail
        if (detail && Array.isArray(detail)) {
          setFavorites(detail)
          return
        }
      } catch (e) {
        // ignore
      }

      // fallback: read from localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        setFavorites(raw ? JSON.parse(raw) : [])
      } catch (e) {
        console.error("Failed to sync favorites from storage", e)
      }
    }

    window.addEventListener("favorites-updated", onUpdated as EventListener)
    window.addEventListener("storage", onUpdated as EventListener)

    return () => {
      window.removeEventListener("favorites-updated", onUpdated as EventListener)
      window.removeEventListener("storage", onUpdated as EventListener)
    }
  }, [])

  const add = (url: string) => {
    if (!url) return
    setFavorites((prev) => (prev.includes(url) ? prev : [url, ...prev]))
  }

  const remove = (url: string) => {
    setFavorites((prev) => prev.filter((u) => u !== url))
  }

  const toggle = (url: string) => {
    if (!url) return
    setFavorites((prev) => (prev.includes(url) ? prev.filter((u) => u !== url) : [url, ...prev]))
  }

  const isFavorite = (url: string | undefined | null) => !!url && favorites.includes(url)

  return { favorites, add, remove, toggle, isFavorite }
}
