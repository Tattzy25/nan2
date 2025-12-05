"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Skull } from "lucide-react";

interface HeaderProps {
  activeTab: "gallery" | "my-shit";
  onTabChange: (tab: "gallery" | "my-shit") => void;
  onClose?: () => void;
}

export const Header = ({ activeTab, onTabChange, onClose }: HeaderProps) => (
  <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="w-full flex h-14 items-center justify-between px-4">
      {/* Left spacer for balance */}
      <div className="w-[200px]"></div>

      {/* Center navigation using NavigationMenu */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-12">
          <NavigationMenuItem>
            <Button asChild variant="ghost" size="lg">
              <NavigationMenuLink
                href="#"
                data-active={activeTab === "gallery"}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange("gallery");
                }}
              >
                Gallery
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="ghost" size="lg">
              <NavigationMenuLink
                href="#"
                data-active={activeTab === "my-shit"}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange("my-shit");
                }}
              >
                My Shit
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side - Close button */}
      <div className="w-[200px] flex justify-end">
        <Button
          onClick={() => {
            if (typeof onClose === "function") {
              onClose()
              return
            }
            try {
              window.dispatchEvent(new CustomEvent("close-overlay"))
            } catch (e) {
              // ignore
            }
          }}
          variant="default"
          size="lg"
          aria-label="Get inked now — close overlay"
          className="inline-flex items-center gap-3"
        >
          <Skull className="size-5" />
          <span className="text-base font-medium leading-none">gEt iNkd nOw</span>
        </Button>
      </div>
    </div>
  </nav>
);
