"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { usePersistentHistory } from "@/components/image-combiner/hooks/use-persistent-history";
import { ChevronDownIcon } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites"
import { useState } from "react";
import { ImageLightbox } from "./image-lightbox";

export const MyShitPage = () => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxType, setLightboxType] = useState<"generated" | "liked">("generated");
  
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const {
    generations: persistedGenerations,
    deleteGeneration,
    clearHistory,
    isLoading: historyLoading,
    hasMore,
    loadMore,
    isLoadingMore,
  } = usePersistentHistory(showToast)

  // Liked / favorites (persisted)
  const { favorites: likedImages } = useFavorites()

  const openLightbox = (index: number, type: "generated" | "liked") => {
    setCurrentImageIndex(index);
    setLightboxType(type);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Prepare images for lightbox
  const generatedImages = persistedGenerations.map((g) => ({
    url: g.imageUrl || "/placeholder.svg",
    alt: g.prompt || "Generated tattoo",
    title: "Generated Tattoo Design",
    shortDesc: g.prompt || "AI-generated tattoo design",
    longDesc: g.prompt || "This tattoo was generated using AI",
    downloadUrl: g.imageUrl || "/placeholder.svg"
  }));

  const likedImagesData = likedImages.map((img, idx) => ({
    url: img,
    alt: `Liked tattoo ${idx + 1}`,
    title: "Saved Tattoo Design",
    shortDesc: "Liked tattoo design from your collection",
    longDesc: "A tattoo design you saved to your favorites",
    downloadUrl: img
  }));

  const currentLightboxImages = lightboxType === "generated" ? generatedImages : likedImagesData;

  return (
      <div className="space-y-10 pb-12">
        {/* Top row: generated images (4 columns visible) - replaces GenerationHistory header */}
        <section>
          {/* Title removed (UI tweak) - kept space for potential controls */}
          <div className="flex items-center justify-between mb-4" />

          <Carousel
            opts={{ loop: true, align: 'start' }}
            className="relative w-full"
          >
            <CarouselContent className="flex gap-2 items-stretch">
              {persistedGenerations.length === 0 ? (
                // show a single branded placeholder slide when there are no generations
                <CarouselItem className="basis-1/4">
                  <div className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-neutral-900/40 flex items-center justify-center">
                    <img src="/ink fever.svg" alt="Generated images placeholder" className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ) : (
                persistedGenerations.map((g, idx) => (
                  <CarouselItem className="basis-1/4" key={g.id}>
                    <div 
                      className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-neutral-900/40 cursor-pointer hover:border-white/20 transition-colors"
                      onClick={() => openLightbox(idx, "generated")}
                    >
                      <img src={g.imageUrl ?? "/placeholder.svg"} alt={g.prompt ?? "Generated"} className="w-full h-full object-cover" />
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Bottom row: saved/liked images (4 columns visible) */}
        <section>
          {/* Title removed (UI tweak) - kept space for potential controls */}
          <div className="flex items-center justify-between mb-4" />

          <Carousel opts={{ loop: true, align: 'start' }} className="relative w-full">
            <CarouselContent className="flex gap-2 items-stretch">
              {likedImages.length === 0 ? (
                // single branded placeholder slide for saved images when empty
                <CarouselItem className="basis-1/4">
                  <div className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-neutral-900/40 flex items-center justify-center">
                    <img src="/ink fever.svg" alt="Ink Fever placeholder" className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ) : (
                likedImages.map((img: string, idx: number) => (
                  <CarouselItem className="basis-1/4" key={`liked-${idx}`}>
                    <div 
                      className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-neutral-900/40 cursor-pointer hover:border-white/20 transition-colors"
                      onClick={() => openLightbox(idx, "liked")}
                    >
                      <img src={img} alt={`Saved ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </section>
        {/* bottom-right arrow — small fixed decorative control like top arrow */}
        <div className="fixed right-6 bottom-6 z-40">
          <button
            aria-hidden
            className="rounded-full p-2 bg-white/5 border border-white/6 text-white shadow-md hover:bg-white/10 transition-all"
            title="Quick action"
            onClick={() => { /* placeholder action — can be wired up later */ }}
          >
            <ChevronDownIcon className="size-6" />
          </button>
        </div>

        {/* Lightbox for viewing images */}
        {lightboxOpen && currentLightboxImages.length > 0 && (
          <ImageLightbox
            images={currentLightboxImages}
            currentIndex={currentImageIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </div>
  );
};
