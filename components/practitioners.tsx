const practitioners = [
  {
    id: 1,
    name: "Maya Chen",
    specialty: "Reiki Master & Energy Healer",
    bio: "With 12 years of experience, Maya specializes in chakra balancing and energy restoration.",
    image: "/spiritual-healer-woman-meditation.jpg",
    certifications: ["Reiki Master", "Holistic Health Coach"],
  },
  {
    id: 2,
    name: "David Rodriguez",
    specialty: "Spiritual Guide & Counselor",
    bio: "David guides seekers through transformative journeys with compassion and ancient wisdom.",
    image: "/spiritual-guide-man-calm.jpg",
    certifications: ["Life Coach", "Spiritual Advisor"],
  },
  {
    id: 3,
    name: "Sophie Laurent",
    specialty: "Meditation Teacher",
    bio: "Sophie creates personalized meditation practices for stress relief and inner peace.",
    image: "/meditation-teacher-woman-zen.jpg",
    certifications: ["Meditation Instructor", "Yoga Teacher"],
  },
]

export default function Practitioners() {
  return (
    <section id="practitioners" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Practitioners</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Experienced healers dedicated to your spiritual transformation and wellbeing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {practitioners.map((practitioner) => (
            <div
              key={practitioner.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={practitioner.image || "/placeholder.svg"}
                alt={practitioner.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{practitioner.name}</h3>
                <p className="text-primary font-semibold mb-3">{practitioner.specialty}</p>
                <p className="text-foreground/70 text-sm mb-4">{practitioner.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {practitioner.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
