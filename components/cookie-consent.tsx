"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setIsVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-background border-t shadow-xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Mit der Nutzung unserer Website stimmen Sie unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>Ablehnen</Button>
              <Button size="sm" onClick={handleAccept}>Akzeptieren</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}