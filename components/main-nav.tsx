"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const homeItems: { title: string; href: string; description: string }[] = [
  {
    title: "Overview",
    href: "/",
    description: "The main dashboard and starting point for image generation.",
  },
  {
    title: "Quick Start",
    href: "/",
    description: "Get started quickly with AI-powered image creation.",
  },
  {
    title: "Gallery",
    href: "/",
    description: "Browse your previously generated images.",
  },
]

const text2ImageItems: { title: string; href: string; description: string }[] = [
  {
    title: "Generate",
    href: "#",
    description: "Create stunning images from text descriptions.",
  },
  {
    title: "Templates",
    href: "#",
    description: "Pre-built prompts to get you started quickly.",
  },
  {
    title: "History",
    href: "#",
    description: "View your text-to-image generation history.",
  },
]

const image2ImageItems: { title: string; href: string; description: string }[] = [
  {
    title: "Transform",
    href: "#",
    description: "Transform existing images with AI assistance.",
  },
  {
    title: "Style Transfer",
    href: "#",
    description: "Apply different artistic styles to your images.",
  },
  {
    title: "Enhance",
    href: "#",
    description: "Upscale and enhance your images with AI.",
  },
]

const fontsItems: { title: string; href: string; description: string }[] = [
  {
    title: "Browse Fonts",
    href: "#",
    description: "Explore our collection of fonts for your designs.",
  },
  {
    title: "Custom Typography",
    href: "#",
    description: "Create custom text styles for your images.",
  },
  {
    title: "Font Pairing",
    href: "#",
    description: "Find the perfect font combinations.",
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-white/10 to-white/5 p-6 no-underline outline-none focus:shadow-md hover:bg-white/15 transition-colors"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      TaTTTy
                    </div>
                    <p className="text-sm leading-tight text-gray-400">
                      AI-powered image generation and editing tool.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {homeItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
            Text2Image
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {text2ImageItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
            Image2Image
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {image2ImageItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
            Fonts
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {fontsItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
