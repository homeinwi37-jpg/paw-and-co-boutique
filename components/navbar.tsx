"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-wide font-medium">
            Paw & Co.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="#kollektion" 
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Kollektion
            </Link>
            <Link 
              href="#philosophie" 
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Philosophie
            </Link>
            <Link 
              href="#uber-uns" 
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Uber uns
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Suchen</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Warenkorb</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-medium flex items-center justify-center text-accent-foreground">
                0
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu offnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] bg-background">
                <div className="flex flex-col gap-8 mt-12">
                  <Link 
                    href="#kollektion" 
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl tracking-wide hover:text-accent transition-colors"
                  >
                    Kollektion
                  </Link>
                  <Link 
                    href="#philosophie" 
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl tracking-wide hover:text-accent transition-colors"
                  >
                    Philosophie
                  </Link>
                  <Link 
                    href="#uber-uns" 
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl tracking-wide hover:text-accent transition-colors"
                  >
                    Uber uns
                  </Link>
                  <Link 
                    href="/impressum" 
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl tracking-wide hover:text-accent transition-colors"
                  >
                    Rechtliches
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
