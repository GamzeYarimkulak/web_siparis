import Link from "next/link"
import { Package, MapPin, User } from "lucide-react"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="space-y-2">
            <Link
              href="/hesabim"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
            >
              <User className="h-4 w-4" />
              Profil
            </Link>
            <Link
              href="/hesabim/siparisler"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
            >
              <Package className="h-4 w-4" />
              Siparişlerim
            </Link>
            <Link
              href="/hesabim/adresler"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted"
            >
              <MapPin className="h-4 w-4" />
              Adreslerim
            </Link>
          </nav>
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  )
}

