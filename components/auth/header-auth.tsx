"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export function HeaderAuth() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gray-600 rounded-full animate-pulse"></div>
      </div>
    )
  }

  if (session && session.user) {
    const userName = session.user.name || session.user.email?.split('@')[0] || 'User'
    const userInitials = session.user.name 
      ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : session.user.email?.charAt(0).toUpperCase() || 'U'

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image || ''} alt={userName} />
              <AvatarFallback className="bg-white text-black">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        asChild
        className="text-white hover:text-gray-200 hover:bg-gray-800"
      >
        <Link href="/auth/login">
          Sign In
        </Link>
      </Button>
      <Button 
        asChild
        className="bg-white text-black hover:bg-gray-100"
      >
        <Link href="/auth/signup">
          Sign Up
        </Link>
      </Button>
    </div>
  )
}