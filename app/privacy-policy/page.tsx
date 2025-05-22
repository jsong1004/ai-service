import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">Introduction</h2>
              <p>
                At Startup Consulting Inc., we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="mt-2">
                This privacy policy applies to all personal information we collect through our website at 
                startupconsulting.com, as well as through email, text, or other electronic messages between you and our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p>
                We may collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Personal identifiers, such as name, email address, phone number, and company name</li>
                <li>Information about your company and business needs</li>
                <li>Information about your preferences and interests related to our services</li>
                <li>Technical data, including IP address, browser type, operating system, and other technology identifiers on the devices you use to access our website</li>
                <li>Usage data, such as information about how you use our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Collect Your Information</h2>
              <p>
                We collect information directly from you when you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fill out forms on our website, including contact forms, consultation requests, and seminar registrations</li>
                <li>Correspond with us by email, phone, or otherwise</li>
                <li>Subscribe to our newsletter or other communications</li>
                <li>Request information about our services</li>
              </ul>
              <p className="mt-2">
                We also collect information automatically as you navigate through our website through cookies and similar technologies. 
                Please see our Cookie Policy for more information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p>
                We use the information we collect about you for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Providing and improving our website and services</li>
                <li>Responding to your requests, inquiries, and feedback</li>
                <li>Processing your service requests and managing our relationship with you</li>
                <li>Sending you updates, newsletters, and marketing communications (if you have opted in)</li>
                <li>Analyzing usage patterns to improve our website and services</li>
                <li>Complying with legal obligations and protecting our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Sharing Your Information</h2>
              <p>
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Our service providers who perform services on our behalf, such as email delivery, hosting, and analytics</li>
                <li>Professional advisers, including lawyers, bankers, auditors, and insurers</li>
                <li>Government authorities when required by law or to protect our rights</li>
              </ul>
              <p className="mt-2">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p>
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, 
                contractors, and other third parties who have a business need to know.
              </p>
              <p className="mt-2">
                However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. 
                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate or incomplete personal data</li>
                <li>The right to request deletion of your personal data</li>
                <li>The right to restrict or object to processing of your personal data</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us using the details provided in the "Contact Us" section.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to Our Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. If we make material changes to how we treat our users' 
                personal information, we will notify you through a notice on the website home page or by email.
              </p>
              <p className="mt-2">
                The date this privacy policy was last revised is identified at the bottom of this page. 
                You are responsible for ensuring we have an up-to-date active and deliverable email address for you, 
                and for periodically visiting our website and this privacy policy to check for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions or concerns about this privacy policy or our practices, please contact us at:
              </p>
              <div className="mt-2">
                <p>Startup Consulting Inc.</p>
                <p>Email: info@koreatous.com</p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-4 mt-8">
              <p className="text-sm text-gray-500">
                Last Updated: May 22, 2025
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}