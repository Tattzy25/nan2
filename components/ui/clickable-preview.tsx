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
    className={cn("mb-[2px] rounded-lg bg-card p-[2px] shadow-lg cursor-pointer hover:shadow-xl transition-all border border-transparent hover:border-[var(--color-primary-400)]", className)}
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
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
        src={url}
        width={630}
      />
    </div>
  </div>
);

export default ClickablePreview;
