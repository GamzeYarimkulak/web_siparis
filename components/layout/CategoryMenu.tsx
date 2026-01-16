"use client"

import Link from "next/link"
import { Category } from "@prisma/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface CategoryMenuProps {
  categories: (Category & { children: Category[] })[]
}

export function CategoryMenu({ categories }: CategoryMenuProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {categories.map((category) => (
        <DropdownMenu key={category.id}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
            {category.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          {category.children.length > 0 && (
            <DropdownMenuContent className="w-48">
              {category.children.map((child) => (
                <DropdownMenuItem key={child.id} asChild>
                  <Link href={`/kategori/${child.slug}`}>{child.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ))}
    </nav>
  )
}

