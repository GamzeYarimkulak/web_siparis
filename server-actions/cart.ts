"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getCart() {
  const user = await getCurrentUser()
  if (!user) return null

  const cart = await prisma.cart.findUnique({
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
  })

  return cart
}

export async function addToCart(variantId: string, qty: number = 1) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Giriş yapmanız gerekiyor")
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
    })
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_variantId: {
        cartId: cart.id,
        variantId,
      },
    },
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { qty: existingItem.qty + qty },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId,
        qty,
      },
    })
  }

  revalidatePath("/sepet")
  return { success: true }
}

export async function updateCartItem(cartItemId: string, qty: number) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Giriş yapmanız gerekiyor")
  }

  if (qty <= 0) {
    await removeFromCart(cartItemId)
    return { success: true }
  }

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { qty },
  })

  revalidatePath("/sepet")
  return { success: true }
}

export async function removeFromCart(cartItemId: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Giriş yapmanız gerekiyor")
  }

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  })

  revalidatePath("/sepet")
  return { success: true }
}

