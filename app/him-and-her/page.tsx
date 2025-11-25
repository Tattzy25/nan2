import { HimAndHerCombiner } from "@/components/him-and-her"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy - Him & Her AI Image Generator & Editor",
  description:
    "Him & Her AI image generation tool for couples. Create stunning images from text, edit existing images with AI, and explore multiple aspect ratios for your tattoos and couple photos. Powered by Google Gemini 2.5 Flash Image.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HimAndHerCombiner />
    </main>
  )
}
