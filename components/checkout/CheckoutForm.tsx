"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema } from "@/lib/validations"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SHIPPING_METHODS, PAYMENT_METHODS } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { createOrder } from "@/server-actions/orders"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { Cart, CartItem, Variant, Product, ProductImage } from "@prisma/client"
import type { Address } from "@prisma/client"

interface CheckoutFormProps {
  cart: Cart & {
    items: (CartItem & {
      variant: Variant & {
        product: Product & {
          images: ProductImage[]
        }
      }
    })[]
  }
  addresses: Address[]
}

const checkoutSchema = z.object({
  addressId: z.string().optional(),
  shippingMethod: z.string().min(1, "Kargo yöntemi seçiniz"),
  paymentMethod: z.string().min(1, "Ödeme yöntemi seçiniz"),
  title: z.string().optional(),
  fullName: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  postalCode: z.string().optional(),
  isDefault: z.boolean().optional(),
}).refine((data) => {
  if (data.addressId && data.addressId !== "new") {
    return true
  }
  return data.title && data.fullName && data.phone && data.address && data.city && data.district
}, {
  message: "Tüm adres alanları doldurulmalıdır",
  path: ["address"],
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutForm({ cart, addresses }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: SHIPPING_METHODS[0].id,
      paymentMethod: PAYMENT_METHODS[0].id,
      addressId: addresses.find((a) => a.isDefault)?.id || "",
    },
  })

  const selectedAddressId = watch("addressId")
  const useExistingAddress = selectedAddressId && selectedAddressId !== "new"

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.variant.price) * item.qty,
    0
  )
  const shippingFee = subtotal >= 500 ? 0 : 0
  const total = subtotal + shippingFee

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)
    try {
      let addressData

      if (useExistingAddress && data.addressId) {
        const selectedAddress = addresses.find((a) => a.id === data.addressId)
        if (selectedAddress) {
          addressData = {
            title: selectedAddress.title,
            fullName: selectedAddress.fullName,
            phone: selectedAddress.phone,
            address: selectedAddress.address,
            city: selectedAddress.city,
            district: selectedAddress.district,
            postalCode: selectedAddress.postalCode || "",
          }
        }
      } else {
        addressData = {
          title: data.title,
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          district: data.district,
          postalCode: data.postalCode || "",
        }
      }

      await createOrder({
        address: addressData,
        shippingMethod: data.shippingMethod,
        paymentMethod: data.paymentMethod,
      })

      toast({
        title: "Sipariş Oluşturuldu",
        description: "Siparişiniz başarıyla oluşturuldu.",
      })

      router.push("/hesabim/siparisler")
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Teslimat Adresi</h2>
          {addresses.length > 0 && (
            <Select {...register("addressId")}>
              <SelectTrigger>
                <SelectValue placeholder="Kayıtlı adres seçin veya yeni adres ekleyin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Yeni Adres Ekle</SelectItem>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.title} - {address.city}, {address.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {!useExistingAddress && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Adres Başlığı</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input id="fullName" {...register("fullName")} />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Adres</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Şehir</Label>
                  <Input id="city" {...register("city")} />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="district">İlçe</Label>
                  <Input id="district" {...register("district")} />
                  {errors.district && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode">Posta Kodu (Opsiyonel)</Label>
                <Input id="postalCode" {...register("postalCode")} />
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Kargo Yöntemi</h2>
          {SHIPPING_METHODS.map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-muted"
            >
              <input
                type="radio"
                value={method.id}
                {...register("shippingMethod")}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <p className="font-semibold">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.days}</p>
              </div>
              <p className="font-semibold">
                {method.fee === 0 ? "Ücretsiz" : formatPrice(method.fee)}
              </p>
            </label>
          ))}
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Ödeme Yöntemi</h2>
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-muted"
            >
              <input
                type="radio"
                value={method.id}
                {...register("paymentMethod")}
                className="w-4 h-4"
              />
              <p className="font-semibold">{method.name}</p>
            </label>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="border rounded-lg p-6 space-y-4 sticky top-4">
          <h2 className="text-xl font-bold">Sipariş Özeti</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Toplam</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "İşleniyor..." : "Siparişi Tamamla"}
          </Button>
        </div>
      </div>
    </form>
  )
}

