import { ImageCombiner } from "@/components/image-combiner"
import NavbarFlow from "@/components/ui/navbar-flow"
import HoverLink, { FeatureItem } from "@/components/ui/navbar-flow"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { SearchOverlayContent } from "@/components/search-overlay-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaTTTy",
  description:
    "TaTTTy builds and creates unique tailored tattoo images based on your story, your experiances and journey of your life.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-[100px]">
      <NavbarFlow
        emblem={<span>TaTTTy</span>}
        overlayContent={<SearchOverlayContent />}
        links={[
          { text: "Home", url: "/" },
        ]}
        extraIcons={[<ModeToggle key="mode-toggle" />]}
      />
      <ImageCombiner />
    </main>
  )
}
