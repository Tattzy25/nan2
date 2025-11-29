"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { Generation } from "../types"

const STORAGE_KEY = "pix2pix-generations"
const MAX_STORED = 50

function getLocalGenerations(): Generation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error loading generations from localStorage:", error)
    return []
  }
}

function saveLocalGeneration(generation: Generation) {
  try {
    const current = getLocalGenerations()
    
    // Create a storage-safe version without the large image data
    const storageGeneration = {
      ...generation,
      // Store only a reference to the image, not the full base64 data
      imageUrl: generation.imageUrl ? "stored-in-memory" : null
    }
    
    const updated = [storageGeneration, ...current].slice(0, MAX_STORED)
    
    // Check if we're approaching quota limits
    const testData = JSON.stringify(updated)
    if (testData.length > 2 * 1024 * 1024) { // 2MB warning threshold
      console.warn("LocalStorage data approaching quota limits, trimming further")
      // Trim to 25 items if we're getting too large
      const trimmed = updated.slice(0, 25)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  } catch (error) {
    console.error("Error saving generation to localStorage:", error)
    
    // If we hit quota error, try to clear some space
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      try {
        const current = getLocalGenerations()
        // Keep only the most recent 10 items
        const emergencyTrim = current.slice(0, 10)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(emergencyTrim))
        console.warn("LocalStorage quota exceeded, trimmed to 10 most recent items")
      } catch (fallbackError) {
        console.error("Emergency trim also failed:", fallbackError)
        // Last resort: clear everything
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }
}

function deleteLocalGeneration(id: string) {
  try {
    const current = getLocalGenerations()
    const updated = current.filter((g) => g.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
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
