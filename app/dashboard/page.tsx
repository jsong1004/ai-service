import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SignOutButton } from "@/components/auth/signout-button"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  // Check if user has completed onboarding
  if (!session.user?.profileComplete && !session.user?.role) {
    redirect("/onboarding")
  }

  // Redirect to role-specific dashboard
  if (session.user?.role === 'affiliate') {
    redirect("/dashboard/affiliate")
  } else if (session.user?.role === 'client') {
    redirect("/dashboard/client")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session.user?.name || session.user?.email}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Email: {session.user?.email}
            </p>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultations</CardTitle>
            <CardDescription>View your consultation history</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              You have no consultations yet.
            </p>
            <Button variant="outline" size="sm">
              Schedule Consultation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Downloads</CardTitle>
            <CardDescription>Access your resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Available downloads: 2
            </p>
            <Button variant="outline" size="sm">
              View Downloads
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <SignOutButton />
      </div>
    </div>
  )
}