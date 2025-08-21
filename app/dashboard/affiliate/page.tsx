'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp, 
  Plus,
  Calendar,
  ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'

interface AffiliateStats {
  totalEarnings: number
  pendingEarnings: number
  paidEarnings: number
  commissionRate: number
  totalContracts: number
  activeNegotiations: number
  conversionRate: number
  status: string
}

interface RecentContract {
  id: string
  clientName: string
  amount: number
  commission: number
  status: string
  date: string
}

export default function AffiliateDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [recentContracts, setRecentContracts] = useState<RecentContract[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, contractsResponse] = await Promise.all([
        fetch('/api/affiliates/stats'),
        fetch('/api/affiliates/recent-contracts')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (contractsResponse.ok) {
        const contractsData = await contractsResponse.json()
        setRecentContracts(contractsData.contracts || [])
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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Affiliate Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Affiliate Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {session?.user?.name?.split(' ')[0]}!</h2>
              <p className="text-primary-foreground/80 mt-1">
                Track your performance and grow your earnings
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-foreground/80">Commission Rate</div>
              <div className="text-2xl font-bold">{stats?.commissionRate || 10}%</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.totalEarnings || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime commission earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats?.pendingEarnings || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting payment approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalContracts || 0}</div>
              <p className="text-xs text-muted-foreground">
                Contracts generated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Lead to contract conversion
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contracts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Contracts</CardTitle>
                  <CardDescription>
                    Your latest contract activity
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
              {recentContracts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No contracts yet</p>
                  <Button className="mt-4" size="sm" asChild>
                    <Link href="/dashboard/negotiations">
                      <Plus className="mr-1 h-3 w-3" />
                      Start First Lead
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentContracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{contract.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          Commission: {formatCurrency(contract.commission)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(contract.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Commission Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Breakdown</CardTitle>
              <CardDescription>
                Your earning status overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Paid Earnings</span>
                  <span>{formatCurrency(stats?.paidEarnings || 0)}</span>
                </div>
                <Progress 
                  value={((stats?.paidEarnings || 0) / (stats?.totalEarnings || 1)) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Pending Approval</span>
                  <span>{formatCurrency(stats?.pendingEarnings || 0)}</span>
                </div>
                <Progress 
                  value={((stats?.pendingEarnings || 0) / (stats?.totalEarnings || 1)) * 100} 
                  className="h-2"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total Lifetime Earnings</span>
                  <span>{formatCurrency(stats?.totalEarnings || 0)}</span>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href="/dashboard/commissions">
                  View Commission History
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to grow your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/dashboard/negotiations">
                  <Plus className="h-5 w-5" />
                  <span>Add New Lead</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/dashboard/contracts">
                  <FileText className="h-5 w-5" />
                  <span>View Contracts</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link href="/dashboard/analytics">
                  <TrendingUp className="h-5 w-5" />
                  <span>View Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}