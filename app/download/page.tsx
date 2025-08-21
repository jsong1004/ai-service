import Header from "@/components/header"
import Footer from "@/components/footer"
import DownloadForm from "@/components/download-form"

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-white text-foreground min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Download Your Resource
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Enter your details below to receive your exclusive download link.
              </p>
            </div>
            
            <DownloadForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
