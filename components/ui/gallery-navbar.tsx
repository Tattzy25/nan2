"use client";

import { cn } from "@/lib/utils";

interface GalleryNavbarProps {
  activeTab: "gallery" | "my-shit";
  onTabChange: (tab: "gallery" | "my-shit") => void;
}

export const GalleryNavbar = ({ activeTab, onTabChange }: GalleryNavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex gap-6 md:gap-10">
          <button
            onClick={() => onTabChange("gallery")}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              activeTab === "gallery" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Gallery
          </button>
          <button
            onClick={() => onTabChange("my-shit")}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              activeTab === "my-shit" ? "text-foreground" : "text-foreground/60"
            )}
          >
            My Shit
          </button>
        </div>
      </div>
    </nav>
  );
};
