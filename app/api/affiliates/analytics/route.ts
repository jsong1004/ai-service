import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/firestore'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'affiliate') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '6months'

    // Get user document
    const usersRef = db.collection('users')
    const userSnapshot = await usersRef.where('email', '==', session.user.email).get()

    if (userSnapshot.empty) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userId = userSnapshot.docs[0].id

    // Get affiliate data
    const affiliatesRef = db.collection('affiliates')
    const affiliateSnapshot = await affiliatesRef.where('userId', '==', userId).get()

    if (affiliateSnapshot.empty) {
      return NextResponse.json(
        { error: 'Affiliate profile not found' },
        { status: 404 }
      )
    }

    const affiliateId = affiliateSnapshot.docs[0].id

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    switch (range) {
      case '1month':
        startDate.setMonth(endDate.getMonth() - 1)
        break
      case '3months':
        startDate.setMonth(endDate.getMonth() - 3)
        break
      case '6months':
        startDate.setMonth(endDate.getMonth() - 6)
        break
      case '1year':
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      default:
        startDate.setMonth(endDate.getMonth() - 6)
    }

    // Get contracts in date range
    const contractsSnapshot = await db.collection('contracts')
      .where('affiliateId', '==', affiliateId)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get()

    const contracts = contractsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      startDate: doc.data().startDate?.toDate()
    }))

    // Get negotiations in date range
    const negotiationsSnapshot = await db.collection('negotiations')
      .where('affiliateId', '==', affiliateId)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get()

    const negotiations = negotiationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }))

    // Get commissions in date range
    const commissionsSnapshot = await db.collection('commissions')
      .where('affiliateId', '==', affiliateId)
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get()

    const commissions = commissionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }))

    // Calculate overview metrics
    const totalRevenue = contracts.reduce((sum, c) => sum + (c.amount || 0), 0)
    const totalLeads = negotiations.length
    const closedWon = negotiations.filter(n => n.stage === 'closed-won').length
    const conversionRate = totalLeads > 0 ? Math.round((closedWon / totalLeads) * 100) : 0
    const averageDealSize = contracts.length > 0 ? totalRevenue / contracts.length : 0

    // Calculate month-over-month changes (simplified)
    const currentMonth = new Date()
    currentMonth.setDate(1)
    const lastMonth = new Date(currentMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const currentMonthContracts = contracts.filter(c => c.createdAt >= currentMonth)
    const lastMonthContracts = contracts.filter(c => 
      c.createdAt >= lastMonth && c.createdAt < currentMonth
    )

    const currentMonthRevenue = currentMonthContracts.reduce((sum, c) => sum + (c.amount || 0), 0)
    const lastMonthRevenue = lastMonthContracts.reduce((sum, c) => sum + (c.amount || 0), 0)
    const revenueChange = lastMonthRevenue > 0 
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0

    // Generate timeline data (monthly buckets)
    const timeline = []
    const monthsToShow = range === '1year' ? 12 : range === '6months' ? 6 : 3
    
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const monthStart = new Date()
      monthStart.setMonth(monthStart.getMonth() - i, 1)
      monthStart.setHours(0, 0, 0, 0)
      
      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthEnd.getMonth() + 1)
      
      const monthContracts = contracts.filter(c => 
        c.createdAt >= monthStart && c.createdAt < monthEnd
      )
      const monthNegotiations = negotiations.filter(n => 
        n.createdAt >= monthStart && n.createdAt < monthEnd
      )
      const monthCommissions = commissions.filter(c => 
        c.createdAt >= monthStart && c.createdAt < monthEnd
      )

      timeline.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        leads: monthNegotiations.length,
        contracts: monthContracts.length,
        revenue: monthContracts.reduce((sum, c) => sum + (c.amount || 0), 0),
        commissions: monthCommissions.reduce((sum, c) => sum + (c.amount || 0), 0)
      })
    }

    // Stage breakdown
    const stageBreakdown = negotiations.reduce((acc, n) => {
      const stage = n.stage
      if (!acc[stage]) {
        acc[stage] = { stage, count: 0, value: 0, percentage: 0 }
      }
      acc[stage].count++
      acc[stage].value += n.estimatedValue || 0
      return acc
    }, {} as Record<string, any>)

    const totalPipelineValue = Object.values(stageBreakdown).reduce((sum: number, stage: any) => sum + stage.value, 0)
    Object.values(stageBreakdown).forEach((stage: any) => {
      stage.percentage = totalPipelineValue > 0 ? (stage.value / totalPipelineValue) * 100 : 0
    })

    // Top performing services (simplified)
    const serviceBreakdown = contracts.reduce((acc, c) => {
      const services = c.services || ['General Consulting']
      services.forEach((service: string) => {
        if (!acc[service]) {
          acc[service] = { service, contracts: 0, revenue: 0, commissions: 0 }
        }
        acc[service].contracts++
        acc[service].revenue += c.amount || 0
        acc[service].commissions += c.commissionAmount || 0
      })
      return acc
    }, {} as Record<string, any>)

    const topPerformingServices = Object.values(serviceBreakdown)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5)

    // Performance metrics
    const performance = {
      leadsGenerated: totalLeads,
      contractsClosed: contracts.length,
      commissionEarned: commissions.reduce((sum, c) => sum + (c.amount || 0), 0),
      averageTimeToClose: 30 // Simplified calculation
    }

    // Goals (example data)
    const goals = [
      {
        type: 'monthly_revenue',
        target: 10000,
        current: currentMonthRevenue,
        period: 'This Month'
      },
      {
        type: 'quarterly_leads',
        target: 50,
        current: totalLeads,
        period: 'This Quarter'
      }
    ]

    return NextResponse.json({
      overview: {
        totalRevenue,
        totalLeads,
        conversionRate,
        averageDealSize,
        monthOverMonth: {
          revenue: revenueChange,
          leads: 0, // Simplified
          conversion: 0, // Simplified
          dealSize: 0 // Simplified
        }
      },
      performance,
      timeline,
      stageBreakdown: Object.values(stageBreakdown),
      topPerformingServices,
      goals
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}