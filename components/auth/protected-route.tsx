"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SignInButton } from "./signin-button"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      // Not signed in, redirect to sign in page
      router.push("/auth/signin")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Authentication Required</h1>
          <p className="text-gray-600">Please sign in to access this page.</p>
          <SignInButton />
        </div>
      )
    )
  }

  return <>{children}</>
}
