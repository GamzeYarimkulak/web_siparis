import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
      variants: {
        take: 1,
        orderBy: { price: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <p className="text-muted-foreground mt-2">
            Ürün yönetimi ve düzenleme (temel seviye)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/yeni">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Ürün
          </Link>
        </Button>
      </div>

      {/* TODO: Bulk actions (toplu silme, durum güncelleme) eklenecek */}
      {/* TODO: Export to Excel/CSV özelliği planlanıyor */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  {product.variants[0]
                    ? formatPrice(product.variants[0].price)
                    : "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.status === "ACTIVE" ? "default" : "secondary"}
                  >
                    {product.status === "ACTIVE" ? "Aktif" : "Pasif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/products/${product.id}`}>Düzenle</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

