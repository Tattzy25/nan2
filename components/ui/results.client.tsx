"use client";

import type { ListBlobResult } from "@vercel/blob";
import {
  ArrowLeftIcon,
  FileIcon,
  ImageIcon,
  ImageUpIcon,
  Loader2Icon,
} from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { search } from "@/app/actions/search";
import { Preview } from "./preview";
import { ClickablePreview } from "./clickable-preview";
import { Button } from "./button";
import { ImageLightbox } from "./image-lightbox";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./empty";
import { Input } from "./input";
import { Kbd } from "./kbd";
import { useUploadedImages } from "./uploaded-images-provider";

type ResultsClientProps = {
  defaultData: ListBlobResult["blobs"];
  showUploadButton?: boolean;
};

const PRIORITY_COUNT = 12;

export const ResultsClient = ({ defaultData, showUploadButton = true }: ResultsClientProps) => {
  const { images } = useUploadedImages();
  const [state, formAction, isPending] = useActionState(search, { data: [] });
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine all images for lightbox
  const allImages = [
    ...images.map(img => ({ url: img.url, alt: `Uploaded image ${img.url}` })),
    ...("data" in state && state.data?.length ? state.data.map(blob => ({ url: blob.url, alt: `Search result ${blob.url}` })) : defaultData.map(blob => ({ url: blob.downloadUrl, alt: `Gallery image ${blob.downloadUrl}` })))
  ];

  useEffect(() => {
    if ("error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const reset = () => {
    window.location.reload();
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  const hasImages =
    images.length ||
    defaultData.length ||
    ("data" in state && state.data?.length);

  return (
    <>
      {hasImages ? (
        <div className="gap-4 columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-4">
          {images.map((image, index) => (
            <ClickablePreview
              key={image.url}
              priority={index < PRIORITY_COUNT}
              url={image.url}
              onClick={() => openLightbox(index)}
            />
          ))}
          {"data" in state && state.data?.length
            ? state.data.map((blob, index) => (
                <ClickablePreview
                  key={blob.url}
                  priority={images.length + index < PRIORITY_COUNT}
                  url={blob.url}
                  onClick={() => openLightbox(images.length + index)}
                />
              ))
            : defaultData.map((blob, index) => (
                <ClickablePreview
                  key={blob.url}
                  priority={images.length + index < PRIORITY_COUNT}
                  url={blob.downloadUrl}
                  onClick={() => openLightbox(images.length + index)}
                />
              ))}
        </div>
      ) : (
        <Empty className="h-full min-h-[50vh] rounded-lg border">
          <EmptyHeader className="max-w-none">
            <div className="relative isolate mb-8 flex">
              <div className="-rotate-12 translate-x-2 translate-y-2 rounded-full border bg-background p-3 shadow-xs">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>

              <div className="-translate-x-2 translate-y-2 rotate-12 rounded-full border bg-background p-3 shadow-xs">
                <FileIcon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <EmptyTitle>No images found</EmptyTitle>
            <EmptyDescription>
              Upload some images with the{" "}
              <ImageUpIcon className="inline size-4" /> button below to get
              started!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <form
        action={formAction}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex w-full max-w-2xl items-center gap-2 rounded-full bg-background p-2 shadow-xl"
      >
        {"data" in state && state.data.length > 0 && (
          <Button
            className="shrink-0 rounded-full"
            disabled={isPending}
            onClick={reset}
            size="icon"
            type="button"
            variant="ghost"
          >
            <ArrowLeftIcon className="size-6" />
          </Button>
        )}
        <div className="relative flex w-full">
          <Input
            ref={searchInputRef}
            className="w-full rounded-full border-none bg-secondary shadow-none outline-none pr-12 py-4 text-lg"
            disabled={isPending || !hasImages}
            id="search"
            name="search"
            placeholder="Search by description"
            required
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Kbd className="text-sm">⌘</Kbd>
            <Kbd className="text-sm">K</Kbd>
          </div>
        </div>
        {isPending ? (
          <Button className="shrink-0" disabled size="icon" variant="ghost">
            <Loader2Icon className="size-6 animate-spin" />
          </Button>
        ) : null}
      </form>
      
      {/* Lightbox */}
      <ImageLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
};
