"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  images?: string[]
  image?: string
  isNew?: boolean
  description?: string
}

export function ProductCard({ id, name, price, originalPrice, category, images, image, isNew, description }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Support both image formats (single image or array)
  const displayImage = images?.[0] || image || ""

  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)

  const formattedOriginalPrice = originalPrice 
    ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(originalPrice)
    : null

  return (
    <Link 
      href={`/produkt/${id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-5">
          <div className="absolute inset-0 bg-foreground/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
          {displayImage && (
            <Image
              src={displayImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          {/* New Badge */}
          {isNew && (
            <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-accent text-accent-foreground text-[10px] tracking-[0.2em] uppercase">
              Neu
            </span>
          )}

          {/* Sale Badge */}
          {originalPrice && originalPrice > price && (
            <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-600 text-white text-[10px] tracking-[0.2em] uppercase">
              Sale
            </span>
          )}

          {/* Quick Add Button */}
          <div className={`absolute bottom-4 right-4 z-20 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Button 
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">In den Warenkorb</span>
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {category}
          </p>
          <h3 className="font-serif text-lg tracking-wide group-hover:text-accent transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {formattedPrice}
            </p>
            {formattedOriginalPrice && (
              <p className="text-sm text-muted-foreground/60 line-through">
                {formattedOriginalPrice}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
