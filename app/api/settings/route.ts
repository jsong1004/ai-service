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

    // Get user settings from Firestore
    const settingsRef = db.collection('userSettings')
    const snapshot = await settingsRef.where('userId', '==', session.user.id).get()

    if (snapshot.empty) {
      // Return default settings if none exist
      const defaultSettings = {
        notifications: {
          emailNotifications: true,
          pushNotifications: false,
          weeklyReports: true,
          commissionAlerts: true,
          newClientAlerts: true,
          systemUpdates: true,
        },
        privacy: {
          profileVisibility: 'team',
          showEmail: false,
          showPhone: false,
          dataCollection: true,
          analytics: true,
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30,
          loginNotifications: true,
          deviceTrust: false,
        },
        preferences: {
          language: 'en',
          timezone: 'UTC',
          currency: 'USD',
        }
      }

      return NextResponse.json(defaultSettings)
    }

    const settingsData = snapshot.docs[0].data()
    return NextResponse.json(settingsData)
  } catch (error) {
    console.error('Settings API error:', error)
    return NextResponse.json(
      { error: 'Failed to get settings' },
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

    const settingsData = await request.json()

    // Get or create user settings document
    const settingsRef = db.collection('userSettings')
    const snapshot = await settingsRef.where('userId', '==', session.user.id).get()

    const updateData = {
      userId: session.user.id,
      ...settingsData,
      updatedAt: new Date(),
    }

    if (snapshot.empty) {
      // Create new settings document
      updateData.createdAt = new Date()
      await settingsRef.add(updateData)
    } else {
      // Update existing settings document
      const settingsDoc = snapshot.docs[0]
      await settingsDoc.ref.update(updateData)
    }

    // Log activity
    const activitiesRef = db.collection('activities')
    await activitiesRef.add({
      userId: session.user.id,
      type: 'settings_updated',
      description: 'Updated account settings',
      metadata: { settingsKeys: Object.keys(settingsData) },
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
    })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}