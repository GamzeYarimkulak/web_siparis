"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeaderAuth() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-2">
      {session?.user ? (
        <>
          {/* TODO: Favoriler sayfası eklenecek */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/hesabim/favoriler">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favoriler</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/sepet">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Sepet</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Hesap</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/hesabim">Hesabım</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/hesabim/siparisler">Siparişlerim</Link>
              </DropdownMenuItem>
              {session.user.role === "ADMIN" || session.user.role === "STAFF" ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                </>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/giris">Giriş Yap</Link>
          </Button>
          <Button asChild>
            <Link href="/kayit">Kayıt Ol</Link>
          </Button>
        </>
      )}
    </div>
  )
}

