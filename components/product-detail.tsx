"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  specs: string[]
  images: string[]
  isNew?: boolean
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(product.price)

  return (
    <section className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link 
          href="/#kollektion" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Zuruck zur Kollektion
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-accent text-accent-foreground text-[10px] tracking-[0.2em] uppercase">
                  Neu
                </span>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 overflow-hidden bg-secondary transition-all ${
                      selectedImage === index 
                        ? "ring-2 ring-foreground" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Bild ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              {product.category}
            </p>
            
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">
              {product.name}
            </h1>
            
            <p className="text-2xl mb-8">
              {formattedPrice}
              <span className="text-sm text-muted-foreground ml-2">inkl. MwSt.</span>
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm tracking-[0.15em] uppercase">Menge</span>
              <div className="flex items-center border border-border">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-12 w-12 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-12 w-12 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button 
              size="lg"
              className="w-full py-7 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-none mb-4"
            >
              <ShoppingBag className="h-4 w-4 mr-3" />
              In den Warenkorb
            </Button>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10">
              <Truck className="h-4 w-4" />
              <span>Kostenloser Versand ab 100 EUR</span>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-10">
              <h3 className="text-xs tracking-[0.2em] uppercase mb-6">
                Produktdetails
              </h3>
              <ul className="space-y-3">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-border">
              <div className="text-center">
                <span className="block text-xs tracking-[0.15em] uppercase text-muted-foreground">Qualitat</span>
                <span className="block font-serif text-lg mt-1">Premium</span>
              </div>
              <div className="text-center">
                <span className="block text-xs tracking-[0.15em] uppercase text-muted-foreground">Ruckgabe</span>
                <span className="block font-serif text-lg mt-1">14 Tage</span>
              </div>
              <div className="text-center">
                <span className="block text-xs tracking-[0.15em] uppercase text-muted-foreground">Herkunft</span>
                <span className="block font-serif text-lg mt-1">Germany</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
