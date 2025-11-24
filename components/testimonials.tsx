import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    author: "Sarah Mitchell",
    role: "Yoga Instructor",
    text: "The energy healing sessions with Lena completely transformed my spiritual practice. I feel more centered and connected than ever before.",
    rating: 5,
  },
  {
    id: 2,
    author: "James Peterson",
    role: "Entrepreneur",
    text: "Elena's spiritual guidance helped me navigate a major life transition. His wisdom and compassion made all the difference.",
    rating: 5,
  },
  {
    id: 3,
    author: "Elena Rossi",
    role: "Therapist",
    text: "Lena's meditation sessions are incredibly effective. I recommend her to all my clients seeking inner peace.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear from those who have experienced profound transformation through our healing services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 text-pretty">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
