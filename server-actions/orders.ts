"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { getCart } from "./cart"
import { revalidatePath } from "next/cache"

interface CreateOrderData {
  address: {
    title: string
    fullName: string
    phone: string
    address: string
    city: string
    district: string
    postalCode?: string
  }
  shippingMethod: string
  paymentMethod: string
}

export async function createOrder(data: CreateOrderData) {
  const user = await requireAuth()
  const cart = await getCart()

  if (!cart || cart.items.length === 0) {
    throw new Error("Sepetiniz boş")
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.qty,
    0
  )
  const shippingFee = subtotal >= 500 ? 0 : 0
  const total = subtotal + shippingFee

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "PENDING",
      subtotal,
      shippingFee,
      total,
      addressSnapshot: data.address,
      items: {
        create: cart.items.map((item) => ({
          variantId: item.variantId,
          nameSnapshot: `${item.variant.product.name} - ${item.variant.name}`,
          priceSnapshot: item.variant.price,
          qty: item.qty,
        })),
      },
    },
  })

  // Stok düşümü
  for (const item of cart.items) {
    await prisma.stockMovement.create({
      data: {
        variantId: item.variantId,
        type: "OUT",
        qty: item.qty,
        reason: "Sipariş",
        orderId: order.id,
      },
    })

    await prisma.variant.update({
      where: { id: item.variantId },
      data: {
        stock: {
          decrement: item.qty,
        },
      },
    })
  }

  // Sepeti temizle
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  })

  revalidatePath("/hesabim/siparisler")
  return order
}

export async function getOrders() {
  const user = await requireAuth()

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
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
    orderBy: { createdAt: "desc" },
  })

  return orders
}

export async function getOrderById(orderId: string) {
  const user = await requireAuth()

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
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

  return order
}

