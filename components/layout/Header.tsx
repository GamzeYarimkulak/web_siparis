import Link from "next/link"
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryMenu } from "./CategoryMenu"
import { HeaderAuth } from "./HeaderAuth"
import { prisma } from "@/lib/prisma"

async function getCategories() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { order: "asc" },
  })
  return categories
}

export async function Header() {
  const categories = await getCategories()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">E-Ticaret</span>
          </Link>

          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Ürün, kategori veya marka ara..."
                className="pl-10"
              />
            </div>
          </div>

          <HeaderAuth />
        </div>

        <div className="flex items-center justify-between h-12 border-t">
          <CategoryMenu categories={categories} />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

