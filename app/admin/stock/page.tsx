import { prisma } from "@/lib/prisma"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { STOCK_STATUS } from "@/lib/constants"

function getStockStatus(stock: number, threshold: number) {
  if (stock === 0) return STOCK_STATUS.OUT_OF_STOCK
  if (stock <= threshold) return STOCK_STATUS.LOW_STOCK
  return STOCK_STATUS.IN_STOCK
}

export default async function StockPage() {
  const variants = await prisma.variant.findMany({
    include: {
      product: {
        include: {
          brand: true,
        },
      },
    },
    orderBy: { stock: "asc" },
    take: 100,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Stok durumu görüntüleme (stok hareketleri sayfası planlanıyor)
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ürün</TableHead>
              <TableHead>Varyant</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Eşik</TableHead>
              <TableHead>Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => {
              const status = getStockStatus(
                variant.stock,
                variant.lowStockThreshold
              )
              return (
                <TableRow key={variant.id}>
                  <TableCell className="font-medium">
                    {variant.product.name}
                  </TableCell>
                  <TableCell>{variant.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {variant.sku}
                  </TableCell>
                  <TableCell>{variant.stock}</TableCell>
                  <TableCell>{variant.lowStockThreshold}</TableCell>
                  <TableCell>
                    {status === STOCK_STATUS.OUT_OF_STOCK ? (
                      <Badge variant="destructive">Stokta Yok</Badge>
                    ) : status === STOCK_STATUS.LOW_STOCK ? (
                      <Badge className="bg-yellow-500 text-white">Düşük Stok</Badge>
                    ) : (
                      <Badge className="bg-green-500 text-white">Stokta Var</Badge>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* TODO: Stok hareketleri sayfası eklenecek (giriş/çıkış kayıtları) */}
      <div>
        <Button asChild disabled>
          <Link href="/admin/stock/hareketler">Stok Hareketleri (Yakında)</Link>
        </Button>
      </div>
    </div>
  )
}

