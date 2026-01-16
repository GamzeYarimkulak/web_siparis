# E-Ticaret Web Uygulaması - Proje Planı

## Genel Bakış
Modern, profesyonel B2B/B2C e-ticaret platformu. Ürün/sipariş/stok yönetimi içeren tam özellikli MVP.

## Teknoloji Stack
- **Framework**: Next.js 14+ (App Router)
- **Dil**: TypeScript
- **Styling**: TailwindCSS
- **UI Bileşenleri**: shadcn/ui
- **Database**: PostgreSQL (Docker)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Credentials + Role-based)
- **Form Yönetimi**: react-hook-form + zod
- **İkonlar**: lucide-react

## Dosya Ağacı

```
/
├── app/
│   ├── (public)/                    # Public storefront routes
│   │   ├── layout.tsx              # Public layout (header, footer)
│   │   ├── page.tsx                # Anasayfa
│   │   ├── kategori/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Kategori sayfası
│   │   ├── urun/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Ürün detay
│   │   ├── arama/
│   │   │   └── page.tsx            # Arama sonuçları
│   │   ├── sepet/
│   │   │   └── page.tsx            # Sepet
│   │   ├── odeme/
│   │   │   └── page.tsx            # Checkout
│   │   └── hesabim/
│   │       ├── layout.tsx          # Hesabım layout
│   │       ├── page.tsx            # Profil
│   │       ├── siparisler/
│   │       │   └── page.tsx        # Sipariş listesi
│   │       └── adresler/
│   │           └── page.tsx        # Adres yönetimi
│   │
│   ├── (auth)/                      # Auth routes
│   │   ├── giris/
│   │   │   └── page.tsx
│   │   └── kayit/
│   │       └── page.tsx
│   │
│   ├── admin/                       # Admin panel (protected)
│   │   ├── layout.tsx              # Admin layout (sidebar)
│   │   ├── page.tsx                # Dashboard
│   │   ├── products/
│   │   │   ├── page.tsx            # Ürün listesi
│   │   │   ├── yeni/
│   │   │   │   └── page.tsx        # Yeni ürün
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Ürün düzenle
│   │   ├── orders/
│   │   │   ├── page.tsx            # Sipariş listesi
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Sipariş detay
│   │   ├── stock/
│   │   │   ├── page.tsx            # Stok yönetimi
│   │   │   └── hareketler/
│   │   │       └── page.tsx        # Stok hareketleri
│   │   └── customers/
│   │       └── page.tsx            # Müşteri yönetimi
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts        # NextAuth handler
│   │   ├── favorites/
│   │   │   └── route.ts            # Favori API
│   │   └── cart/
│   │       └── route.ts            # Sepet API
│   │
│   └── layout.tsx                   # Root layout
│
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx              # Public header
│   │   ├── Footer.tsx              # Footer
│   │   ├── AnnouncementBar.tsx     # Üst duyuru bandı
│   │   ├── CategoryMenu.tsx        # Mega menü
│   │   └── AdminSidebar.tsx        # Admin sidebar
│   │
│   ├── product/
│   │   ├── ProductCard.tsx         # Ürün kartı
│   │   ├── ProductGallery.tsx      # Ürün galerisi
│   │   ├── VariantSelector.tsx     # Varyant seçici
│   │   ├── StockBadge.tsx          # Stok durumu badge
│   │   └── RelatedProducts.tsx     # Benzer ürünler
│   │
│   ├── cart/
│   │   ├── CartItem.tsx            # Sepet öğesi
│   │   ├── CartSummary.tsx         # Sepet özeti
│   │   └── MiniCart.tsx            # Mini sepet dropdown
│   │
│   ├── checkout/
│   │   ├── AddressForm.tsx         # Adres formu
│   │   ├── ShippingMethod.tsx      # Kargo seçimi
│   │   └── PaymentMethod.tsx       # Ödeme yöntemi
│   │
│   ├── admin/
│   │   ├── ProductForm.tsx         # Ürün formu
│   │   ├── OrderStatusBadge.tsx    # Sipariş durumu
│   │   ├── StockMovementForm.tsx   # Stok hareket formu
│   │   └── StatsCard.tsx           # Dashboard istatistik kartı
│   │
│   └── shared/
│       ├── EmptyState.tsx           # Boş durum
│       ├── LoadingSpinner.tsx       # Yükleme
│       ├── SearchBar.tsx            # Arama çubuğu
│       └── Pagination.tsx           # Sayfalama
│
├── lib/
│   ├── prisma.ts                    # Prisma client
│   ├── auth.ts                      # Auth utilities
│   ├── utils.ts                     # Utility functions
│   ├── validations.ts               # Zod schemas
│   └── constants.ts                 # Sabitler
│
├── server-actions/
│   ├── products.ts                  # Ürün actions
│   ├── cart.ts                      # Sepet actions
│   ├── orders.ts                    # Sipariş actions
│   ├── favorites.ts                 # Favori actions
│   └── admin/
│       ├── products.ts              # Admin ürün actions
│       ├── orders.ts               # Admin sipariş actions
│       └── stock.ts                # Stok actions
│
├── prisma/
│   ├── schema.prisma                # Prisma schema
│   └── seed.ts                      # Seed script
│
├── public/
│   └── images/                      # Statik görseller
│
├── .env.example
├── .gitignore
├── docker-compose.yml               # PostgreSQL container
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md

```

