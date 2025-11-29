import { WtfCombiner } from "@/components/wtf"
import NavbarFlow, { HoverLink, FeatureItem } from "@/components/ui/navbar-flow"
import { ModeToggle } from "@/components/ui/mode-toggle"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy - WTF AI Image Generator & Editor",
  description:
    "WTF AI image generation tool for wild creations. Create stunning WTF images from text, edit existing images with AI, and explore multiple aspect ratios for your crazy ideas. Powered by Google Gemini 2.5 Flash Image.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavbarFlow
        emblem={<span>TaTTTy</span>}
        links={[
          { text: "Home", url: "/" },
          {
            text: "Artists Tools",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/artists-tools">Main Tool</HoverLink>
                <HoverLink url="/artists-tools/gallery">Gallery</HoverLink>
              </div>
            ),
          },
          {
            text: "Him & Her",
            submenu: (
              <div className="grid grid-cols-1 gap-2 w-48">
                <FeatureItem
                  heading="Couple Generator"
                  url="/him-and-her"
                  info="Create stunning couple images with AI"
                />
                <FeatureItem
                  heading="Gallery"
                  url="/him-and-her/gallery"
                  info="Browse generated couple images"
                />
              </div>
            ),
          },
          { text: "WTF", url: "/wtf" },
        ]}
        extraIcons={[<ModeToggle key="mode-toggle" />]}
      />
      <WtfCombiner />
    </main>
  )
}
