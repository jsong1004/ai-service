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

    // Get contracts
    const contractsRef = db.collection('contracts')
    const contractsSnapshot = await contractsRef
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .get()

    const contracts = contractsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
      contractDate: doc.data().contractDate?.toDate().toISOString(),
      startDate: doc.data().startDate?.toDate().toISOString(),
      endDate: doc.data().endDate?.toDate().toISOString()
    }))

    // Calculate summary stats
    const totalCount = contracts.length
    const totalValue = contracts.reduce((sum, contract) => sum + (contract.amount || 0), 0)
    const activeCount = contracts.filter(contract => contract.status === 'active').length
    const completedCount = contracts.filter(contract => contract.status === 'completed').length

    return NextResponse.json({
      contracts,
      totalCount,
      totalValue,
      activeCount,
      completedCount
    })
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}