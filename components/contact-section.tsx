import { Phone, Mail, MessageSquare, Video } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    description: "Direct phone sessions for real-time connection",
    action: "Call us",
    value: "+306985667480",
  },
  {
    icon: MessageSquare,
    title: "Viber",
    description: "Connect via Viber for a personal touch",
    action: "Send a message",
    value: "viber://chat/?number=00306985667480",
  },
//   {
//     icon: Video,
//     title: "Zoom",
//     description: "Face-to-face video sessions",
//     action: "Schedule video call",
//     value: "zoom-booking",
//   },
  {
    icon: Mail,
    title: "Email",
    description: "Send us your questions and inquiries",
    action: "Email us",
    value: "elena@yahoo.de",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Multiple ways to connect with us. Choose the communication channel that works best for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <div
                key={method.title}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary transition-all hover:shadow-lg"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{method.description}</p>
                <a
                  href={
                    method.value.startsWith("+")
                      ? `tel:${method.value}`
                      : method.value.includes("@")
                        ? `mailto:${method.value}`
                        : `viber://chat/?number=${method.value.replace(/\D/g, "")}`
                  }
                  className="inline-block text-primary font-semibold hover:text-primary/80 transition-colors text-sm"
                >
                  {method.action} →
                </a>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Life?</h3>
          <p className="text-foreground/80 mb-6">
            Don't hesitate to reach out. Our team is ready to answer any questions and help you start your healing
            journey.
          </p>
          <a
            href="#booking"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Your First Session For Free
          </a>
        </div>
      </div>
    </section>
  )
}
