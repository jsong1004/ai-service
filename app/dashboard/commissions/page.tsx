'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  Search, 
  Filter,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  CreditCard
} from 'lucide-react'
import { Commission, Contract } from '@/types/index'

interface CommissionWithContract extends Commission {
  contract: Contract
}

interface CommissionsPageData {
  commissions: CommissionWithContract[]
  totalEarnings: number
  pendingAmount: number
  paidAmount: number
  thisMonthEarnings: number
  paymentHistory: PaymentRecord[]
  upcomingPayments: CommissionWithContract[]
}

interface PaymentRecord {
  id: string
  amount: number
  paymentDate: Date
  paymentMethod: string
  paymentReference: string
  commissionIds: string[]
}

export default function CommissionsPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<CommissionsPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  useEffect(() => {
    fetchCommissions()
  }, [])

  const fetchCommissions = async () => {
    try {
      const response = await fetch('/api/affiliates/commissions')
      if (response.ok) {
        const commissionsData = await response.json()
        setData(commissionsData)
      }
    } catch (error) {
      console.error('Error fetching commissions:', error)
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

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'approved':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredCommissions = data?.commissions?.filter(commission => {
    const matchesSearch = commission.contract?.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.paymentReference?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter
    
    let matchesDate = true
    if (dateFilter !== 'all') {
      const commissionDate = new Date(commission.createdAt)
      const now = new Date()
      const monthsAgo = parseInt(dateFilter)
      const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
      matchesDate = commissionDate >= cutoffDate
    }
    
    return matchesSearch && matchesStatus && matchesDate
  }) || []

  if (loading) {
    return (
      <DashboardLayout title="Commissions">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Commissions">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data?.totalEarnings || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime commission earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data?.pendingAmount || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting payment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Out</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data?.paidAmount || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully paid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data?.thisMonthEarnings || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current month earnings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Progress</CardTitle>
            <CardDescription>
              Your commission payment status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Paid Commissions</span>
                <span>{formatCurrency(data?.paidAmount || 0)}</span>
              </div>
              <Progress 
                value={((data?.paidAmount || 0) / (data?.totalEarnings || 1)) * 100} 
                className="h-3 bg-green-100"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Pending Approval</span>
                <span>{formatCurrency(data?.pendingAmount || 0)}</span>
              </div>
              <Progress 
                value={((data?.pendingAmount || 0) / (data?.totalEarnings || 1)) * 100} 
                className="h-3 bg-yellow-100"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Lifetime Earnings</span>
                <span>{formatCurrency(data?.totalEarnings || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Management Tabs */}
        <Tabs defaultValue="commissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="commissions">All Commissions</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="commissions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>Commission History</CardTitle>
                    <CardDescription>
                      Track all your commission earnings and payments
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search commissions..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="1">Last Month</SelectItem>
                      <SelectItem value="3">Last 3 Months</SelectItem>
                      <SelectItem value="6">Last 6 Months</SelectItem>
                      <SelectItem value="12">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredCommissions.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No commissions found</h3>
                    <p className="text-muted-foreground">
                      {data?.commissions?.length === 0 
                        ? "You haven't earned any commissions yet. Start by generating contracts from your leads."
                        : "No commissions match your search criteria."
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCommissions.map((commission) => (
                      <div key={commission.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(commission.status)}
                                <h3 className="font-medium">
                                  Contract #{commission.contract?.contractNumber}
                                </h3>
                              </div>
                              <Badge className={getStatusColor(commission.status)}>
                                {commission.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><strong>Commission Amount:</strong> {formatCurrency(commission.amount)}</p>
                              <p><strong>Commission Rate:</strong> {commission.percentage}%</p>
                              <p><strong>Contract Value:</strong> {formatCurrency(commission.contract?.amount || 0)}</p>
                              <p><strong>Created:</strong> {formatDate(commission.createdAt)}</p>
                              {commission.approvedDate && (
                                <p><strong>Approved:</strong> {formatDate(commission.approvedDate)}</p>
                              )}
                              {commission.paymentDate && (
                                <p><strong>Paid:</strong> {formatDate(commission.paymentDate)}</p>
                              )}
                            </div>
                            {commission.paymentReference && (
                              <div className="text-xs text-muted-foreground">
                                <strong>Payment Ref:</strong> {commission.paymentReference}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              View Contract
                            </Button>
                            {commission.status === 'paid' && (
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Receipt
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Your commission payment records
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!data?.paymentHistory || data.paymentHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No payments yet</h3>
                    <p className="text-muted-foreground">
                      Your payment history will appear here once payments are processed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.paymentHistory.map((payment) => (
                      <div key={payment.id} className="border rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">{formatCurrency(payment.amount)}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><strong>Payment Date:</strong> {formatDate(payment.paymentDate)}</p>
                              <p><strong>Method:</strong> {payment.paymentMethod}</p>
                              <p><strong>Reference:</strong> {payment.paymentReference}</p>
                              <p><strong>Commissions:</strong> {payment.commissionIds.length} items</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>
                  Commissions scheduled for payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!data?.upcomingPayments || data.upcomingPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming payments</h3>
                    <p className="text-muted-foreground">
                      Approved commissions ready for payment will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.upcomingPayments.map((commission) => (
                      <div key={commission.id} className="border rounded-lg p-4 bg-blue-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">
                              {formatCurrency(commission.amount)} - Contract #{commission.contract?.contractNumber}
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              <p>Approved: {commission.approvedDate && formatDate(commission.approvedDate)}</p>
                              <p>Expected Payment: Next payment cycle</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            Payment Scheduled
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}