import { getCart } from "@/server-actions/cart"
import { CartContent } from "@/components/cart/CartContent"
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CartPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/giris")
  }

  const cart = await getCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim</h1>
      <CartContent cart={cart} />
    </div>
  )
}

