export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standart Kargo', fee: 0, days: '3-5 iş günü' },
  { id: 'express', name: 'Hızlı Kargo', fee: 50, days: '1-2 iş günü' },
] as const

export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Kapıda Ödeme' },
  { id: 'transfer', name: 'Havale/EFT' },
] as const

export const ORDER_STATUS_LABELS = {
  PENDING: 'Beklemede',
  CONFIRMED: 'Onaylandı',
  SHIPPED: 'Kargoya Verildi',
  DELIVERED: 'Teslim Edildi',
  CANCELLED: 'İptal Edildi',
  REFUNDED: 'İade Edildi',
} as const

export const STOCK_STATUS = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
} as const

