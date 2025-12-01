"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { Generation } from "../types"

const STORAGE_KEY = "nb2_generations"
const MAX_STORED = 12
const MAX_BYTES = 4_000_000

function getLocalGenerations(): Generation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed: Generation[] = JSON.parse(stored)
    const sanitized = parsed.map((g) =>
      g.imageUrl && g.imageUrl.startsWith("data:") ? { ...g, imageUrl: null } : g,
    )
    return sanitized
  } catch (error) {
    console.error("Error loading generations from localStorage:", error)
    return []
  }
}

function saveLocalGeneration(generation: Generation) {
  try {
    const current = getLocalGenerations()
    let updated = [generation, ...current].slice(0, MAX_STORED)
    updated = updated.map((g) =>
      g.imageUrl && g.imageUrl.startsWith("data:") ? { ...g, imageUrl: null } : g,
    )
    let json = JSON.stringify(updated)
    while (json.length > MAX_BYTES && updated.length > 1) {
      updated = updated.slice(0, Math.max(1, Math.floor(updated.length * 0.8)))
      json = JSON.stringify(updated)
    }
    localStorage.setItem(STORAGE_KEY, json)
  } catch (error) {
    try {
      const minimal = [{ ...generation, imageUrl: null }]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal))
    } catch (e) {
      console.error("Error saving generation to localStorage:", e)
    }
  }
}

function deleteLocalGeneration(id: string) {
  try {
    const current = getLocalGenerations()
    const updated = current.filter((g) => g.id !== id)
    const sanitized = updated.map((g) =>
      g.imageUrl && g.imageUrl.startsWith("data:") ? { ...g, imageUrl: null } : g,
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized))
  } catch (error) {
    console.error("Error deleting generation from localStorage:", error)
  }
}

function clearLocalGenerations() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}
// </CHANGE>

export function usePersistentHistory(onToast?: (message: string, type: "success" | "error") => void) {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const loadGenerations = async () => {
      setIsLoading(true)

      const localGens = getLocalGenerations()
      if (isMountedRef.current) {
        setGenerations(localGens)
      }

      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }

    loadGenerations()
  }, [])

  const addGeneration = useCallback(
    async (generation: Generation) => {
      saveLocalGeneration(generation)

      setGenerations((prev) => {
        const updated = [generation, ...prev]
        return updated
      })
    },
    [onToast],
  )

  const updateGeneration = useCallback((id: string, updates: Partial<Generation>) => {
    setGenerations((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      return updated
    })
  }, [])

  const clearHistory = async () => {
    clearLocalGenerations()
    setGenerations([])
  }

  const deleteGeneration = async (id: string) => {
    setGenerations((prev) => prev.filter((g) => g.id !== id))
    deleteLocalGeneration(id)
  }

  return {
    generations,
    setGenerations,
    addGeneration,
    clearHistory,
    deleteGeneration,
    isLoading,
    hasMore: false,
    loadMore: () => {},
    isLoadingMore: false,
    updateGeneration,
  }
}
