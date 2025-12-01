"use client";

import { cn } from "@/lib/utils";
import { Skull } from "lucide-react";

interface HeaderProps {
  activeTab: "gallery" | "my-shit";
  onTabChange: (tab: "gallery" | "my-shit") => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => (
  <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="w-full flex h-14 items-center justify-between px-4">
      {/* Left spacer for balance */}
      <div className="w-[200px]"></div>
      
      {/* Center navigation */}
      <div className="flex gap-6 md:gap-10">
        <button
          onClick={() => onTabChange("gallery")}
          className={cn(
            "relative flex items-center text-sm font-medium transition-all hover:text-foreground/80 px-3 py-2 rounded-md",
            activeTab === "gallery" 
              ? "text-foreground bg-accent" 
              : "text-foreground/60"
          )}
        >
          Gallery
        </button>
        <button
          onClick={() => onTabChange("my-shit")}
          className={cn(
            "relative flex items-center text-sm font-medium transition-all hover:text-foreground/80 px-3 py-2 rounded-md",
            activeTab === "my-shit" 
              ? "text-foreground bg-accent" 
              : "text-foreground/60"
          )}
        >
          My Shit
        </button>
      </div>
      
      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Skull className="size-4" />
          Ink It Now
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:ring-2 hover:ring-primary transition-all">
          A
        </div>
      </div>
    </div>
  </nav>
);
