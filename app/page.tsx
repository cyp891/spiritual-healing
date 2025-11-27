"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Practitioners from "@/components/practitioners"
import BookingSystem from "@/components/booking-system"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import Calendly from "../components/calendly"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Practitioners />
      <BookingSystem />
      {/* <Calendly /> */}
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  )
}
