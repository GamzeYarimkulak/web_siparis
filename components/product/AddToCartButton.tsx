"use client"

import { useState } from "react"
import { addToCart } from "@/server-actions/cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

interface AddToCartButtonProps {
  variantId: string
  stock: number
  lowStockThreshold: number
}

export function AddToCartButton({
  variantId,
  stock,
  lowStockThreshold,
}: AddToCartButtonProps) {
  const [qty, setQty] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (stock === 0) {
      toast({
        title: "Stokta Yok",
        description: "Bu ürün şu anda stokta bulunmamaktadır.",
        variant: "destructive",
      })
      return
    }

    if (qty > stock) {
      toast({
        title: "Yetersiz Stok",
        description: `Sadece ${stock} adet ürün mevcut.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await addToCart(variantId, qty)
      toast({
        title: "Sepete Eklendi",
        description: "Ürün sepetinize başarıyla eklendi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="qty" className="text-sm font-medium">
          Adet:
        </label>
        <Input
          id="qty"
          type="number"
          min="1"
          max={stock}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
          className="w-20"
        />
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || stock === 0}
        size="lg"
        className="flex-1"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isLoading ? "Ekleniyor..." : "Sepete Ekle"}
      </Button>
    </div>
  )
}

