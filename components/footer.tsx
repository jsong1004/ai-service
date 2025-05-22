import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Startup Consulting Inc.</h3>
            <p className="mb-4">Transforming businesses through AI automation and education.</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/usa.startup.consulting" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.linkedin.com/company/75661993/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://x.com/JaeheeSong1004" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.instagram.com/knft82/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  AI Workshops
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Custom Automation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Managed Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/founder" className="hover:text-white">
                  About Founder
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-white">
                  About Company
                </Link>
              </li>              
              <li>
                <Link href="/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:jsong@koreatous.com" className="hover:text-white">
                  info@koreatous.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Startup Consulting Inc. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
