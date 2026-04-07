import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4">
                Bleiben Sie informiert
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                Erhalten Sie exklusive Angebote, Neuigkeiten und Einblicke in unsere neuesten Kollektionen.
              </p>
            </div>
            <form className="flex gap-4">
              <Input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 bg-transparent border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground rounded-none h-14"
              />
              <Button 
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-none h-14 px-8"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Abonnieren</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-wide mb-6 block">
              Paw & Co.
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Premium Tierbedarf
              <br />
              Designed in Germany
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#kollektion" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Alle Produkte
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Betten
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Halsbander
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Service</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Versand & Lieferung
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Ruckgabe
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-6">Rechtliches</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/impressum" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              &copy; {new Date().getFullYear()} Paw & Co. Boutique. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-primary-foreground/50">Sichere Zahlung mit</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium">PayPal</span>
                <span className="text-xs font-medium">Visa</span>
                <span className="text-xs font-medium">Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
