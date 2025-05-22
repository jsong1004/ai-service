"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import ServiceRequestForm from "@/components/ServiceRequestForm"

export default function PricingSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const pricingPlans = [
    {
      title: "AI Automation Workshop",
      price: "$200",
      unit: "per hour",
      description:
        "Not just another AI workshop with demo projects. We guide you to build real automation for your business processes.",
      features: [
        "Hands-on practical training",
        "Custom automation solutions",
        "Real-time problem solving",
        "Implementation guidance",
        "Post-workshop support",
      ],
    },
    {
      title: "AI Automation Build",
      price: "$500",
      unit: "per hour",
      description: "We build complex business automation for you and educate/train you to maintain the process.",
      features: [
        "Custom automation development",
        "Comprehensive training",
        "System documentation",
        "Knowledge transfer sessions",
        "30-day support included",
      ],
      highlighted: true,
    },
    {
      title: "Managed AI Service",
      price: "$1000",
      unit: "per month",
      description: "We build your business automation, maintain and support for future enhancement. ",
      features: [
        "End-to-end solution development(Initial Setup)",
        "Ongoing maintenance",
        "Regular updates and improvements",
        "24/7 technical support",
        "Quarterly performance reviews",
      ],
      infoBox: {
        text: "Initial Setup: ",
        description: "Build AI automation through AI Automation Build plan as initial setup phase."
      }
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs and start transforming your operations today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${plan.highlighted ? "border-blue-500 shadow-xl" : "shadow-lg"} relative`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.unit}</span>
                </div>
                {/* Info box for Managed AI Service */}
                {plan.infoBox && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded p-3 text-sm text-center mb-6">
                    <span className="font-semibold">{plan.infoBox.text}</span>
                    {plan.infoBox.description}
                  </div>
                )}
                <p className="text-gray-600 mb-8">{plan.description}</p>
                <ul className="space-y-3 text-left mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Dialog open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)}>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full ${plan.title === "Managed AI Service" ? "border-2 border-[#5B4FFF] text-[#5B4FFF] font-bold text-lg bg-white hover:bg-blue-50" : plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.title === "Managed AI Service" ? "outline" : plan.highlighted ? "default" : "outline"}
                    >
                      Select
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <ServiceRequestForm serviceInterest={plan.title} onSuccess={() => setOpenIndex(null)} />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
