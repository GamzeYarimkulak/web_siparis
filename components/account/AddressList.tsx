"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"
import type { Address } from "@prisma/client"

interface AddressListProps {
  addresses: Address[]
}

export function AddressList({ addresses }: AddressListProps) {
  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Henüz adres eklenmemiş.</p>
          {/* TODO: Adres ekleme formu eklenecek */}
          <Button>Yeni Adres Ekle</Button>
        </div>
      ) : (
        <>
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {address.title}
                    {address.isDefault && (
                      <Badge variant="secondary">Varsayılan</Badge>
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{address.fullName}</p>
                <p className="text-sm">{address.phone}</p>
                <p className="text-sm">{address.address}</p>
                <p className="text-sm">
                  {address.district}, {address.city}
                  {address.postalCode && ` ${address.postalCode}`}
                </p>
              </CardContent>
            </Card>
          ))}
          <Button>Yeni Adres Ekle</Button>
        </>
      )}
    </div>
  )
}

