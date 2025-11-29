"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How do I choose between phone, WhatsApp, Email and Zoom sessions?",
    answer:
      "Each method offers unique benefits. Phone is great for focused conversations, WhatsApp provides a more personal touch, and Zoom allows for video sessions with visual connection. Choose based on your comfort level and internet availability.",
  },
  {
    id: 2,
    question: "What should I expect during my first session?",
    answer:
      "Your first session is an introduction. We'll discuss your goals, what brought you to seek healing, and your practitioner will explain their approach. This helps create a personalized experience for your needs.",
  },
  {
    id: 3,
    question: "Are sessions confidential?",
    answer:
      "Absolutely. All client information and session content is kept completely confidential. We follow strict privacy protocols to ensure your comfort and trust.",
  },
  {
    id: 4,
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes. You can reschedule or cancel up to 24 hours before your session with no penalty. A cancellation link will be provided in your confirmation email.",
  },
  {
    id: 5,
    question: "How often should I have sessions?",
    answer:
      "This depends on your personal goals. Some clients benefit from weekly sessions, while others prefer monthly. Your practitioner will recommend a schedule based on your needs.",
  },
  {
    id: 6,
    question: "Do you offer package deals?",
    answer:
      "Yes! We offer discounted packages for 5, 10, or monthly unlimited sessions. Contact us for more details about our package pricing.",
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground/70">
            Find answers to common questions about our services and booking process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors text-left"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 transition-transform ${openId === faq.id ? "rotate-180" : ""}`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-6 pt-0 text-foreground/80 border-t border-border">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
