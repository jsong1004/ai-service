import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"
import SeminarSection from "@/components/seminar-section"

// Set this to true when you want to show testimonials
export const SHOW_TESTIMONIALS = false

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <HeroSection />
          <SeminarSection />
          <FeaturesSection />
          {SHOW_TESTIMONIALS && <TestimonialsSection />}
          <PricingSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
