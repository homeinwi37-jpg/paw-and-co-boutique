"use client"

import Image from "next/image"
import { Quote } from "lucide-react"

export function AboutSection() {
  return (
    <section id="uber-uns" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Unsere Geschichte
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Uber Paw & Co.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=1000&fit=crop"
              alt="Premium Pet Products"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Paw & Co. wurde 2020 in Munchen gegrundet mit einer klaren Vision: 
              Premium-Produkte fur Haustiere zu kreieren, die hochste Qualitatsanspruche erfullen 
              und gleichzeitig asthetisch anspruchsvoll sind.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Unser Team aus erfahrenen Designern und Handwerkern arbeitet eng mit 
              Veterinaren zusammen, um Produkte zu entwickeln, die nicht nur schon aussehen, 
              sondern auch das Wohlbefinden Ihrer Tiere fordern.
            </p>
            <div className="flex items-center gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <span className="block font-serif text-4xl mb-1">5000+</span>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Zufriedene Kunden</span>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <span className="block font-serif text-4xl mb-1">100%</span>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Nachhaltig</span>
              </div>
              <div className="w-px h-16 bg-border" />
              <div className="text-center">
                <span className="block font-serif text-4xl mb-1">DE</span>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Made in Germany</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="h-8 w-8 mx-auto mb-6 text-accent" />
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-6">
            {"\"Die Qualitat der Produkte von Paw & Co. ist unubertroffen. Mein Hund liebt sein neues Bett und ich liebe das elegante Design.\""}
          </blockquote>
          <cite className="not-italic">
            <span className="block text-sm tracking-[0.2em] uppercase">Maria S.</span>
            <span className="text-xs text-muted-foreground">Verifizierte Kundin aus Berlin</span>
          </cite>
        </div>
      </div>
    </section>
  )
}
