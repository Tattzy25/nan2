"use client"

import { useEffect, useState } from "react"
import { KbdInputGroup } from "@/components/ui/kbd-search"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FloatingKbdSearchProps {
  overlayContent: React.ReactNode
}

export function FloatingKbdSearch({ overlayContent }: FloatingKbdSearchProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <KbdInputGroup onInputClick={() => setIsOpen(true)} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative w-full h-full bg-card rounded-3xl shadow-2xl overflow-hidden border ring-1 ring-black/5">
            <div className="absolute top-4 right-4 z-50">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="h-full overflow-y-auto">
               {overlayContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
