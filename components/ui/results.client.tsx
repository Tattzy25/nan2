"use client";

import type { ListBlobResult } from "@vercel/blob";
import {
  ArrowLeftIcon,
  FileIcon,
  ImageIcon,
  ImageUpIcon,
  Loader2Icon,
} from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { search } from "@/app/actions/search";
import { Preview } from "./preview";
import { Button } from "./button";
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

  const hasImages =
    images.length ||
    defaultData.length ||
    ("data" in state && state.data?.length);

  return (
    <>
      {hasImages ? (
        <div className="gap-4 sm:columns-2 md:columns-3 lg:columns-2 xl:columns-3">
          {images.map((image, index) => (
            <Preview
              key={image.url}
              priority={index < PRIORITY_COUNT}
              url={image.url}
            />
          ))}
          {"data" in state && state.data?.length
            ? state.data.map((blob, index) => (
                <Preview
                  key={blob.url}
                  priority={index < PRIORITY_COUNT}
                  url={blob.url}
                />
              ))
            : defaultData.map((blob, index) => (
                <Preview
                  key={blob.url}
                  priority={index < PRIORITY_COUNT}
                  url={blob.downloadUrl}
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
        className="-translate-x-1/2 fixed bottom-8 left-1/2 flex w-full max-w-sm items-center gap-1 rounded-full bg-background p-1 shadow-xl sm:max-w-lg lg:ml-[182px]"
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
            <ArrowLeftIcon className="size-4" />
          </Button>
        )}
        <div className="relative flex w-full">
          <Input
            ref={searchInputRef}
            className="w-full rounded-full border-none bg-secondary shadow-none outline-none pr-12"
            disabled={isPending || !hasImages}
            id="search"
            name="search"
            placeholder="Search by description"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Kbd className="text-xs">⌘</Kbd>
            <Kbd className="text-xs">K</Kbd>
          </div>
        </div>
        {isPending ? (
          <Button className="shrink-0" disabled size="icon" variant="ghost">
            <Loader2Icon className="size-4 animate-spin" />
          </Button>
        ) : null}
      </form>
    </>
  );
};
