import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ORDER_STATUS_LABELS } from "@/lib/constants"
import { formatPrice, formatDate } from "@/lib/utils"
import { UpdateOrderStatus } from "@/components/admin/UpdateOrderStatus"

interface OrderDetailPageProps {
  params: { id: string }
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      items: {
        include: {
          variant: {
            include: {
              product: {
                include: {
                  images: { take: 1, orderBy: { order: "asc" } },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sipariş Detayı</h1>
        <p className="text-muted-foreground mt-2">
          Sipariş No: {order.id.slice(0, 8)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Kalemleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-semibold">{item.nameSnapshot}</p>
                      <p className="text-sm text-muted-foreground">
                        Adet: {item.qty}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(item.priceSnapshot)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teslimat Adresi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">
                  {order.addressSnapshot.fullName}
                </p>
                <p className="text-sm">{order.addressSnapshot.phone}</p>
                <p className="text-sm">{order.addressSnapshot.address}</p>
                <p className="text-sm">
                  {order.addressSnapshot.district}, {order.addressSnapshot.city}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Durum</p>
                <Badge className="mt-1">
                  {ORDER_STATUS_LABELS[order.status]}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tarih</p>
                <p className="mt-1">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Müşteri</p>
                <p className="mt-1">{order.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {order.user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Özet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Toplam</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </div>
  )
}

