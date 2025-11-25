import { WtfCombiner } from "@/components/wtf"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy - WTF AI Image Generator & Editor",
  description:
    "WTF AI image generation tool for wild creations. Create stunning WTF images from text, edit existing images with AI, and explore multiple aspect ratios for your crazy ideas. Powered by Google Gemini 2.5 Flash Image.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <WtfCombiner />
    </main>
  )
}
