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
    const affiliateData = affiliateSnapshot.docs[0].data()

    // Get commissions with contract data
    const commissionsRef = db.collection('commissions')
    const commissionsSnapshot = await commissionsRef
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .get()

    const commissions = []
    for (const commissionDoc of commissionsSnapshot.docs) {
      const commissionData = commissionDoc.data()
      
      // Get contract data
      const contractRef = db.collection('contracts').doc(commissionData.contractId)
      const contractDoc = await contractRef.get()
      const contractData = contractDoc.exists ? contractDoc.data() : null

      commissions.push({
        id: commissionDoc.id,
        ...commissionData,
        contract: contractData ? {
          id: contractDoc.id,
          ...contractData,
          contractDate: contractData.contractDate?.toDate().toISOString(),
          startDate: contractData.startDate?.toDate().toISOString(),
          endDate: contractData.endDate?.toDate().toISOString(),
          createdAt: contractData.createdAt?.toDate().toISOString()
        } : null,
        createdAt: commissionData.createdAt?.toDate().toISOString(),
        updatedAt: commissionData.updatedAt?.toDate().toISOString(),
        approvedDate: commissionData.approvedDate?.toDate().toISOString(),
        paymentDate: commissionData.paymentDate?.toDate().toISOString()
      })
    }

    // Calculate summary stats
    const totalEarnings = affiliateData.totalEarnings || 0
    const pendingAmount = affiliateData.pendingEarnings || 0
    const paidAmount = affiliateData.paidEarnings || 0

    // Calculate this month's earnings
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const thisMonthEarnings = commissions
      .filter(c => {
        const createdDate = new Date(c.createdAt)
        return createdDate >= startOfMonth
      })
      .reduce((sum, c) => sum + (c.amount || 0), 0)

    // Get payment history (group commissions by payment)
    const paymentHistory = commissions
      .filter(c => c.status === 'paid' && c.paymentReference)
      .reduce((acc, commission) => {
        const key = commission.paymentReference
        if (!acc[key]) {
          acc[key] = {
            id: key,
            amount: 0,
            paymentDate: commission.paymentDate,
            paymentMethod: commission.paymentMethod || 'bank_transfer',
            paymentReference: commission.paymentReference,
            commissionIds: []
          }
        }
        acc[key].amount += commission.amount
        acc[key].commissionIds.push(commission.id)
        return acc
      }, {} as Record<string, any>)

    // Get upcoming payments (approved commissions)
    const upcomingPayments = commissions.filter(c => c.status === 'approved')

    return NextResponse.json({
      commissions,
      totalEarnings,
      pendingAmount,
      paidAmount,
      thisMonthEarnings,
      paymentHistory: Object.values(paymentHistory),
      upcomingPayments
    })
  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commissions' },
      { status: 500 }
    )
  }
}