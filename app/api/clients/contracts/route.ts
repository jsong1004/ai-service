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

    // Get contracts
    const contractsRef = db.collection('contracts')
    const contractsSnapshot = await contractsRef
      .where('clientId', '==', clientId)
      .orderBy('createdAt', 'desc')
      .get()

    const contracts = contractsSnapshot.docs.map(doc => {
      const data = doc.data()
      
      // Calculate progress (simplified - based on days elapsed vs total duration)
      let progress = 0
      if (data.status === 'active' && data.startDate && data.endDate) {
        const startDate = data.startDate.toDate ? data.startDate.toDate() : new Date(data.startDate)
        const endDate = data.endDate.toDate ? data.endDate.toDate() : new Date(data.endDate)
        const now = new Date()
        
        const totalDuration = endDate.getTime() - startDate.getTime()
        const elapsed = now.getTime() - startDate.getTime()
        progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)))
      } else if (data.status === 'completed') {
        progress = 100
      }

      return {
        id: doc.id,
        contractNumber: data.contractNumber || doc.id.substr(0, 8).toUpperCase(),
        services: data.services || ['AI Automation'],
        amount: data.amount || 0,
        status: data.status || 'draft',
        startDate: data.startDate?.toDate?.()?.toISOString() || data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        endDate: data.endDate?.toDate?.()?.toISOString() || null,
        progress
      }
    })

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error('Error fetching client contracts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}