"use server"

import { prisma } from "@/lib/prisma"

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: {
        orderBy: { price: "asc" },
      },
    },
  })

  return product
}

export async function getProductsByCategory(
  categorySlug: string,
  page: number = 1,
  limit: number = 24,
  sortBy: string = "createdAt",
  order: "asc" | "desc" = "desc"
) {
  const skip = (page - 1) * limit

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  })

  if (!category) {
    return { products: [], total: 0, totalPages: 0 }
  }

  const where = {
    categoryId: category.id,
    status: "ACTIVE" as const,
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        brand: true,
        images: { take: 1, orderBy: { order: "asc" } },
        variants: {
          orderBy: { price: "asc" },
          take: 1,
        },
      },
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
    }),
    prisma.product.count({ where }),
  ])

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

export async function searchProducts(
  query: string,
  page: number = 1,
  limit: number = 24
) {
  const skip = (page - 1) * limit

  const where = {
    status: "ACTIVE" as const,
    OR: [
      { name: { contains: query, mode: "insensitive" as const } },
      { description: { contains: query, mode: "insensitive" as const } },
    ],
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        images: { take: 1, orderBy: { order: "asc" } },
        variants: {
          orderBy: { price: "asc" },
          take: 1,
        },
      },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ])

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

