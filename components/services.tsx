import { Heart, Brain, Sparkles, Moon } from "lucide-react"

const services = [
  {
    icon: Heart,
    name: "Energy Healing",
    description: "Balance your chakras and release blocked energy. Reiki and energy work to restore vitality.",
    color: "text-red-500",
  },
  {
    icon: Brain,
    name: "Spiritual Guidance",
    description: "Navigate life transitions with wisdom. One-on-one counseling for clarity and direction.",
    color: "text-purple-500",
  },
  {
    icon: Sparkles,
    name: "Aura Cleansing",
    description: "Clear negative energy and revitalize your spiritual essence. Chakra alignment sessions.",
    color: "text-amber-500",
  },
  {
    icon: Moon,
    name: "Meditation & Mindfulness",
    description: "Guided practices for deeper peace. Meditation sessions tailored to your needs.",
    color: "text-blue-500",
  },{
    icon: Moon,
    name: "Metaphorical cards",
    description: "Can be a versatile and effective tool for enhancing communication, promoting self-expression, and supporting the therapeutic process.",
    color: "text-blue-500",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover our range of spiritual healing services designed to nurture your body, mind, and soul.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary transition-all hover:shadow-lg"
              >
                <Icon className={`${service.color} w-12 h-12 mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-foreground/70 text-sm">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
