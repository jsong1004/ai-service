import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The AI automation workshop completely transformed how we handle customer support. We've reduced response times by 70% and improved satisfaction scores.",
      author: "Sarah Johnson",
      position: "CTO, TechSolutions Inc.",
    },
    {
      quote:
        "Working with Startup Consulting Inc. was a game-changer for our operations. Their managed AI service helped us automate our inventory management system.",
      author: "Michael Chen",
      position: "Operations Director, Global Retail",
    },
    {
      quote:
        "The training we received was practical and immediately applicable. We built our own AI-powered analytics system with their guidance.",
      author: "Jessica Williams",
      position: "Data Analytics Lead, Finance Pro",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from businesses that have transformed their operations with our AI automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-blue-500 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
