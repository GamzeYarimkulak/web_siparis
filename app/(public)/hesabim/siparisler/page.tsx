import { getOrders } from "@/server-actions/orders"
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ORDER_STATUS_LABELS } from "@/lib/constants"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"

export default async function OrdersPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/giris")
  }

  const orders = await getOrders()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Siparişlerim</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Henüz siparişiniz yok.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sipariş No: {order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.nameSnapshot} x {item.qty}
                      </span>
                      <span>{formatPrice(item.priceSnapshot)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="font-bold">Toplam: {formatPrice(order.total)}</p>
                  <Link href={`/hesabim/siparisler/${order.id}`}>
                    <span className="text-primary hover:underline text-sm">
                      Detayları Gör
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

