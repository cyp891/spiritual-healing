export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-20 md:py-32">
      <div className="spiritual-gradient dark:spiritual-gradient-dark absolute inset-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Heal Your <span className="text-primary">Energy</span>, Transform Your Life
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 text-pretty">
            Experience profound spiritual healing through personalized sessions. Connect with experienced practitioners
            who guide you toward inner peace, clarity, and holistic wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Your Session
            </a>
            <a
              href="#services"
              className="bg-card text-foreground px-8 py-3 rounded-lg font-semibold border-2 border-primary hover:bg-primary/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
