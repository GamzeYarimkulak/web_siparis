import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product/ProductCard"
import { ArrowRight, TrendingUp } from "lucide-react"

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      brand: true,
      category: true,
      images: { take: 1, orderBy: { order: "asc" } },
      variants: {
        orderBy: { price: "asc" },
        take: 1,
      },
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  })
  return products
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { order: "asc" },
    take: 6,
  })
  return categories
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Yeni Sezon Ürünlerinde Özel Fırsatlar
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Binlerce ürün çeşidi, hızlı kargo ve güvenli alışveriş ile ihtiyacınız olan her şey burada.
            </p>
            <Button size="lg" asChild>
              <Link href="/kategori">
                Alışverişe Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Kategoriler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/kategori/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Çok Satanlar</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/kategori">Tümünü Gör</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Ücretsiz Kargo</h3>
              <p className="text-sm text-muted-foreground">
                500 TL ve üzeri alışverişlerde
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Kolay İade</h3>
              <p className="text-sm text-muted-foreground">
                14 gün içinde ücretsiz iade
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Güvenli Ödeme</h3>
              <p className="text-sm text-muted-foreground">
                256-bit SSL şifreleme
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">7/24 Destek</h3>
              <p className="text-sm text-muted-foreground">
                Müşteri hizmetlerimiz her zaman yanınızda
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

