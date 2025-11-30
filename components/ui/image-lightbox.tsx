"use client";

import * as React from "react";
import Image from "next/image";
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  images: Array<{ url: string; alt?: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
            setIsFlipped(false);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
            setIsFlipped(false);
          }
          break;
        case " ":
          event.preventDefault();
          setIsFlipped(!isFlipped);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate, isFlipped]);

  // Handle image navigation
  const goToPrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  // Handle card flip
  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <XIcon className="h-6 w-6" />
      </Button>

      {/* Navigation buttons */}
      {hasPrevious && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
      )}

      {hasNext && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      )}

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Flip card container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div
          ref={cardRef}
          className={cn(
            "relative w-full max-w-5xl h-full max-h-[90vh] transition-transform duration-700 preserve-3d cursor-pointer",
            isFlipped && "rotate-y-180"
          )}
          onClick={handleCardClick}
          style={{ perspective: "1000px" }}
        >
          {/* Front side - Image */}
          <div
            className={cn(
              "absolute inset-0 backface-hidden",
              !isImageLoaded && "animate-pulse bg-gray-800"
            )}
          >
            <Card className="w-full h-full border-0 shadow-none bg-transparent">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={currentImage.url}
                    alt={currentImage.alt || `Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    onLoad={handleImageLoad}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back side - Empty white */}
          <div
            className="absolute inset-0 backface-hidden rotate-y-180"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Card className="w-full h-full border-0 shadow-none bg-white">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-gray-400 text-lg">
                  Click to flip back
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-lg text-white text-sm text-center">
        <div className="flex items-center gap-4">
          <span>Click image to flip</span>
          <span>•</span>
          <span>← → to navigate</span>
          <span>•</span>
          <span>ESC to close</span>
        </div>
      </div>

      {/* Loading indicator */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;