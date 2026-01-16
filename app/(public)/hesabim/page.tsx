import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, MapPin, User } from "lucide-react"

export default async function AccountPage() {
  try {
    const user = await requireAuth()
    
    const [ordersCount, addressesCount] = await Promise.all([
      prisma.order.count({ where: { userId: user.id } }),
      prisma.address.count({ where: { userId: user.id } }),
    ])

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Hesabım</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Siparişlerim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{ordersCount}</p>
              <Button variant="outline" asChild>
                <Link href="/hesabim/siparisler">Tümünü Gör</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Adreslerim
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{addressesCount}</p>
              <Button variant="outline" asChild>
                <Link href="/hesabim/adresler">Yönet</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {user.email}
              </p>
              <Button variant="outline">Düzenle</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch {
    redirect("/giris")
  }
}

