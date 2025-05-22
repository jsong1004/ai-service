"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import ConsultationForm from "@/components/consultation-form"

export default function HeroSection() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Transform Your Business with AI Automation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We train you to build your business automation. Streamline processes, reduce costs, and increase
              efficiency with our expert AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg" onClick={() => setIsConsultationOpen(true)}>
                    Get Started
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <ConsultationForm onSuccess={() => setIsConsultationOpen(false)} />
                </DialogContent>
              </Dialog>

            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -z-10 bottom-24 right-24 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative z-10">
                <Image
                  src="/images/ai-automation.png"
                  alt="AI Business Automation"
                  width={600}
                  height={450}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