## Veri Modeli (Prisma Schema)

### User
- id, name, email, passwordHash, role (USER | ADMIN | STAFF)
- createdAt, updatedAt

### Category
- id, name, slug, parentId (nullable), order
- createdAt, updatedAt

### Brand
- id, name, slug
- createdAt, updatedAt

### Product
- id, name, slug, description, brandId, categoryId
- status (ACTIVE | INACTIVE)
- createdAt, updatedAt

### ProductImage
- id, productId, url, alt, order

### Variant
- id, productId, sku, barcode, name, price, cost
- stock, lowStockThreshold

### Cart
- id, userId

### CartItem
- id, cartId, variantId, qty

### Order
- id, userId, status, subtotal, shippingFee, total
- addressSnapshot (JSON), createdAt, updatedAt

### OrderItem
- id, orderId, variantId, nameSnapshot, priceSnapshot, qty

### StockMovement
- id, variantId, type (IN | OUT | ADJUST)
- qty, reason, createdAt, orderId (nullable)

## Özellikler

### Public Storefront
1. **Anasayfa**: Hero, kampanya, kategoriler, çok satanlar, güven öğeleri
2. **Kategori**: Filtre, sıralama, pagination
3. **Ürün Detay**: Galeri, varyantlar, stok, benzer ürünler
4. **Arama**: Autocomplete, sonuç sayfası
5. **Favoriler**: Kullanıcı bazlı
6. **Sepet**: Miktar güncelleme, stok kontrolü
7. **Checkout**: Adres, kargo, ödeme simülasyonu
8. **Hesabım**: Siparişler, adresler, profil

### Admin Panel
1. **Dashboard**: İstatistikler, grafikler
2. **Ürün Yönetimi**: CRUD, foto, varyantlar
3. **Stok Yönetimi**: Stok giriş/çıkış, hareketler
4. **Sipariş Yönetimi**: Durum güncelleme, detay
5. **Müşteri Yönetimi**: Liste, sipariş geçmişi

## Güvenlik
- Server-side auth check
- Admin route guard (middleware)
- Role-based access control (ADMIN, STAFF, USER)
- Input validation (zod)
- SQL injection koruması (Prisma)

## Seed Data
- 6 ana kategori + 18 alt kategori
- 4 marka
- 30 ürün (1-3 varyant)
- Test kullanıcıları (USER, ADMIN, STAFF)

