"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import { updateCartItem, removeFromCart } from "@/server-actions/cart"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import type { Cart, CartItem, Variant, Product, ProductImage } from "@prisma/client"

interface CartContentProps {
  cart: (Cart & {
    items: (CartItem & {
      variant: Variant & {
        product: Product & {
          images: ProductImage[]
        }
      }
    })[]
  }) | null
}

export function CartContent({ cart }: CartContentProps) {
  const { toast } = useToast()

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Sepetiniz boş.</p>
        <Button asChild>
          <Link href="/kategori">Alışverişe Başla</Link>
        </Button>
      </div>
    )
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.qty,
    0
  )

  const handleUpdateQty = async (itemId: string, qty: number) => {
    try {
      await updateCartItem(itemId, qty)
      toast({
        title: "Güncellendi",
        description: "Sepet güncellendi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  const handleRemove = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast({
        title: "Kaldırıldı",
        description: "Ürün sepetten kaldırıldı.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => {
          const image = item.variant.product.images[0]
          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 border rounded-lg"
            >
              {image && (
                <div className="relative w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={image.url}
                    alt={image.alt || item.variant.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{item.variant.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.variant.name}
                </p>
                <p className="font-bold mt-2">
                  {formatPrice(item.variant.price)}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    type="number"
                    min="1"
                    max={item.variant.stock}
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateQty(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="lg:col-span-1">
        <div className="border rounded-lg p-6 space-y-4 sticky top-4">
          <h2 className="text-xl font-bold">Sipariş Özeti</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <span>{subtotal >= 500 ? "Ücretsiz" : formatPrice(0)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg" asChild>
            <Link href="/odeme">Ödemeye Geç</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

