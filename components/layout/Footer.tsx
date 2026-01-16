import Link from "next/link"
import { Truck, RotateCcw, Headphones, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Hakkımızda</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/hakkimizda" className="hover:text-foreground">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-foreground">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/kariyer" className="hover:text-foreground">
                  Kariyer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sss" className="hover:text-foreground">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/iade-degisim" className="hover:text-foreground">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link href="/kargo" className="hover:text-foreground">
                  Kargo ve Teslimat
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/gizlilik" className="hover:text-foreground">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="hover:text-foreground">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis" className="hover:text-foreground">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Güven</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Kolay İade</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Headphones className="h-5 w-5 text-primary" />
                <span>7/24 Destek</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Güvenli Ödeme</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-Ticaret Platformu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

