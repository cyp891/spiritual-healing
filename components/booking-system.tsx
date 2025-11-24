"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"

const services = [
  { id: 1, name: "Energy Healing (60 min)", duration: 60, price: 0 },
  { id: 2, name: "Spiritual Guidance (45 min)", duration: 45, price: 90 },
  { id: 3, name: "Aura Cleansing (30 min)", duration: 30, price: 60 },
  { id: 4, name: "Meditation Session (30 min)", duration: 30, price: 50 },
]

const practitioners = [
  { id: 1, name: "Lena" },
  { id: 2, name: "Lena Elena" },
  { id: 3, name: "Elena" },
]

const sessionTypes = [
  { id: "phone", name: "Phone Call", icon: "☎️" },
  { id: "viber", name: "Viber", icon: "💬" },
  { id: "zoom", name: "Zoom Video", icon: "📹" },
]

export default function BookingSystem() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    practitioner: "",
    date: "",
    time: "",
    sessionType: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Submitting booking:", formData)
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("[v0] Booking email sent successfully")
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setStep(1)
          setFormData({
            service: "",
            practitioner: "",
            date: "",
            time: "",
            sessionType: "",
            name: "",
            email: "",
            phone: "",
            notes: "",
          })
        }, 4000)
      } else {
        console.error("[v0] Failed to send email:", result.message)
        setError(result.message)
      }
    } catch (err) {
      console.error("[v0] Error submitting booking:", err)
      setError("Failed to submit booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="booking" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Session</h2>
          <p className="text-lg text-foreground/70">
            Simple and secure booking process. Choose your service, practitioner, and preferred communication channel.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed! ✨</h3>
            <p className="text-foreground/80">
              Thank you for booking. A confirmation email has been sent to <strong>{formData.email}</strong> with
              session details and connection information.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-background border-2 border-border rounded-xl p-8 space-y-6">
            {error && <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 text-red-600">{error}</div>}

            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 ${s <= step ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${s <= step ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {s}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Step {s}</span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <span>Select Service</span>
                  </span>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - €{s.price}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <span>Choose Practitioner</span>
                  </span>
                  <select
                    name="practitioner"
                    value={formData.practitioner}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a practitioner...</option>
                    {practitioners.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Preferred Date</span>
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <Clock size={18} />
                    <span>Preferred Time</span>
                  </span>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <div className="space-y-3">
                  <label className="font-semibold flex items-center gap-2">
                    <Phone size={18} />
                    <span>Communication Channel</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {sessionTypes.map((type) => (
                      <label key={type.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="sessionType"
                          value={type.id}
                          checked={formData.sessionType === type.id}
                          onChange={handleInputChange}
                          required
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            formData.sessionType === type.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="text-sm font-medium">{type.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <User size={18} />
                    <span>Full Name</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <Mail size={18} />
                    <span>Email Address</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold mb-3 flex items-center gap-2">
                    <Phone size={18} />
                    <span>Phone Number</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+30 (694) 123-4567"
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="block">
                  <span className="font-semibold mb-3">Special Requests or Notes</span>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any specific areas you'd like to focus on..."
                    rows={4}
                    className="w-full bg-input text-foreground border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </label>
              </div>
            )}

            <div className="flex justify-between gap-4 pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={isLoading}
                  className="flex-1 bg-muted text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && (!formData.service || !formData.practitioner)) return
                    if (step === 2 && (!formData.date || !formData.time || !formData.sessionType)) return
                    setStep(step + 1)
                  }}
                  disabled={isLoading}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Confirm Booking"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
