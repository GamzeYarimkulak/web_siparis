import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { STOCK_STATUS } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"
import type { Product, Variant, ProductImage, Brand, Category } from "@prisma/client"

interface ProductCardProps {
  product: Product & {
    brand: Brand
    category: Category
    images: ProductImage[]
    variants: Variant[]
  }
}

function getStockStatus(stock: number, threshold: number) {
  if (stock === 0) return STOCK_STATUS.OUT_OF_STOCK
  if (stock <= threshold) return STOCK_STATUS.LOW_STOCK
  return STOCK_STATUS.IN_STOCK
}

export function ProductCard({ product }: ProductCardProps) {
  const variant = product.variants[0]
  if (!variant) return null

  const stockStatus = getStockStatus(variant.stock, variant.lowStockThreshold)
  const image = product.images[0]

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <Link href={`/urun/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Görsel Yok
            </div>
          )}
          {stockStatus === STOCK_STATUS.OUT_OF_STOCK && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Stokta Yok
            </Badge>
          )}
          {stockStatus === STOCK_STATUS.LOW_STOCK && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
              Son Ürünler
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/urun/${product.slug}`}>
          <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.brand.name}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">{formatPrice(variant.price)}</p>
            {variant.cost < variant.price && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(variant.cost)}
              </p>
            )}
          </div>
          <Button
            size="icon"
            disabled={stockStatus === STOCK_STATUS.OUT_OF_STOCK}
            aria-label="Sepete Ekle"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

