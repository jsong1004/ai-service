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

    // Get recent contracts
    const contractsRef = db.collection('contracts')
    const contractsSnapshot = await contractsRef
      .where('affiliateId', '==', affiliateId)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()

    const contracts = []

    for (const contractDoc of contractsSnapshot.docs) {
      const contractData = contractDoc.data()
      
      // Get client data
      const clientDoc = await db.collection('clients').doc(contractData.clientId).get()
      const clientData = clientDoc.exists ? clientDoc.data() : {}

      contracts.push({
        id: contractDoc.id,
        clientName: clientData?.companyName || clientData?.contactPerson || 'Unknown Client',
        amount: contractData.amount || 0,
        commission: contractData.commissionAmount || 0,
        status: contractData.status || 'draft',
        date: contractData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })
    }

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error('Error fetching recent contracts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}