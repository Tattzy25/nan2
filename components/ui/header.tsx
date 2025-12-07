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
    <div className="w-full flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4">
      {/* Left spacer for balance on desktop, hidden on mobile */}
      <div className="hidden md:block md:w-[150px] lg:w-[200px]"></div>

      {/* Center navigation using NavigationMenu */}
      <NavigationMenu viewport={false} className="flex-1 md:flex-initial">
        <NavigationMenuList className="gap-4 sm:gap-8 md:gap-12 flex justify-center">
          <NavigationMenuItem>
            <Button asChild variant="ghost" size="default" className="text-sm sm:text-base">
              <NavigationMenuLink
                href="#"
                data-active={activeTab === "gallery"}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange("gallery");
                }}
                className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              >
                Gallery
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant="ghost" size="default" className="text-sm sm:text-base">
              <NavigationMenuLink
                href="#"
                data-active={activeTab === "my-shit"}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange("my-shit");
                }}
                className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              >
                My Shit
              </NavigationMenuLink>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side - Close button */}
      <div className="md:w-[150px] lg:w-[200px] flex justify-end">
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
          size="default"
          aria-label="Get inked now — close overlay"
          className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base px-2 sm:px-4"
        >
          <Skull className="size-4 sm:size-5" />
          <span className="font-medium leading-none hidden xs:inline">gEt iNkd nOw</span>
          <span className="font-medium leading-none xs:hidden">Close</span>
        </Button>
      </div>
    </div>
  </nav>
);
