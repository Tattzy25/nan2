import { ArtistsToolsCombiner } from "@/components/artists-tools"
import NavbarFlow, { HoverLink, FeatureItem } from "@/components/ui/navbar-flow"
import { ModeToggle } from "@/components/ui/mode-toggle"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy - Artists Tools AI Image Generator & Editor",
  description:
    "Artists Tools AI image generation tool for professional artists. Create stunning artwork from text, edit existing images with AI precision, and explore multiple aspect ratios for your creative projects. Powered by Google Gemini 2.5 Flash Image.",
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
      <ArtistsToolsCombiner />
    </main>
  )
}
