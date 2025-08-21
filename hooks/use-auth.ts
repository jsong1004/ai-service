"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = !!session
  const isLoading = status === "loading"
  const isUnauthenticated = status === "unauthenticated"

  const login = (provider?: string) => {
    signIn(provider || "google")
  }

  const logout = (callbackUrl?: string) => {
    signOut({ callbackUrl: callbackUrl || "/" })
  }

  const requireAuth = (redirectTo = "/auth/signin") => {
    if (isUnauthenticated) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  return {
    session,
    user: session?.user,
    isAuthenticated,
    isLoading,
    isUnauthenticated,
    login,
    logout,
    requireAuth,
  }
}
