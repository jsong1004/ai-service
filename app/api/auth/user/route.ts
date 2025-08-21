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

    // Get user data from Firestore
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', session.user.email).get()

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = snapshot.docs[0].data()

    return NextResponse.json({
      id: snapshot.docs[0].id,
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      name: userData.name || `${userData.firstName} ${userData.lastName}`,
      role: userData.role,
      profileComplete: userData.profileComplete || false,
      company: userData.company || '',
      department: userData.department || '',
      title: userData.title || '',
      phone: userData.phone || '',
      image: userData.image || '',
      provider: userData.provider,
      // Affiliate-specific fields
      expertise: userData.expertise || '',
      linkedIn: userData.linkedIn || '',
      marketingExperience: userData.marketingExperience || '',
      targetIndustries: userData.targetIndustries || '',
      website: userData.website || '',
      // Client-specific fields
      companyWebsite: userData.companyWebsite || '',
      createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      lastLogin: userData.lastLogin?.toDate?.()?.toISOString() || new Date().toISOString(),
    })
  } catch (error) {
    console.error('User API error:', error)
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      firstName, 
      lastName, 
      company, 
      department, 
      title, 
      phone,
      expertise,
      linkedIn,
      marketingExperience,
      targetIndustries,
      website,
      companyWebsite
    } = await request.json()

    // Get user document from Firestore
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', session.user.email).get()

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userDoc = snapshot.docs[0]
    const userData = userDoc.data()

    // Update user profile
    const updateData: any = {
      firstName: firstName || '',
      lastName: lastName || '',
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      company: company || '',
      phone: phone || '',
      updatedAt: new Date(),
    }

    // Add client-specific fields if user is a client
    if (userData.role === 'client') {
      updateData.department = department || ''
      updateData.title = title || ''
      updateData.companyWebsite = companyWebsite || ''
      updateData.linkedIn = linkedIn || ''
    }

    // Add affiliate-specific fields if user is an affiliate
    if (userData.role === 'affiliate') {
      updateData.expertise = expertise || ''
      updateData.linkedIn = linkedIn || ''
      updateData.marketingExperience = marketingExperience || ''
      updateData.targetIndustries = targetIndustries || ''
      updateData.website = website || ''
    }

    await userDoc.ref.update(updateData)

    // Return updated user data
    const updatedUserData = {
      ...userData,
      ...updateData,
    }

    return NextResponse.json({
      id: userDoc.id,
      email: updatedUserData.email,
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      name: updatedUserData.name,
      role: updatedUserData.role,
      profileComplete: updatedUserData.profileComplete || false,
      company: updatedUserData.company,
      department: updatedUserData.department || '',
      title: updatedUserData.title || '',
      phone: updatedUserData.phone,
      image: updatedUserData.image || '',
      provider: updatedUserData.provider,
      // Affiliate-specific fields
      expertise: updatedUserData.expertise || '',
      linkedIn: updatedUserData.linkedIn || '',
      marketingExperience: updatedUserData.marketingExperience || '',
      targetIndustries: updatedUserData.targetIndustries || '',
      website: updatedUserData.website || '',
      // Client-specific fields
      companyWebsite: updatedUserData.companyWebsite || '',
      createdAt: updatedUserData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      lastLogin: updatedUserData.lastLogin?.toDate?.()?.toISOString() || new Date().toISOString(),
    })
  } catch (error) {
    console.error('User update error:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
