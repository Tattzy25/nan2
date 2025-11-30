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
  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseEndRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

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
  const goToPrevious = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const goToNext = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
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

  // Handle touch events for swipe gestures
  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    touchEndRef.current = null;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const start = touchStartRef.current;
    const end = touchEndRef.current;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const deltaTime = end.time - start.time;
    
    // Calculate swipe velocity and distance
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocity = absX / deltaTime;
    
    // Minimum swipe distance and velocity thresholds
    const minSwipeDistance = 50; // pixels
    const minVelocity = 0.3; // pixels per millisecond
    
    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (absX > absY && absX > minSwipeDistance && velocity > minVelocity) {
      if (deltaX > 0) {
        // Swipe right - go to previous image
        goToPrevious();
      } else {
        // Swipe left - go to next image
        goToNext();
      }
    }
    
    // Reset touch refs
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Handle mouse drag events for desktop swipe
  const handleMouseDown = (event: React.MouseEvent) => {
    // Only start drag on the image container, not on buttons or UI elements
    if (event.target !== event.currentTarget) return;
    
    setIsDragging(true);
    mouseStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };
    mouseEndRef.current = null;
    
    // Prevent text selection during drag
    event.preventDefault();
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !mouseStartRef.current) return;
    
    mouseEndRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };
  };

  const handleMouseUp = () => {
    if (!isDragging || !mouseStartRef.current || !mouseEndRef.current) {
      setIsDragging(false);
      return;
    }

    const start = mouseStartRef.current;
    const end = mouseEndRef.current;
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const deltaTime = end.time - start.time;
    
    // Calculate drag velocity and distance
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocity = absX / deltaTime;
    
    // Same thresholds as touch swipes
    const minSwipeDistance = 50; // pixels
    const minVelocity = 0.3; // pixels per millisecond
    
    // Check if it's a horizontal drag (more horizontal than vertical)
    if (absX > absY && absX > minSwipeDistance && velocity > minVelocity) {
      if (deltaX > 0) {
        // Drag right - go to previous image
        goToPrevious();
      } else {
        // Drag left - go to next image
        goToNext();
      }
    }
    
    setIsDragging(false);
    mouseStartRef.current = null;
    mouseEndRef.current = null;
  };

  const handleMouseLeave = () => {
    // Cancel drag if mouse leaves the area
    setIsDragging(false);
    mouseStartRef.current = null;
    mouseEndRef.current = null;
  };

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm touch-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        <XIcon className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Navigation buttons - Hidden on mobile, visible on larger screens */}
      {hasPrevious && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          onClick={(e) => goToPrevious(e)}
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      )}

      {hasNext && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          onClick={(e) => goToNext(e)}
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      )}

      {/* Image counter */}
      <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Flip card container */}
      <div 
        className={cn(
          "relative w-full h-full flex items-center justify-center p-2 sm:p-4 select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className={cn(
            "relative w-full max-w-5xl h-full max-h-[85vh] sm:max-h-[90vh] transition-transform duration-700 preserve-3d select-none",
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
      <div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white text-xs sm:text-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          <span className="hidden sm:inline">Click image to flip</span>
          <span className="hidden sm:inline">•</span>
          <span>Swipe/Drag to navigate</span>
          <span>•</span>
          <span className="hidden xs:inline">← → to navigate</span>
          <span className="hidden xs:inline">•</span>
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