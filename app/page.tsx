import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeSection } from "@/components/marquee-section"
import { ProductsSection } from "@/components/products-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ProductsSection />
      <PhilosophySection />
      <AboutSection />
      <Footer />
    </main>
  )
}
