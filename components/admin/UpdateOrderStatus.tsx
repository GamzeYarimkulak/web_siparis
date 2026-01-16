"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateOrderStatus } from "@/server-actions/admin/orders"
import { useToast } from "@/hooks/use-toast"
import { ORDER_STATUS_LABELS } from "@/lib/constants"
import type { OrderStatus } from "@prisma/client"

interface UpdateOrderStatusProps {
  orderId: string
  currentStatus: OrderStatus
}

export function UpdateOrderStatus({
  orderId,
  currentStatus,
}: UpdateOrderStatusProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await updateOrderStatus(orderId, status)
      toast({
        title: "Güncellendi",
        description: "Sipariş durumu güncellendi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleUpdate}
        disabled={isLoading || status === currentStatus}
        className="w-full"
      >
        Durumu Güncelle
      </Button>
    </div>
  )
}

