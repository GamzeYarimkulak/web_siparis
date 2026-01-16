import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { AddressList } from "@/components/account/AddressList"

export default async function AddressesPage() {
  try {
    await requireAuth()
  } catch {
    redirect("/giris")
  }

  const user = await requireAuth()
  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: { isDefault: "desc" },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Adreslerim</h1>
      <AddressList addresses={addresses} />
    </div>
  )
}

