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

    if (session.user.role !== 'client') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Get client data
    const clientsRef = db.collection('clients')
    const clientSnapshot = await clientsRef.where('email', '==', session.user.email).get()

    if (clientSnapshot.empty) {
      return NextResponse.json(
        { error: 'Client profile not found' },
        { status: 404 }
      )
    }

    const clientId = clientSnapshot.docs[0].id

    // Get contract stats
    const contractsRef = db.collection('contracts')
    const contractsSnapshot = await contractsRef.where('clientId', '==', clientId).get()

    const totalContracts = contractsSnapshot.size
    const activeContracts = contractsSnapshot.docs.filter(doc => 
      doc.data().status === 'active'
    ).length
    const completedContracts = contractsSnapshot.docs.filter(doc => 
      doc.data().status === 'completed'
    ).length

    // Calculate total spent
    const totalSpent = contractsSnapshot.docs.reduce((sum, doc) => {
      const data = doc.data()
      return sum + (data.amount || 0)
    }, 0)

    // Calculate current month spending
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const currentMonthSpent = contractsSnapshot.docs.reduce((sum, doc) => {
      const data = doc.data()
      const contractDate = data.contractDate?.toDate ? data.contractDate.toDate() : new Date(data.contractDate)
      
      if (contractDate >= currentMonth) {
        return sum + (data.amount || 0)
      }
      return sum
    }, 0)

    // Find next payment (mock data for now)
    const activeContractDocs = contractsSnapshot.docs.filter(doc => 
      doc.data().status === 'active'
    )

    let nextPaymentDate = null
    let nextPaymentAmount = 0

    if (activeContractDocs.length > 0) {
      // Calculate next payment date (30 days from now for demo)
      nextPaymentDate = new Date()
      nextPaymentDate.setDate(nextPaymentDate.getDate() + 30)
      
      // Sum of monthly charges (simplified calculation)
      nextPaymentAmount = activeContractDocs.reduce((sum, doc) => {
        const data = doc.data()
        return sum + Math.round((data.amount || 0) / 12) // Assume annual contracts divided by 12
      }, 0)
    }

    const stats = {
      totalContracts,
      activeContracts,
      completedContracts,
      totalSpent,
      currentMonthSpent,
      nextPaymentDate: nextPaymentDate?.toISOString() || null,
      nextPaymentAmount
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching client stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}