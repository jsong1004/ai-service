import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/firestore'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, company, department, title, phone, role } = await request.json()

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Additional validation for client role
    if (role === 'client' && (!company || !department || !title || !phone)) {
      return NextResponse.json(
        { error: 'Company, department, title, and phone are required for client accounts' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const usersRef = db.collection('users')
    const existingUser = await usersRef.where('email', '==', email).get()

    if (!existingUser.empty) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user document
    const newUser: any = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      company: company || '',
      role,
      provider: 'credentials',
      emailVerified: false,
      profileComplete: true,
      createdAt: new Date(),
      lastLogin: new Date(),
    }

    // Add client-specific fields if role is client
    if (role === 'client') {
      newUser.department = department
      newUser.title = title
      newUser.phone = phone
    }

    const userDoc = await usersRef.add(newUser)

    // If user is an affiliate, create affiliate record
    if (role === 'affiliate') {
      const affiliatesRef = db.collection('affiliates')
      await affiliatesRef.add({
        userId: userDoc.id,
        commissionRate: 10, // Default 10%
        totalEarnings: 0,
        pendingEarnings: 0,
        paidEarnings: 0,
        paymentMethod: 'bank_transfer',
        status: 'pending', // Needs admin approval
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // If user is a client, create client record
    if (role === 'client') {
      const clientsRef = db.collection('clients')
      await clientsRef.add({
        userId: userDoc.id,
        companyName: company,
        contactPerson: `${firstName} ${lastName}`,
        email,
        phone,
        department,
        title,
        status: 'lead',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Log activity
    const activitiesRef = db.collection('activities')
    await activitiesRef.add({
      userId: userDoc.id,
      type: 'signup',
      description: `New ${role} account created`,
      metadata: { email, role },
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      userId: userDoc.id,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}