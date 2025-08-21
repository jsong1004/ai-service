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

    // Get negotiations with client data
    const negotiationsRef = db.collection('negotiations')
    const negotiationsSnapshot = await negotiationsRef
      .where('affiliateId', '==', affiliateId)
      .orderBy('updatedAt', 'desc')
      .get()

    const negotiations = []
    for (const negotiationDoc of negotiationsSnapshot.docs) {
      const negotiationData = negotiationDoc.data()
      
      // Get client data
      const clientRef = db.collection('clients').doc(negotiationData.clientId)
      const clientDoc = await clientRef.get()
      const clientData = clientDoc.exists ? clientDoc.data() : null

      negotiations.push({
        id: negotiationDoc.id,
        ...negotiationData,
        client: clientData ? {
          id: clientDoc.id,
          ...clientData,
          createdAt: clientData.createdAt?.toDate().toISOString(),
          updatedAt: clientData.updatedAt?.toDate().toISOString()
        } : null,
        lastContactDate: negotiationData.lastContactDate?.toDate().toISOString(),
        nextFollowUp: negotiationData.nextFollowUp?.toDate().toISOString(),
        createdAt: negotiationData.createdAt?.toDate().toISOString(),
        updatedAt: negotiationData.updatedAt?.toDate().toISOString()
      })
    }

    // Calculate summary stats
    const totalCount = negotiations.length
    const averageValue = negotiations.length > 0 
      ? negotiations.reduce((sum, n) => sum + (n.estimatedValue || 0), 0) / negotiations.length
      : 0
    
    const closedWon = negotiations.filter(n => n.stage === 'closed-won').length
    const conversionRate = totalCount > 0 ? Math.round((closedWon / totalCount) * 100) : 0

    // Stage distribution
    const stageDistribution = negotiations.reduce((acc, n) => {
      acc[n.stage] = (acc[n.stage] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      negotiations,
      totalCount,
      averageValue,
      conversionRate,
      stageDistribution
    })
  } catch (error) {
    console.error('Error fetching negotiations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch negotiations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const { companyName, contactPerson, email, phone, estimatedValue, notes } = await request.json()

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

    // Create client
    const clientData = {
      userId: '', // Will be filled when client signs up
      companyName,
      contactPerson,
      email,
      phone: phone || '',
      status: 'lead',
      affiliateId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const clientRef = await db.collection('clients').add(clientData)

    // Create negotiation
    const negotiationData = {
      clientId: clientRef.id,
      affiliateId,
      stage: 'lead',
      estimatedValue: estimatedValue || 0,
      probability: 25, // Default probability for leads
      notes: notes ? [{
        id: Date.now().toString(),
        note: notes,
        createdBy: userId,
        createdAt: new Date(),
        type: 'general'
      }] : [],
      lastContactDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const negotiationRef = await db.collection('negotiations').add(negotiationData)

    return NextResponse.json({
      success: true,
      negotiationId: negotiationRef.id,
      clientId: clientRef.id
    })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}