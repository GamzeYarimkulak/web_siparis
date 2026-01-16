# E-Ticaret Platformu - Demo Proje

Bu proje, modern web teknolojileriyle e-ticaret uygulaması geliştirme sürecini öğrenmek ve pratik yapmak amacıyla geliştirilmiş bir demo uygulamadır. Zaman içinde adım adım geliştirilmiş, öğrenme odaklı bir prototiptir.

## Proje Arka Planı

Bu proje, şu amaçlarla geliştirildi:
- Next.js App Router ile modern React uygulaması geliştirme deneyimi kazanmak
- Server Actions, Prisma ve PostgreSQL ile full-stack geliştirme pratiği
- E-ticaret domain'inde temel iş akışlarını (ürün, sipariş, stok) anlamak
- TypeScript, form validasyonu ve role-based authentication gibi konularda deneyim edinmek

Bu bir öğrenme projesidir ve production kullanımı için tasarlanmamıştır.

## Özellikler

### Public Storefront (Müşteri Tarafı)

- **Anasayfa**: Hero bölümü, kampanya alanı, kategori listesi, çok satanlar bölümü
- **Kategori Sayfaları**: Temel filtreleme, sıralama, sayfalama
- **Ürün Detay**: Ürün görselleri, varyant seçimi, stok durumu gösterimi
- **Arama**: Basit arama fonksiyonu (gelişmiş filtreleme planlanıyor)
- **Sepet**: Ürün ekleme, miktar güncelleme, stok kontrolü
- **Checkout**: Adres yönetimi, kargo seçimi, **ödeme simülasyonu** (gerçek ödeme entegrasyonu yok)
- **Hesabım**: Sipariş geçmişi görüntüleme, adres yönetimi (temel seviye)

### Admin Panel

- **Dashboard**: Temel metrikler ve istatistikler (mock/placeholder veriler)
- **Ürün Yönetimi**: Ürün listesi görüntüleme (CRUD işlemleri temel seviye)
- **Sipariş Yönetimi**: Sipariş listesi, detay görüntüleme, durum güncelleme
- **Stok Yönetimi**: Stok durumu görüntüleme (stok hareketleri sayfası planlanıyor)
- **Müşteri Yönetimi**: Müşteri listesi görüntüleme (detay sayfası planlanıyor)

## Teknoloji Seçimleri

### Neden Next.js?

Next.js App Router seçildi çünkü:
- Server Components ile performanslı sayfa render'ı
- Server Actions ile API route'lara ihtiyaç duymadan server-side işlemler
- Dosya tabanlı routing ile organize kod yapısı
- TypeScript desteği ve güçlü developer experience

### Neden App Router?

Pages Router yerine App Router tercih edildi çünkü:
- React Server Components desteği
- Daha iyi data fetching pattern'leri
- Layout'lar ve loading state'leri için daha iyi API
- Next.js'in gelecek odaklı yaklaşımı

### Neden Prisma?

Prisma seçildi çünkü:
- Type-safe database client
- Migration yönetimi kolaylığı
- Schema-first yaklaşım
- Güçlü TypeScript desteği

### Neden shadcn/ui?

shadcn/ui tercih edildi çünkü:
- Copy-paste yaklaşımı ile tam kontrol
- Radix UI tabanlı erişilebilir bileşenler
- TailwindCSS ile kolay özelleştirme
- Production-ready bileşenler

## Bilinen Sınırlamalar

Bu proje bir demo/öğrenme projesi olduğu için bazı özellikler bilinçli olarak eksik bırakılmıştır:

- **Ödeme Entegrasyonu**: Gerçek ödeme gateway'i yok, sadece simülasyon
- **E-posta Bildirimleri**: Sipariş onayı, kargo takip gibi e-postalar gönderilmiyor
- **Görsel Yükleme**: Ürün görselleri için sadece URL desteği var, dosya upload yok
- **Gelişmiş Filtreleme**: Kategori sayfalarında marka, fiyat aralığı gibi filtreler eksik
- **Bulk İşlemler**: Admin panelde toplu işlemler (silme, güncelleme) yok
- **Export/Import**: Veri dışa/içe aktarma özellikleri yok
- **Arama Autocomplete**: Arama sayfasında otomatik tamamlama yok
- **Favoriler**: Favori ekleme/çıkarma UI'ı var ama sayfa eksik
- **Stok Hareketleri**: Stok giriş/çıkış kayıtları görüntülenemiyor
- **Raporlama**: Dashboard'da grafikler ve detaylı raporlar yok

