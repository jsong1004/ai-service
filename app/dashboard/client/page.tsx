'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Calendar,
  ArrowUpRight,
  Plus,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

interface ClientStats {
  totalContracts: number
  activeContracts: number
  completedContracts: number
  totalSpent: number
  currentMonthSpent: number
  nextPaymentDate?: string
  nextPaymentAmount?: number
}

interface ClientContract {
  id: string
  contractNumber: string
  services: string[]
  amount: number
  status: string
  startDate: string
  endDate?: string
  progress: number
}

export default function ClientDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<ClientStats | null>(null)
  const [contracts, setContracts] = useState<ClientContract[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, contractsResponse] = await Promise.all([
        fetch('/api/clients/stats'),
        fetch('/api/clients/contracts')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (contractsResponse.ok) {
        const contractsData = await contractsResponse.json()
        setContracts(contractsData.contracts || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Client Portal">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Client Portal">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {session?.user?.name?.split(' ')[0]}!</h2>
              <p className="text-blue-100 mt-1">
                Manage your AI automation services and track progress
              </p>
            </div>
            {stats?.nextPaymentDate && (
              <div className="text-right">
                <div className="text-sm text-blue-100">Next Payment</div>
                <div className="text-xl font-bold">
                  {formatCurrency(stats.nextPaymentAmount || 0)}
                </div>
                <div className="text-sm text-blue-100">
                  {new Date(stats.nextPaymentDate).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeContracts || 0}</div>
              <p className="text-xs text-muted-foreground">
                Currently running services
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedContracts || 0}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.totalSpent || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime AI services investment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.currentMonthSpent || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current month spending
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Contracts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Contracts</CardTitle>
                  <CardDescription>
                    Your ongoing AI automation projects
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/contracts">
                    View All
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {contracts.filter(c => c.status === 'active').length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active contracts</p>
                  <Button className="mt-4" size="sm" asChild>
                    <Link href="/consultation">
                      <Plus className="mr-1 h-3 w-3" />
                      Request New Service
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {contracts.filter(c => c.status === 'active').slice(0, 3).map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{contract.contractNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {contract.services.join(', ')}
                          </p>
                        </div>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{contract.progress}%</span>
                        </div>
                        <Progress value={contract.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground mt-3">
                        <span>Value: {formatCurrency(contract.amount)}</span>
                        <span>
                          Started: {new Date(contract.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Service Overview</CardTitle>
              <CardDescription>
                Quick access to your services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.activeContracts || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats?.completedContracts || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Button className="w-full" asChild>
                  <Link href="/consultation">
                    <Plus className="mr-2 h-4 w-4" />
                    Request New Service
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/contracts">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Contracts
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/settings">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
            <CardDescription>
              Explore our AI automation services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/ai-workshops" className="group">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium group-hover:text-primary">AI Workshops</h3>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hands-on training for your team
                  </p>
                </div>
              </Link>
              
              <Link href="/business-automation" className="group">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium group-hover:text-primary">Custom Automation</h3>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tailored AI solutions for your business
                  </p>
                </div>
              </Link>
              
              <Link href="/managed-services" className="group">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium group-hover:text-primary">Managed Services</h3>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ongoing AI system management
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}