import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        // Protect onboarding routes
        if (req.nextUrl.pathname.startsWith("/onboarding")) {
          return !!token
        }
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Only match dashboard and onboarding routes for auth protection
     */
    "/dashboard/:path*",
    "/onboarding/:path*",
  ],
}