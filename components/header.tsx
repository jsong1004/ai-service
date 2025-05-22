"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SHOW_TESTIMONIALS } from "@/app/page"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ConsultationForm from "./consultation-form"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Startup Consulting Inc.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Features
            </Link>
            {SHOW_TESTIMONIALS && (
              <Link href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Testimonials
              </Link>
            )}
            <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex">
            <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
              <DialogTrigger asChild>
                <Button>Get Started</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <ConsultationForm onSuccess={() => setIsConsultationOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#features"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Features
            </Link>
            {SHOW_TESTIMONIALS && (
              <Link
                href="#testimonials"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
            )}
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="mt-4 px-3">
              <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={toggleMenu}>Get Started</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <ConsultationForm onSuccess={() => setIsConsultationOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
