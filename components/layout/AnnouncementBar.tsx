"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm text-center relative">
      <p className="container mx-auto px-4">
        Ücretsiz kargo fırsatı! 500 TL ve üzeri alışverişlerde kargo bedava.
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary-foreground hover:bg-primary/80"
        onClick={() => setIsVisible(false)}
        aria-label="Kapat"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

