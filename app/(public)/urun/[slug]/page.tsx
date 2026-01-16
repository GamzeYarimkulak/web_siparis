import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/server-actions/products"
import { addToCart } from "@/server-actions/cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { STOCK_STATUS } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import { VariantSelector } from "@/components/product/VariantSelector"

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const defaultVariant = product.variants[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Görsel Yok
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square bg-muted rounded overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {product.brand.name} / {product.category.name}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}
          </div>

          {defaultVariant && (
            <>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold">
                  {formatPrice(defaultVariant.price)}
                </p>
                {defaultVariant.cost < defaultVariant.price && (
                  <p className="text-xl text-muted-foreground line-through">
                    {formatPrice(defaultVariant.cost)}
                  </p>
                )}
              </div>

              {product.variants.length > 1 && (
                <VariantSelector
                  variants={product.variants}
                  defaultVariantId={defaultVariant.id}
                />
              )}

              <div className="flex items-center gap-4">
                <AddToCartButton
                  variantId={defaultVariant.id}
                  stock={defaultVariant.stock}
                  lowStockThreshold={defaultVariant.lowStockThreshold}
                />
              </div>

              <div className="border-t pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Stok Durumu</h3>
                  {defaultVariant.stock === 0 ? (
                    <Badge variant="destructive">Stokta Yok</Badge>
                  ) : defaultVariant.stock <= defaultVariant.lowStockThreshold ? (
                    <Badge className="bg-yellow-500 text-white">
                      Son {defaultVariant.stock} Ürün
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white">Stokta Var</Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Teslimat</h3>
                  <p className="text-sm text-muted-foreground">
                    3-5 iş günü içinde kargoya verilir. 500 TL ve üzeri alışverişlerde ücretsiz kargo.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

