"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

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
    className={cn("mb-4 rounded-xl bg-card p-2 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow", className)}
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
    <Image
      alt={url}
      className="rounded-md"
      height={630}
      priority={priority}
      sizes="630px"
      src={url}
      width={630}
    />
  </div>
);

export default ClickablePreview;