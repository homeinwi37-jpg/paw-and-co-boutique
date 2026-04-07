"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { getProductsFromStorage, initializeProducts, type Product } from "@/lib/products"

const defaultCategories = ["Alle", "Betten", "Halsbander", "Snacks", "Spielzeug", "Bekleidung", "Napfe"]

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("Alle")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(defaultCategories)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize products from localStorage or defaults
    initializeProducts()
    const loadedProducts = getProductsFromStorage()
    
    // Only show active products
    const activeProducts = loadedProducts.filter(p => p.isActive)
    setProducts(activeProducts)
    
    // Get unique categories from products
    const productCategories = [...new Set(activeProducts.map(p => p.category))]
    setCategories(["Alle", ...productCategories])
    
    setIsLoading(false)
  }, [])

  const filteredProducts = activeCategory === "Alle" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <section id="kollektion" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Exklusive Auswahl
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            Unsere Kollektion
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Jedes Stuck in unserer Kollektion wird mit grosster Sorgfalt ausgewahlt 
            und reprasentiert hochste Qualitatsstandards.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`text-xs tracking-[0.15em] uppercase px-6 py-5 rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:border-foreground hover:bg-transparent"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-muted rounded-lg mb-5" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-1/4" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Keine Produkte in dieser Kategorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-20">
          <Button 
            variant="outline"
            size="lg"
            className="px-12 py-6 text-sm tracking-[0.2em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 rounded-none"
          >
            Alle Produkte ansehen
          </Button>
        </div>
      </div>
    </section>
  )
}