## İyileştirme Önerileri

Eğer bu projeyi geliştirmeye devam etmek isterseniz, şu özellikler eklenebilir:

### Kısa Vadeli
- [ ] Ürün görseli yükleme (file upload)
- [ ] Favoriler sayfası
- [ ] Stok hareketleri görüntüleme
- [ ] Gelişmiş kategori filtreleme
- [ ] Arama autocomplete

### Orta Vadeli
- [ ] Gerçek ödeme entegrasyonu (iyzico, PayTR vb.)
- [ ] E-posta bildirimleri (Resend, SendGrid)
- [ ] Admin panelde ürün CRUD formları
- [ ] Bulk işlemler (toplu silme, durum güncelleme)
- [ ] Müşteri detay sayfası

### Uzun Vadeli
- [ ] Dashboard grafikleri (Chart.js, Recharts)
- [ ] Veri export/import (Excel, CSV)
- [ ] Çoklu dil desteği (i18n)
- [ ] Kargo entegrasyonu (Yurtiçi Kargo, Aras Kargo API)
- [ ] Redis cache katmanı
- [ ] Image optimization (Next.js Image + CDN)

## Kurulum

### Gereksinimler

- Node.js 18 veya üzeri
- Docker (PostgreSQL için)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın veya indirin**

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **PostgreSQL'i başlatın (Docker ile)**
   ```bash
   docker-compose up -d
   ```

4. **Environment değişkenlerini ayarlayın**
   
   `.env` dosyası oluşturun:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   NODE_ENV="development"
   ```

   `NEXTAUTH_SECRET` için güvenli bir değer oluşturun:
   ```bash
   openssl rand -base64 32
   ```

5. **Prisma'yı yapılandırın**
   ```bash
   npm run db:generate
   npm run db:push
   ```

6. **Seed data'yı yükleyin**
   ```bash
   npm run db:seed
   ```

7. **Development server'ı başlatın**
   ```bash
   npm run dev
   ```

8. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## Test Hesapları

Seed script çalıştırıldıktan sonra şu hesaplar oluşturulur:

- **Admin**: admin@example.com / password123
- **Staff**: staff@example.com / password123
- **Müşteri**: user@example.com / password123

## Proje Yapısı

```
/
├── app/                    # Next.js App Router sayfaları
│   ├── (public)/          # Müşteri tarafı sayfaları
│   ├── (auth)/            # Giriş/kayıt sayfaları
│   ├── admin/             # Admin panel
│   └── api/               # API routes (NextAuth)
├── components/            # React bileşenleri
│   ├── ui/               # shadcn/ui bileşenleri
│   ├── layout/            # Layout bileşenleri
│   ├── product/          # Ürün bileşenleri
│   ├── cart/             # Sepet bileşenleri
│   ├── checkout/         # Checkout bileşenleri
│   └── admin/            # Admin bileşenleri
├── lib/                   # Utility fonksiyonları
├── server-actions/        # Server actions
├── prisma/               # Prisma schema ve seed
└── public/               # Statik dosyalar
```

## Veritabanı İşlemleri

### Migration oluşturma
```bash
npm run db:migrate
```

### Prisma Studio (Veritabanı görüntüleme)
```bash
npm run db:studio
```

### Seed data'yı yeniden yükleme
```bash
npm run db:seed
```

## Commit Stratejisi

Bu proje zaman içinde geliştirilmiş bir demo olduğu için, commit mesajları da bu süreci yansıtmalı. Detaylı commit stratejisi ve örnek mesajlar için `COMMIT_STRATEGY.md` dosyasına bakabilirsiniz.

Kısa özet:
- `feat:` - Yeni özellik ekleme
- `fix:` - Hata düzeltme
- `refactor:` - Kod iyileştirme
- `docs:` - Dokümantasyon güncellemeleri

## Notlar

- Bu proje **eğitim ve öğrenme amaçlıdır**
- Production kullanımı için tasarlanmamıştır
- Güvenlik açıkları olabilir, production'da kullanmadan önce güvenlik audit'i yapın
- Performans optimizasyonları yapılmamıştır (image optimization, caching vb.)

## Lisans

Bu proje eğitim amaçlıdır ve özgürce kullanılabilir.
