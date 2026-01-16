"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import type { OrderStatus } from "@prisma/client"

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  await requireAdmin()

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  })

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${orderId}`)
}

