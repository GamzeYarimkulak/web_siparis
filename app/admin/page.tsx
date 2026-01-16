import { prisma } from "@/lib/prisma"
import { StatsCard } from "@/components/admin/StatsCard"
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const [
    todayOrders,
    pendingOrders,
    lowStockVariants,
    totalRevenue,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.order.count({
      where: { status: "PENDING" },
    }),
    (async () => {
      const allVariants = await prisma.variant.findMany({
        select: { stock: true, lowStockThreshold: true },
      })
      return allVariants.filter(
        (v) => v.stock === 0 || v.stock <= v.lowStockThreshold
      ).length
    })(),
    prisma.order.aggregate({
      where: {
        status: { in: ["CONFIRMED", "SHIPPED", "DELIVERED"] },
      },
      _sum: { total: true },
    }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Genel bakış ve istatistikler (grafikler ve detaylı raporlar planlanıyor)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Bugünkü Siparişler"
          value={todayOrders}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Bekleyen Siparişler"
          value={pendingOrders}
          icon={Package}
        />
        <StatsCard
          title="Düşük Stok"
          value={lowStockVariants}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Toplam Ciro"
          value={`${Number(totalRevenue._sum.total || 0).toLocaleString("tr-TR")} ₺`}
          icon={TrendingUp}
        />
      </div>
    </div>
  )
}

