"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    number: "01",
    title: "Handwerkskunst",
    description: "Jedes Produkt wird von Meisterhandwerkern in Deutschland gefertigt, mit traditionellen Techniken und modernster Prazision."
  },
  {
    number: "02",
    title: "Nachhaltigkeit",
    description: "Wir verwenden ausschliesslich umweltfreundliche Materialien und setzen auf nachhaltige Produktionsprozesse."
  },
  {
    number: "03",
    title: "Komfort",
    description: "Das Wohlbefinden Ihres Tieres steht im Mittelpunkt unserer Designs. Maximaler Komfort ohne Kompromisse."
  }
]

export function PhilosophySection() {
  return (
    <section id="philosophie" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
              Unsere Philosophie
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
              Luxus mit
              <br />
              <span className="italic text-accent">Verantwortung</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Wir glauben, dass wahre Eleganz in der Qualitat liegt. 
              Unsere Produkte vereinen zeitloses Design mit aussergewohnlicher Funktionalitat.
            </p>
            <Button 
              variant="outline"
              className="group px-8 py-6 text-sm tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 rounded-none"
            >
              Mehr erfahren
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-12">
            {values.map((value, index) => (
              <div 
                key={value.number}
                className="group border-t border-border pt-8 hover:border-accent transition-colors duration-300"
              >
                <div className="flex gap-6">
                  <span className="text-xs tracking-[0.2em] text-accent font-medium">
                    {value.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-wide mb-4 group-hover:text-accent transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
