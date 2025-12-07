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
    className={cn("mb-[1px] bg-card p-[1px] cursor-pointer hover:opacity-90 transition-opacity", className)}
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
    <div className="relative overflow-hidden group">
      <Image
        alt={url}
        className="block w-full h-auto"
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
