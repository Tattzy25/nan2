import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  ),
)
Textarea.displayName = "Textarea"

interface TextareaWithLabelProps extends React.ComponentProps<typeof Textarea> {
  label?: string
  labelProps?: React.ComponentProps<typeof Label>
}

const TextareaWithLabel = React.forwardRef<HTMLTextAreaElement, TextareaWithLabelProps>(
  ({ id = "message", label = "Your message", labelProps, ...props }, ref) => (
    <div className="grid w-full gap-3">
      <Label htmlFor={id} {...labelProps}>
        {label}
      </Label>
      <Textarea id={id} ref={ref} {...props} />
    </div>
  ),
)
TextareaWithLabel.displayName = "TextareaWithLabel"

export { Textarea, TextareaWithLabel }
