import { ArtistsToolsCombiner } from "@/components/artists-tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy - Artists Tools AI Image Generator & Editor",
  description:
    "Artists Tools AI image generation tool for professional artists. Create stunning artwork from text, edit existing images with AI precision, and explore multiple aspect ratios for your creative projects. Powered by Google Gemini 2.5 Flash Image.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ArtistsToolsCombiner />
    </main>
  )
}
