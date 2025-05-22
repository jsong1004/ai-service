"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ConsultationForm from "./consultation-form"

export default function CtaSection() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of businesses that have revolutionized their operations with our AI automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8">
                  Schedule a Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <ConsultationForm onSuccess={() => setIsConsultationOpen(false)} />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 text-lg px-8">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
