import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

interface LegalLayoutProps {
  title: string
  children: React.ReactNode
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Zuruck zum Shop
          </Link>
          
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">
            {title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
