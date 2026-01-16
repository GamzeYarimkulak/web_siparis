import { getCart } from "@/server-actions/cart"
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { prisma } from "@/lib/prisma"

export default async function CheckoutPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/giris")
  }

  const cart = await getCart()
  const user = await requireAuth()
  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: { isDefault: "desc" },
  })

  if (!cart || cart.items.length === 0) {
    redirect("/sepet")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ödeme</h1>
      {/* NOT: Ödeme simülasyonu - gerçek ödeme gateway entegrasyonu yok */}
      <CheckoutForm cart={cart} addresses={addresses} />
    </div>
  )
}

