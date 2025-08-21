'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  Shield, 
  Eye, 
  Mail, 
  Globe, 
  Trash2, 
  Download,
  Key,
  Smartphone,
  Monitor
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  commissionAlerts: boolean
  newClientAlerts: boolean
  systemUpdates: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'team'
  showEmail: boolean
  showPhone: boolean
  dataCollection: boolean
  analytics: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  loginNotifications: boolean
  deviceTrust: boolean
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    commissionAlerts: true,
    newClientAlerts: true,
    systemUpdates: true,
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'team',
    showEmail: false,
    showPhone: false,
    dataCollection: true,
    analytics: true,
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceTrust: false,
  })

  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('UTC')
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated') {
      loadSettings()
    }
  }, [status, router])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        if (data.notifications) setNotifications(data.notifications)
        if (data.privacy) setPrivacy(data.privacy)
        if (data.security) setSecurity(data.security)
        if (data.preferences) {
          setLanguage(data.preferences.language || 'en')
          setTimezone(data.preferences.timezone || 'UTC')
          setCurrency(data.preferences.currency || 'USD')
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const settingsData = {
        notifications,
        privacy,
        security,
        preferences: {
          language,
          timezone,
          currency,
        }
      }

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      })

      if (response.ok) {
        setSuccess('Settings saved successfully!')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to save settings')
      }
    } catch (error) {
      setError('Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsLoading(true)
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess('Data export initiated. You will receive an email with your data shortly.')
    } catch (error) {
      setError('Failed to export data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    
    if (confirmed) {
      setIsLoading(true)
      try {
        // Simulate account deletion
        await new Promise(resolve => setTimeout(resolve, 2000))
        setSuccess('Account deletion initiated. You will receive confirmation via email.')
      } catch (error) {
        setError('Failed to delete account. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (status === 'loading') {
    return (
      <DashboardLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        {/* Alert Messages */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={() => handleNotificationChange('pushNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Get weekly performance and activity reports
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={() => handleNotificationChange('weeklyReports')}
                />
              </div>

              {session?.user?.role === 'affiliate' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Commission Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn new commissions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.commissionAlerts}
                      onCheckedChange={() => handleNotificationChange('commissionAlerts')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Client Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new clients are referred through your link
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newClientAlerts}
                      onCheckedChange={() => handleNotificationChange('newClientAlerts')}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about system updates and maintenance
                  </p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={() => handleNotificationChange('systemUpdates')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <div>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                  Control your privacy and data sharing preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select 
                  value={privacy.profileVisibility} 
                  onValueChange={(value: any) => handlePrivacyChange('profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Who can see your profile information
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Email Address</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your email on your public profile
                  </p>
                </div>
                <Switch
                  checked={privacy.showEmail}
                  onCheckedChange={(value) => handlePrivacyChange('showEmail', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Phone Number</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your phone number on your public profile
                  </p>
                </div>
                <Switch
                  checked={privacy.showPhone}
                  onCheckedChange={(value) => handlePrivacyChange('showPhone', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow collection of usage data for improvement
                  </p>
                </div>
                <Switch
                  checked={privacy.dataCollection}
                  onCheckedChange={(value) => handlePrivacyChange('dataCollection', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable analytics to help improve your experience
                  </p>
                </div>
                <Switch
                  checked={privacy.analytics}
                  onCheckedChange={(value) => handlePrivacyChange('analytics', value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security and authentication settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(value) => handleSecurityChange('twoFactorAuth', value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Monitor className="h-4 w-4 mr-2" />
                  Session Timeout (minutes)
                </Label>
                <Select 
                  value={security.sessionTimeout.toString()} 
                  onValueChange={(value) => handleSecurityChange('sessionTimeout', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Automatically sign out after this period of inactivity
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <div>
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone signs into your account
                    </p>
                  </div>
                </div>
                <Switch
                  checked={security.loginNotifications}
                  onCheckedChange={(value) => handleSecurityChange('loginNotifications', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  <div>
                    <Label>Trusted Devices</Label>
                    <p className="text-sm text-muted-foreground">
                      Remember this device for 30 days
                    </p>
                  </div>
                </div>
                <Switch
                  checked={security.deviceTrust}
                  onCheckedChange={(value) => handleSecurityChange('deviceTrust', value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your language, timezone, and regional settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Account */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Account</CardTitle>
            <CardDescription>
              Manage your data and account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <Label>Export Your Data</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of all your data
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                  Export Data
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="space-y-0.5">
                  <div className="flex items-center text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    <Label>Delete Account</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount} 
                  disabled={isLoading}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}