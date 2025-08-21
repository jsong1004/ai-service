import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/firestore'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      role, 
      company, 
      phone, 
      expertise, 
      linkedIn,
      marketingExperience,
      targetIndustries,
      // Affiliate social media fields
      twitter,
      facebook,
      instagram,
      youtube,
      tiktok,
      website,
      // Client fields
      department,
      title,
      companyWebsite,
      industry,
      companySize,
      businessChallenges,
      aiExperience
    } = await request.json()

    // Validate required fields
    if (!role) {
      return NextResponse.json(
        { error: 'Role is required' },
        { status: 400 }
      )
    }

    // Additional validation for client role
    if (role === 'client' && (!company || !title || !phone)) {
      return NextResponse.json(
        { error: 'Company, title, and phone are required for client accounts' },
        { status: 400 }
      )
    }

    // Update user document
    const usersRef = db.collection('users')
    const userSnapshot = await usersRef.where('email', '==', session.user.email).get()

    if (userSnapshot.empty) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userDoc = userSnapshot.docs[0]
    const userId = userDoc.id

    // Update user profile with role-specific fields
    const updateData: any = {
      role,
      company: company || '',
      phone: phone || '',
      profileComplete: true,
      updatedAt: new Date(),
    }

    // Add client-specific fields
    if (role === 'client') {
      updateData.department = department || ''
      updateData.title = title || ''
      updateData.companyWebsite = companyWebsite || ''
      updateData.linkedIn = linkedIn || ''
    }

    // Add affiliate-specific fields to user document
    if (role === 'affiliate') {
      updateData.expertise = expertise || ''
      updateData.linkedIn = linkedIn || ''
      updateData.marketingExperience = marketingExperience || ''
      updateData.targetIndustries = targetIndustries || ''
      updateData.website = website || ''
    }

    await userDoc.ref.update(updateData)

    // Create affiliate record if role is affiliate
    if (role === 'affiliate') {
      const affiliatesRef = db.collection('affiliates')
      const existingAffiliate = await affiliatesRef.where('userId', '==', userId).get()
      
      if (existingAffiliate.empty) {
        await affiliatesRef.add({
          userId,
          commissionRate: 10, // Default 10%
          totalEarnings: 0,
          pendingEarnings: 0,
          paidEarnings: 0,
          expertise: expertise || '',
          linkedIn: linkedIn || '',
          marketingExperience: marketingExperience || '',
          targetIndustries: targetIndustries || '',
          // Social media profiles
          twitter: twitter || '',
          facebook: facebook || '',
          instagram: instagram || '',
          youtube: youtube || '',
          tiktok: tiktok || '',
          website: website || '',
          paymentMethod: 'bank_transfer',
          status: 'pending', // Needs admin approval
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    // Create client record if role is client
    if (role === 'client') {
      const clientsRef = db.collection('clients')
      const existingClient = await clientsRef.where('email', '==', session.user.email).get()
      
      if (existingClient.empty) {
        const userData = userDoc.data()
        await clientsRef.add({
          userId,
          companyName: company,
          contactPerson: session.user.name || `${userData.firstName} ${userData.lastName}`,
          email: session.user.email,
          phone: phone || '',
          department: department || '',
          title: title || '',
          companyWebsite: companyWebsite || '',
          linkedIn: linkedIn || '',
          industry: industry || '',
          companySize: companySize || '',
          businessChallenges: businessChallenges || '',
          aiExperience: aiExperience || '',
          status: 'lead',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    // Log activity
    const activitiesRef = db.collection('activities')
    await activitiesRef.add({
      userId,
      type: 'profile_updated',
      description: 'Completed onboarding',
      metadata: { role, company },
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Profile completed successfully',
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to complete profile' },
      { status: 500 }
    )
  }
}