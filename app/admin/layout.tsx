import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/providers/SessionProvider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requireAdmin()
  } catch {
    redirect("/")
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
        <Toaster />
      </div>
    </SessionProvider>
  )
}

