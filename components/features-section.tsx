import { Bot, Zap, BarChart, Users } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="h-10 w-10 text-blue-600" />,
      title: "Custom AI Solutions",
      description: "Tailored AI automation solutions designed specifically for your business needs and processes.",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-600" />,
      title: "Hands-on Training",
      description:
        "Learn by doing with our practical workshops that teach you to build and maintain your own AI systems.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-600" />,
      title: "Measurable Results",
      description: "Track performance improvements and ROI with our comprehensive analytics and reporting tools.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Ongoing Support",
      description: "Get continuous assistance and updates to ensure your AI automation evolves with your business.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Your Business</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI automation platform provides everything you need to transform your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 transition-all duration-300 hover:shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
