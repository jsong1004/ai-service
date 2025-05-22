"use client"

import { Card, CardContent } from "@/components/ui/card"

interface SuccessMessageProps {
  title: string
  message: string
  showClosingMessage?: boolean
}

export function SuccessMessage({ title, message, showClosingMessage = false }: SuccessMessageProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            {message}
          </p>
          {showClosingMessage && (
            <p className="text-sm text-gray-500">Closing this form in 3 seconds...</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}