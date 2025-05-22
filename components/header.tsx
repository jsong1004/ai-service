"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SHOW_TESTIMONIALS } from "@/app/page"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import ConsultationForm from "./consultation-form"
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import Image from "next/image"

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
              <Image src="/images/logo-wo-text.jpg" alt="Startup Consulting Inc. Logo" width={40} height={40} className="mr-2" />
              <span className="text-xl font-bold text-white">Startup Consulting Inc.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {SHOW_TESTIMONIALS && (
              <Link href="#testimonials" className="text-sm font-medium text-white hover:text-gray-200">
                Testimonials
              </Link>
            )}
          </nav>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4 ml-4">
            <a href="https://www.facebook.com/usa.startup.consulting" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="w-5 h-5 text-white hover:text-blue-400 transition" />
            </a>
            <a href="https://www.linkedin.com/company/75661993/admin/dashboard/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5 text-white hover:text-blue-300 transition" />
            </a>
            <a href="https://x.com/JaeheeSong1004" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="w-5 h-5 text-white hover:text-blue-200 transition" />
            </a>
            <a href="https://www.instagram.com/knft82/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 text-white hover:text-pink-400 transition" />
            </a>
          </div>

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
            {SHOW_TESTIMONIALS && (
              <Link
                href="#testimonials"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-gray-200"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
            )}
            {/* Social Media Links for Mobile */}
            <div className="flex items-center space-x-4 mt-4 px-3">
              <a href="https://www.facebook.com/usa.startup.consulting" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="w-5 h-5 text-white hover:text-blue-400 transition" />
              </a>
              <a href="https://www.linkedin.com/company/75661993/admin/dashboard/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="w-5 h-5 text-white hover:text-blue-300 transition" />
              </a>
              <a href="https://x.com/JaeheeSong1004" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="w-5 h-5 text-white hover:text-blue-200 transition" />
              </a>
              <a href="https://www.instagram.com/knft82/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="w-5 h-5 text-white hover:text-pink-400 transition" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
