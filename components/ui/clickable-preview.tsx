"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";

interface ClickablePreviewProps {
  url: string;
  priority?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ClickablePreview = ({ 
  url, 
  priority, 
  onClick, 
  className 
}: ClickablePreviewProps) => (
  <div
    className={cn("mb-4 rounded-xl bg-card p-2 shadow-xl cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-[var(--color-primary-400)]", className)}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }}
    aria-label="View image in lightbox"
  >
    <div className="relative rounded-md overflow-hidden group">
      <Image
        alt={url}
        className="rounded-md block w-full h-auto"
        height={630}
        priority={priority}
        sizes="630px"
        src={url}
        width={630}
      />

      {/* Backside overlay for gallery preview - REMOVED */}
      {/* Hover effect is preserved, but detailed description overlay removed */}
      {/* <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-black/30 p-4 text-white flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="font-[var(--font-rock-salt)] text-xl leading-none drop-shadow-sm">Tidal Area Placeholder</div>
            <div className="text-sm text-white/80">$5</div>
          </div>

          <div className="mt-3 flex-1">
            <p className="font-[var(--font-roboto-condensed)] text-sm text-white/90 leading-snug">
              A short descriptive placeholder for the gallery item. This area uses Roboto Condensed so longer text stays compact and tidy.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-[var(--font-rock-salt)]">$5</span>
              <span className="text-xs text-white/75">one-time</span>
            </div>

            <div aria-hidden className="rounded-full bg-white/10 px-3 py-2 flex items-center gap-2 text-white pointer-events-none">
              <DownloadIcon className="w-4 h-4" />
              <span className="text-xs font-[var(--font-rock-salt)]">Download</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </div>
);

export default ClickablePreview;
