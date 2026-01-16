import { searchProducts } from "@/server-actions/products"
import { ProductCard } from "@/components/product/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchPageProps {
  searchParams: { q?: string; page?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const page = parseInt(searchParams.page || "1")

  const { products, total, totalPages } = query
    ? await searchProducts(query, page, 24)
    : { products: [], total: 0, totalPages: 0 }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TODO: Arama autocomplete özelliği eklenecek */}
      <div className="mb-8">
        <form action="/arama" method="get" className="flex gap-2">
          <Input
            name="q"
            type="search"
            placeholder="Ürün, kategori veya marka ara..."
            defaultValue={query}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Ara
          </Button>
        </form>
      </div>

      {query && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              "{query}" için arama sonuçları
            </h1>
            <p className="text-muted-foreground">
              {total} ürün bulundu
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aradığınız kriterlere uygun ürün bulunamadı.
              </p>
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
                      href={`?q=${encodeURIComponent(query)}&page=${p}`}
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
        </>
      )}
    </div>
  )
}

