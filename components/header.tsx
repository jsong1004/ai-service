"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SHOW_TESTIMONIALS } from "@/app/page"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import ConsultationForm from "./consultation-form"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Startup Consulting Inc.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-white hover:text-gray-200">
              Features
            </Link>
            {SHOW_TESTIMONIALS && (
              <Link href="#testimonials" className="text-sm font-medium text-white hover:text-gray-200">
                Testimonials
              </Link>
            )}
            <Link href="#pricing" className="text-sm font-medium text-white hover:text-gray-200">
              Pricing
            </Link>
            <button
              type="button"
              className="text-sm font-medium text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setIsConsultationOpen(true)}
            >
              Contact
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-800 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Consultation Dialog */}
      <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
        <DialogContent className="max-w-3xl">
          <ConsultationForm onSuccess={() => setIsConsultationOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="#features"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-gray-200"
              onClick={toggleMenu}
            >
              Features
            </Link>
            {SHOW_TESTIMONIALS && (
              <Link
                href="#testimonials"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-gray-200"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
            )}
            <Link
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-gray-200"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <button
              type="button"
              className="block w-full rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-gray-200 text-left focus:outline-none"
              onClick={() => {
                setIsConsultationOpen(true)
                setIsMenuOpen(false)
              }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
