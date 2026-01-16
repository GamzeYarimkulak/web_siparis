# Commit Stratejisi Önerisi

Bu proje zaman içinde geliştirilmiş bir demo olduğu için, commit mesajları da bu süreci yansıtmalı. İşte önerilen commit mesaj formatları:

## Commit Mesaj Formatı

```
<type>: <subject>

[optional body]
```

## Commit Tipleri

- `feat`: Yeni özellik ekleme
- `fix`: Hata düzeltme
- `refactor`: Kod refaktoring (işlevsellik değişmiyor)
- `docs`: Dokümantasyon değişiklikleri
- `style`: Formatting, noktalama vb. (kod değişmiyor)
- `chore`: Build, config, dependency güncellemeleri

## Örnek Commit Mesajları

### İlk Kurulum
```
feat: initial project setup with Next.js and Prisma
feat: add basic project structure and dependencies
feat: setup PostgreSQL with Docker
feat: configure Prisma schema and migrations
```

### Public Storefront
```
feat: add public storefront layout with header and footer
feat: implement home page with hero and categories
feat: add category listing page with basic filtering
feat: add product detail page with variant selection
feat: implement search functionality
feat: add shopping cart with quantity updates
feat: implement checkout flow with address management
feat: add user account pages (orders, addresses)
```

### Authentication
```
feat: setup NextAuth with credentials provider
feat: implement login and registration pages
feat: add role-based access control (ADMIN, STAFF, USER)
feat: add protected routes and auth guards
```

### Admin Panel
```
feat: add admin layout with sidebar navigation
feat: implement admin dashboard with basic stats
feat: add product management page (list view)
feat: add order management with status updates
feat: add stock management view
feat: add customer list page
```

### Server Actions & Data
```
feat: implement cart server actions
feat: add order creation and management
feat: implement product search and filtering
feat: add stock movement tracking
```

### UI/UX İyileştirmeleri
```
refactor: improve UI components and styling
refactor: enhance product card design
refactor: improve checkout form UX
refactor: add loading states and error handling
refactor: improve responsive design
```

### Düzeltmeler
```
fix: fix stock status calculation in product card
fix: resolve cart item update issue
fix: fix order status update bug
fix: resolve authentication redirect issue
fix: fix category slug routing
```

### Dokümantasyon
```
docs: update README with project background
docs: add known limitations section
docs: add design decisions documentation
docs: add commit strategy guide
docs: update installation instructions
```

### Seed Data & Testing
```
feat: add seed script with sample data
feat: create test users (admin, staff, customer)
feat: add sample products and categories
```

## Commit Mesajı Örnekleri (Gerçekçi Senaryolar)

```
feat: initial project setup with Next.js and Prisma

- Setup Next.js 14 with App Router
- Configure Prisma with PostgreSQL
- Add basic folder structure
- Setup TailwindCSS and shadcn/ui
```

```
feat: add public storefront pages (home, category, product)

- Implement home page with hero section
- Add category listing with basic pagination
- Create product detail page with variants
- Add basic search functionality
```

```
feat: add admin layout and sidebar navigation

- Create admin layout component
- Add sidebar with menu items
- Implement role-based route protection
- Add admin dashboard placeholder
```

```
feat: implement basic cart and checkout flow

- Add cart server actions (add, update, remove)
- Implement checkout form with address management
- Add order creation with stock deduction
- Create order confirmation flow
```

```
feat: add order management and status updates

- Create order list page in admin panel
- Add order detail view
- Implement order status update functionality
- Add order filtering (planned)
```

```
refactor: improve UI components and styling

- Enhance product card design
- Improve checkout form UX
- Add better loading states
- Fix responsive layout issues
```

```
fix: fix stock status calculation

- Correct low stock threshold logic
- Fix stock badge display
- Update stock status in product cards
```

## Best Practices

1. **Kısa ve açıklayıcı**: Commit mesajı ne yapıldığını net bir şekilde anlatmalı
2. **Tek bir değişiklik**: Her commit tek bir mantıksal değişiklik içermeli
3. **Geçmiş zaman kullanmayın**: "Added feature" yerine "Add feature"
4. **İlk satır 50 karakteri geçmemeli**: Uzun açıklamalar body'de olmalı
5. **Body kullanın**: Karmaşık değişiklikler için detaylı açıklama ekleyin

## Örnek Git Workflow

```bash
# Feature branch oluştur
git checkout -b feat/add-product-management

# Değişiklikleri yap ve commit et
git add .
git commit -m "feat: add product management page (list view)"

# Daha fazla değişiklik
git add .
git commit -m "refactor: improve product table styling"

# Main branch'e merge et
git checkout main
git merge feat/add-product-management
```

Bu commit stratejisi, projenin zaman içinde nasıl geliştiğini takip etmeyi kolaylaştırır ve gelecekteki geliştirmeler için rehberlik sağlar.

