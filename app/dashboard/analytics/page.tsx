'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  DollarSign,
  Users,
  FileText,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalLeads: number
    conversionRate: number
    averageDealSize: number
    monthOverMonth: {
      revenue: number
      leads: number
      conversion: number
      dealSize: number
    }
  }
  performance: {
    leadsGenerated: number
    contractsClosed: number
    commissionEarned: number
    averageTimeToClose: number
  }
  timeline: {
    month: string
    leads: number
    contracts: number
    revenue: number
    commissions: number
  }[]
  stageBreakdown: {
    stage: string
    count: number
    value: number
    percentage: number
  }[]
  topPerformingServices: {
    service: string
    contracts: number
    revenue: number
    commissions: number
  }[]
  goals: {
    type: string
    target: number
    current: number
    period: string
  }[]
}

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('6months')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/affiliates/analytics?range=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
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

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-600" />
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4" />
  }

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600'
    if (value < 0) return 'text-red-600'
    return 'text-muted-foreground'
  }

  if (loading) {
    return (
      <DashboardLayout title="Analytics">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Performance Analytics</h2>
            <p className="text-muted-foreground">Track your affiliate performance and growth metrics</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(analyticsData?.overview.totalRevenue || 0)}
              </div>
              <div className="flex items-center text-xs">
                {getTrendIcon(analyticsData?.overview.monthOverMonth.revenue || 0)}
                <span className={getTrendColor(analyticsData?.overview.monthOverMonth.revenue || 0)}>
                  {formatPercentage(analyticsData?.overview.monthOverMonth.revenue || 0)} from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData?.overview.totalLeads || 0}</div>
              <div className="flex items-center text-xs">
                {getTrendIcon(analyticsData?.overview.monthOverMonth.leads || 0)}
                <span className={getTrendColor(analyticsData?.overview.monthOverMonth.leads || 0)}>
                  {formatPercentage(analyticsData?.overview.monthOverMonth.leads || 0)} from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData?.overview.conversionRate || 0}%</div>
              <div className="flex items-center text-xs">
                {getTrendIcon(analyticsData?.overview.monthOverMonth.conversion || 0)}
                <span className={getTrendColor(analyticsData?.overview.monthOverMonth.conversion || 0)}>
                  {formatPercentage(analyticsData?.overview.monthOverMonth.conversion || 0)} from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(analyticsData?.overview.averageDealSize || 0)}
              </div>
              <div className="flex items-center text-xs">
                {getTrendIcon(analyticsData?.overview.monthOverMonth.dealSize || 0)}
                <span className={getTrendColor(analyticsData?.overview.monthOverMonth.dealSize || 0)}>
                  {formatPercentage(analyticsData?.overview.monthOverMonth.dealSize || 0)} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Revenue Timeline
                  </CardTitle>
                  <CardDescription>
                    Monthly revenue and commission trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData?.timeline?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-8 w-8 mx-auto mb-2" />
                      <p>No data available for this time period</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {analyticsData?.timeline?.map((period, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium">{period.month}</p>
                            <div className="text-sm text-muted-foreground">
                              {period.leads} leads → {period.contracts} contracts
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(period.revenue)}</p>
                            <p className="text-sm text-green-600">{formatCurrency(period.commissions)} commission</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Top Performing Services
                  </CardTitle>
                  <CardDescription>
                    Services generating the most revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData?.topPerformingServices?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p>No service data available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {analyticsData?.topPerformingServices?.map((service, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{service.service}</span>
                            <Badge variant="outline">{service.contracts} contracts</Badge>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Revenue: {formatCurrency(service.revenue)}</span>
                            <span>Commission: {formatCurrency(service.commissions)}</span>
                          </div>
                          <Progress 
                            value={(service.revenue / (analyticsData?.overview.totalRevenue || 1)) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.performance.leadsGenerated || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    New opportunities created
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contracts Closed</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.performance.contractsClosed || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully converted
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analyticsData?.performance.commissionEarned || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total commission earned
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Time to Close</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.performance.averageTimeToClose || 0} days</div>
                  <p className="text-xs text-muted-foreground">
                    Average sales cycle
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Sales Pipeline Breakdown
                </CardTitle>
                <CardDescription>
                  Distribution of leads across different stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.stageBreakdown?.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No pipeline data</h3>
                    <p className="text-muted-foreground">
                      Start adding leads to see your pipeline breakdown
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analyticsData?.stageBreakdown?.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{stage.stage.replace('-', ' ')}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{stage.count} leads</span>
                            <Badge variant="outline">{formatCurrency(stage.value)}</Badge>
                          </div>
                        </div>
                        <Progress value={stage.percentage} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{stage.percentage.toFixed(1)}% of pipeline</span>
                          <span>Avg value: {formatCurrency(stage.value / (stage.count || 1))}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Performance Goals
                </CardTitle>
                <CardDescription>
                  Track your progress against targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.goals?.length === 0 ? (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No goals set</h3>
                    <p className="text-muted-foreground mb-4">
                      Set performance goals to track your progress
                    </p>
                    <Button>Set Goals</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {analyticsData?.goals?.map((goal, index) => {
                      const progress = (goal.current / goal.target) * 100
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium capitalize">{goal.type}</h3>
                              <p className="text-sm text-muted-foreground">{goal.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {goal.type.includes('revenue') || goal.type.includes('commission') 
                                  ? formatCurrency(goal.current) 
                                  : goal.current
                                } / {goal.type.includes('revenue') || goal.type.includes('commission') 
                                  ? formatCurrency(goal.target) 
                                  : goal.target
                                }
                              </p>
                              <Badge variant={progress >= 100 ? "default" : progress >= 80 ? "secondary" : "outline"}>
                                {progress.toFixed(0)}% complete
                              </Badge>
                            </div>
                          </div>
                          <Progress value={Math.min(progress, 100)} className="h-3" />
                        </div>
                      )
                    })}
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