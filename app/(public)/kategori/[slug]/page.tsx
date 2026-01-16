import { notFound } from "next/navigation"
import { getProductsByCategory } from "@/server-actions/products"
import { ProductCard } from "@/components/product/ProductCard"
import { prisma } from "@/lib/prisma"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoryPageProps {
  params: { slug: string }
  searchParams: { page?: string; sort?: string }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const page = parseInt(searchParams.page || "1")
  const sortBy = searchParams.sort || "createdAt"
  const order = sortBy === "price" ? "asc" : "desc"

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: { parent: true },
  })

  if (!category) {
    notFound()
  }

  const { products, total, totalPages } = await getProductsByCategory(
    params.slug,
    page,
    24,
    sortBy,
    order
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        {category.parent && (
          <p className="text-sm text-muted-foreground mb-2">
            <a href={`/kategori/${category.parent.slug}`} className="hover:text-foreground">
              {category.parent.name}
            </a>
            {" / "}
            {category.name}
          </p>
        )}
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-2">
          {total} ürün bulundu
        </p>
      </div>

      {/* TODO: Gelişmiş filtreleme eklenecek (marka, fiyat aralığı, stok durumu) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sırala" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Yeni Eklenenler</SelectItem>
              <SelectItem value="price">Fiyat: Düşükten Yükseğe</SelectItem>
              <SelectItem value="name">İsme Göre A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Bu kategoride ürün bulunamadı.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`?page=${p}&sort=${sortBy}`}
                  className={`px-4 py-2 rounded ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

