'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  Menu,
  LogOut,
  UserCircle,
  TrendingUp,
  Handshake,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: ('admin' | 'affiliate' | 'client')[]
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'affiliate', 'client'],
  },
  {
    name: 'Contracts',
    href: '/dashboard/contracts',
    icon: FileText,
    roles: ['admin', 'affiliate', 'client'],
  },
  {
    name: 'Negotiations',
    href: '/dashboard/negotiations',
    icon: Handshake,
    roles: ['admin', 'affiliate'],
  },
  {
    name: 'Commissions',
    href: '/dashboard/commissions',
    icon: DollarSign,
    roles: ['admin', 'affiliate'],
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: TrendingUp,
    roles: ['admin', 'affiliate'],
  },
  {
    name: 'Affiliates',
    href: '/dashboard/affiliates',
    icon: Users,
    roles: ['admin'],
  },
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: Building,
    roles: ['admin'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'affiliate', 'client'],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userRole = session?.user?.role
  const filteredNavigation = navigation.filter(item => 
    userRole && item.roles.includes(userRole)
  )

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-6 py-4 border-b">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <span className="ml-2 text-lg font-semibold">AI Biz</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (pathname.startsWith(item.href) && item.href !== '/dashboard')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>
              {session?.user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r bg-background">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Header */}
        <header className="bg-background border-b px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              {title && (
                <h1 className="text-xl font-semibold">{title}</h1>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback>
                      {session?.user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}