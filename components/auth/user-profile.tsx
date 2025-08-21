"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "./signout-button"

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!session?.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Signed In</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { user } = session
  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name || "User"}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Name:</span>
            <span className="text-sm text-gray-600">{user.name || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Provider:</span>
            <span className="text-sm text-gray-600 capitalize">
              {session.provider || "Google"}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  )
}
