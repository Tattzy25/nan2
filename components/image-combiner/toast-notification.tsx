"use client"

import type React from "react"

interface ToastNotificationProps {
  message: string
  type: "success" | "error"
}

export function ToastNotification({ message, type }: ToastNotificationProps) {
  return (
    <div className="hidden">
      {/* Toast component preserved for functionality but hidden from UI */}
    </div>
  )
}
