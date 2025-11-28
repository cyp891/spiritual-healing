"use client"

import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Book Now", href: "#booking" },
    { label: "About", href: "#practitioners" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-bold">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Spiritual Healing</h1>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg border border-accent/20">
            <Globe size={16} className="text-accent" />
            <span className="text-sm text-foreground/70">We speak: German, English, Russian, Ukrainian, Greek</span>
          </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
          {/* <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button> */}
          {/* <LanguageSwitcher /> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            {/* <button className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button> */}
            {/* <LanguageSwitcher /> */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg border border-accent/20">
            <Globe size={16} className="text-accent" />
            <span className="text-sm text-foreground/70">We speak: German, English, Russian, Ukrainian, Greek</span>
          </div>
          </div>
        </div>
      )}
    </header>
  )
}
