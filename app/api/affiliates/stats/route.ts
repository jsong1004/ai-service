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

    const affiliateData = affiliateSnapshot.docs[0].data()

    // Get contract stats
    const contractsRef = db.collection('contracts')
    const contractsSnapshot = await contractsRef.where('affiliateId', '==', affiliateSnapshot.docs[0].id).get()

    const totalContracts = contractsSnapshot.size
    const activeContracts = contractsSnapshot.docs.filter(doc => 
      doc.data().status === 'active'
    ).length

    // Get negotiations count
    const negotiationsRef = db.collection('negotiations')
    const negotiationsSnapshot = await negotiationsRef.where('affiliateId', '==', affiliateSnapshot.docs[0].id).get()

    const activeNegotiations = negotiationsSnapshot.docs.filter(doc => 
      ['lead', 'qualification', 'proposal', 'negotiation'].includes(doc.data().stage)
    ).length

    // Calculate conversion rate
    const closedWon = negotiationsSnapshot.docs.filter(doc => 
      doc.data().stage === 'closed-won'
    ).length
    const totalNegotiations = negotiationsSnapshot.size
    const conversionRate = totalNegotiations > 0 ? Math.round((closedWon / totalNegotiations) * 100) : 0

    const stats = {
      totalEarnings: affiliateData.totalEarnings || 0,
      pendingEarnings: affiliateData.pendingEarnings || 0,
      paidEarnings: affiliateData.paidEarnings || 0,
      commissionRate: affiliateData.commissionRate || 10,
      totalContracts,
      activeContracts,
      activeNegotiations,
      conversionRate,
      status: affiliateData.status || 'pending'
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching affiliate stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}