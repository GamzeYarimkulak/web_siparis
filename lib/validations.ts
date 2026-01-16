import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export const addressSchema = z.object({
  title: z.string().min(2, 'Başlık en az 2 karakter olmalıdır'),
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Telefon numarası geçerli değil'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z.string().min(2, 'Şehir seçiniz'),
  district: z.string().min(2, 'İlçe seçiniz'),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Ürün adı en az 2 karakter olmalıdır'),
  description: z.string().optional(),
  brandId: z.string().min(1, 'Marka seçiniz'),
  categoryId: z.string().min(1, 'Kategori seçiniz'),
  status: z.enum(['ACTIVE', 'INACTIVE']),
})

export const variantSchema = z.object({
  sku: z.string().min(1, 'SKU gereklidir'),
  barcode: z.string().optional(),
  name: z.string().min(1, 'Varyant adı gereklidir'),
  price: z.number().min(0, 'Fiyat 0 veya daha büyük olmalıdır'),
  cost: z.number().min(0, 'Maliyet 0 veya daha büyük olmalıdır'),
  stock: z.number().int().min(0, 'Stok 0 veya daha büyük olmalıdır'),
  lowStockThreshold: z.number().int().min(0).default(10),
})

export const stockMovementSchema = z.object({
  variantId: z.string().min(1, 'Varyant seçiniz'),
  type: z.enum(['IN', 'OUT', 'ADJUST']),
  qty: z.number().int().min(1, 'Miktar 1 veya daha büyük olmalıdır'),
  reason: z.string().optional(),
})

