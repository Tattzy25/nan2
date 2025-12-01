import type React from "react"
export interface GeneratedImage {
  url: string
  prompt: string
  description?: string
  title?: string
  shortDesc?: string
  longDesc?: string
  tags?: string[]
}

export interface Generation {
  id: string
  status: "loading" | "complete" | "error"
  progress: number
  imageUrl: string | null
  prompt: string
  error?: string
  timestamp: number
  abortController?: AbortController
  thumbnailLoaded?: boolean
  title?: string
  shortDesc?: string
  longDesc?: string
  tags?: string[]
}

export type AspectRatioOption = {
  value: string
  label: string
  ratio: number
  icon: React.ReactNode
}
