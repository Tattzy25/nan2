"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import { ImageUploadBox } from "./image-upload-box"
import { cn } from "@/lib/utils"

// Use standardized shadcn Button variants instead of a custom class

interface InputSectionProps {
  prompt: string
  setPrompt: (prompt: string) => void
  aspectRatio: string
  setAspectRatio: (ratio: string) => void
  availableAspectRatios: Array<{ value: string; label: string; icon: React.ReactNode }>
  useUrls: boolean
  setUseUrls: (use: boolean) => void
  image1Preview: string | null
  image2Preview: string | null
  image1Url: string
  image2Url: string
  isConvertingHeic: boolean
  canGenerate: boolean
  hasImages: boolean
  onGenerate: () => void
  onClearAll: () => void
  onImageUpload: (file: File, slot: 1 | 2) => Promise<void>
  onUrlChange: (url: string, slot: 1 | 2) => void
  onClearImage: (slot: 1 | 2) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onPromptPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void
  onImageFullscreen: (url: string) => void
  promptTextareaRef: React.RefObject<HTMLTextAreaElement>
  // NOTE: history-related props were removed — GenerationHistory is now rendered only on the "My" page.
}

export function InputSection({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  availableAspectRatios,
  useUrls,
  setUseUrls,
  image1Preview,
  image2Preview,
  image1Url,
  image2Url,
  isConvertingHeic,
  canGenerate,
  hasImages,
  onGenerate,
  onClearAll,
  onImageUpload,
  onUrlChange,
  onClearImage,
  onKeyDown,
  onPromptPaste,
  onImageFullscreen,
  promptTextareaRef,
}: InputSectionProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="space-y-6 md:space-y-8 min-h-0 flex flex-col">
        <div className="space-y-6 md:space-y-8 flex flex-col">
          <div className="space-y-3">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={onKeyDown}
              onPaste={onPromptPaste}
              placeholder="Type your message here."
              aria-label="Your message"
            />
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-3 select-none">
              <div className="flex flex-col gap-1">
                <label className="text-sm md:text-base font-medium text-gray-300">Images (optional)</label>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <ToggleGroup
                  type="single"
                  value={useUrls ? "urls" : "files"}
                  onValueChange={(value) => setUseUrls(value === "urls")}
                  variant="default"
                                  >
                  <ToggleGroupItem
                    value="files"
                    className="data-[state=on]:border-2 data-[state=on]:border-green-400"
                  >
                    Files
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="urls"
                    className="data-[state=on]:border-2 data-[state=on]:border-green-400"
                  >
                    URLs
                  </ToggleGroupItem>
                </ToggleGroup>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="w-24 sm:w-28 md:w-32 h-7 md:h-10 px-3 py-0 rounded-md bg-black/50 border-2 border-green-400 text-white text-xs md:text-sm">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAspectRatios.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {useUrls ? (
              <div className="space-y-2 lg:min-h-[12vh] xl:min-h-[14vh]">
                <InputGroup>
                  <InputGroupInput
                    type="url"
                    value={image1Url}
                    onChange={(e) => onUrlChange(e.target.value, 1)}
                    placeholder="First image URL"
                    aria-label="First image URL"
                  />
                  {image1Url && (
                    <InputGroupButton
                      onClick={() => onClearImage(1)}
                      aria-label="Clear first image URL"
                    >
                      <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </InputGroupButton>
                  )}
                </InputGroup>
                <InputGroup>
                  <InputGroupInput
                    type="url"
                    value={image2Url}
                    onChange={(e) => onUrlChange(e.target.value, 2)}
                    placeholder="Second image URL"
                    aria-label="Second image URL"
                  />
                  {image2Url && (
                    <InputGroupButton
                      onClick={() => onClearImage(2)}
                      aria-label="Clear second image URL"
                    >
                      <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </InputGroupButton>
                  )}
                </InputGroup>
              </div>
            ) : (
              <div className="select-none lg:min-h-[12vh] xl:min-h-[14vh]">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  <ImageUploadBox
                    imageNumber={1}
                    preview={image1Preview ?? ""}
                    onDrop={(e) => {
                      e.preventDefault()
                      const file = e.dataTransfer.files[0]
                      if (file && file.type.startsWith("image/")) {
                        onImageUpload(file, 1)
                      }
                    }}
                    onClear={() => onClearImage(1)}
                    onSelect={() => {
                      if (image1Preview) {
                        onImageFullscreen(image1Preview)
                      } else {
                        document.getElementById("file1")?.click()
                      }
                    }}
                  />
                  <input
                    id="file1"
                    type="file"
                    accept="image/*,.heic,.heif"
                    className="hidden"
                    aria-label="Upload first image"
                    title="Upload first image"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onImageUpload(file, 1)
                        e.target.value = ""
                      }
                    }}
                  />

                  <ImageUploadBox
                    imageNumber={2}
                    preview={image2Preview ?? ""}
                    onDrop={(e) => {
                      e.preventDefault()
                      const file = e.dataTransfer.files[0]
                      if (file && file.type.startsWith("image/")) {
                        onImageUpload(file, 2)
                      }
                    }}
                    onClear={() => onClearImage(2)}
                    onSelect={() => {
                      if (image2Preview) {
                        onImageFullscreen(image2Preview)
                      } else {
                        document.getElementById("file2")?.click()
                      }
                    }}
                  />
                  <input
                    id="file2"
                    type="file"
                    accept="image/*,.heic,.heif"
                    className="hidden"
                    aria-label="Upload second image"
                    title="Upload second image"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onImageUpload(file, 2)
                        e.target.value = ""
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-0 mt-6 md:mt-8 mb-6 md:mb-8">
          <Button
            onClick={onGenerate}
            disabled={!canGenerate || isConvertingHeic}
            size="lg"
            variant="outline"
            className="w-full border-2 border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.35)] hover:shadow-[0_0_16px_rgba(34,197,94,0.5)] bg-transparent hover:bg-green-500/10"
          >
            {isConvertingHeic ? "Converting HEIC..." : "Run"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}
