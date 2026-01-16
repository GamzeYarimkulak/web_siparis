"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils"
import type { Variant } from "@prisma/client"

interface VariantSelectorProps {
  variants: Variant[]
  defaultVariantId: string
}

export function VariantSelector({
  variants,
  defaultVariantId,
}: VariantSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariantId)

  const selectedVariant = variants.find((v) => v.id === selectedVariantId)

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-semibold mb-2 block">
          Varyant Seçiniz
        </Label>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={`px-4 py-2 rounded border transition-colors ${
                selectedVariantId === variant.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {variant.name}
              <span className="ml-2 text-sm">
                ({formatPrice(variant.price)})
              </span>
            </button>
          ))}
        </div>
      </div>
      {selectedVariant && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Seçilen Varyant</p>
          <p className="font-semibold">{selectedVariant.name}</p>
          <p className="text-lg font-bold mt-2">
            {formatPrice(selectedVariant.price)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Stok: {selectedVariant.stock} adet
          </p>
        </div>
      )}
    </div>
  )
}

