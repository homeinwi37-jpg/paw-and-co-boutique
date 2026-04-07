"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8 animate-fade-in">
          Quiet Luxury for Pets
        </p>

        {/* Main Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight mb-8">
          <span className="block">Exzellenz</span>
          <span className="block italic text-accent">neu definiert</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
          Handgefertigte Premium-Produkte fur Ihren vierbeinigen Begleiter. 
          Designed in Germany mit Liebe zum Detail.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="px-10 py-6 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            Kollektion entdecken
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-10 py-6 text-sm tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Unsere Geschichte
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#kollektion" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs tracking-[0.2em] uppercase">Scrollen</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-border/30 rounded-full opacity-50" />
      <div className="absolute bottom-32 right-16 w-20 h-20 border border-border/30 rounded-full opacity-50" />
    </section>
  )
}
