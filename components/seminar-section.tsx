"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Building2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import SeminarRegistrationForm from "./seminar-registration-form"
import OnsiteSeminarForm from "./onsite-seminar-form"

export default function SeminarSection() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isOnsiteOpen, setIsOnsiteOpen] = useState(false)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Free AI Seminar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for an insightful one-hour session on AI and its impact on business
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">What You'll Learn</h3>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>AI Overview and Current State</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Real-world AI Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Future of AI in Business</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Getting Started with AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Practical AI Implementation Strategies</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">1 Hour Session</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm">Monthly Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Virtual Event</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 border rounded-lg p-6 bg-white shadow-sm">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-bold">Register Now</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Limited spots available. Reserve your seat today!
              </p>
            </div>
            <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  Register for Free Seminar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogTitle className="sr-only">Register for Free AI Seminar</DialogTitle>
                <SeminarRegistrationForm onSuccess={() => setIsRegistrationOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}