import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Clear existing data
  await prisma.stockMovement.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.address.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const passwordHash = await bcrypt.hash("password123", 10)

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash,
      role: "ADMIN",
    },
  })

  const staff = await prisma.user.create({
    data: {
      name: "Staff User",
      email: "staff@example.com",
      passwordHash,
      role: "STAFF",
    },
  })

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@example.com",
      passwordHash,
      role: "USER",
    },
  })

  console.log("Created users")

  // Create brands
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: "TechBrand",
        slug: "techbrand",
      },
    }),
    prisma.brand.create({
      data: {
        name: "StyleCo",
        slug: "styleco",
      },
    }),
    prisma.brand.create({
      data: {
        name: "HomeLife",
        slug: "homelife",
      },
    }),
    prisma.brand.create({
      data: {
        name: "SportMax",
        slug: "sportmax",
      },
    }),
  ])

  console.log("Created brands")

  // Create categories
  const mainCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Elektronik",
        slug: "elektronik",
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Giyim",
        slug: "giyim",
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Ev & Yaşam",
        slug: "ev-yasam",
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Spor & Outdoor",
        slug: "spor-outdoor",
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kitap & Hobi",
        slug: "kitap-hobi",
        order: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kozmetik",
        slug: "kozmetik",
        order: 6,
      },
    }),
  ])

  // Create subcategories
  const subCategories = []
  for (let i = 0; i < mainCategories.length; i++) {
    const parent = mainCategories[i]
    for (let j = 1; j <= 3; j++) {
      const sub = await prisma.category.create({
        data: {
          name: `${parent.name} Alt Kategori ${j}`,
          slug: `${parent.slug}-alt-${j}`,
          parentId: parent.id,
          order: j,
        },
      })
      subCategories.push(sub)
    }
  }

  console.log("Created categories")

  // Create products
  const products = []
  for (let i = 0; i < 30; i++) {
    const categoryIndex = i % subCategories.length
    const brandIndex = i % brands.length
    const category = subCategories[categoryIndex]
    const brand = brands[brandIndex]

    const product = await prisma.product.create({
      data: {
        name: `Ürün ${i + 1}`,
        slug: `urun-${i + 1}`,
        description: `Bu ürün ${category.name} kategorisinde ve ${brand.name} markasına aittir.`,
        brandId: brand.id,
        categoryId: category.id,
        status: "ACTIVE",
        images: {
          create: [
            {
              url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`,
              alt: `Ürün ${i + 1} görseli`,
              order: 0,
            },
          ],
        },
      },
    })

    // Create variants
    const variantCount = Math.floor(Math.random() * 3) + 1
    for (let v = 0; v < variantCount; v++) {
      await prisma.variant.create({
        data: {
          productId: product.id,
          sku: `SKU-${product.id.slice(0, 8)}-${v}`,
          barcode: `1234567890${i}${v}`,
          name: `Varyant ${v + 1}`,
          price: (Math.random() * 500 + 50) * 10,
          cost: (Math.random() * 400 + 40) * 10,
          stock: Math.floor(Math.random() * 100) + 10,
          lowStockThreshold: 10,
        },
      })
    }

    products.push(product)
  }

  console.log("Created products")

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

