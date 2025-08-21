'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Phone, Building2, MapPin, Calendar, Edit2, Save, X } from 'lucide-react'
import DashboardLayout from '@/components/dashboard-layout'

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  name: string
  image?: string
  role: 'affiliate' | 'client'
  company?: string
  department?: string
  title?: string
  phone?: string
  profileComplete: boolean
  createdAt: string
  lastLogin: string
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    department: '',
    title: '',
    phone: '',
    // Affiliate-specific fields
    expertise: '',
    linkedIn: '',
    marketingExperience: '',
    targetIndustries: '',
    website: '',
    // Client-specific fields
    companyWebsite: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/user')
      if (response.ok) {
        const userData = await response.json()
        setProfile(userData)
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          company: userData.company || '',
          department: userData.department || '',
          title: userData.title || '',
          phone: userData.phone || '',
          // Affiliate-specific fields
          expertise: userData.expertise || '',
          linkedIn: userData.linkedIn || '',
          marketingExperience: userData.marketingExperience || '',
          targetIndustries: userData.targetIndustries || '',
          website: userData.website || '',
          // Client-specific fields
          companyWebsite: userData.companyWebsite || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setProfile(updatedUser)
        setIsEditing(false)
        setSuccess('Profile updated successfully!')
        
        // Update the session to reflect changes
        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${formData.firstName} ${formData.lastName}`,
          }
        })
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update profile')
      }
    } catch (error) {
      setError('An error occurred while updating your profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        company: profile.company || '',
        department: profile.department || '',
        title: profile.title || '',
        phone: profile.phone || '',
        // Affiliate-specific fields
        expertise: profile.expertise || '',
        linkedIn: profile.linkedIn || '',
        marketingExperience: profile.marketingExperience || '',
        targetIndustries: profile.targetIndustries || '',
        website: profile.website || '',
        // Client-specific fields
        companyWebsite: profile.companyWebsite || '',
      })
    }
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'affiliate':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'client':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <DashboardLayout title="Profile">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profile) {
    return (
      <DashboardLayout title="Profile">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.image} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <Badge className={getRoleBadgeColor(profile.role)}>
                      {profile.role === 'affiliate' ? 'Affiliate Partner' : 'Business Client'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{profile.email}</p>
                  {profile.company && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {profile.company}
                    </p>
                  )}
                </div>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

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

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Manage your personal details and contact information
                </CardDescription>
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" disabled={isSaving}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.firstName || 'Not specified'}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.lastName || 'Not specified'}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                  <Badge variant="outline" className="ml-auto">Verified</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    disabled={isSaving}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone || 'Not specified'}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    disabled={isSaving}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.company || 'Not specified'}</span>
                  </div>
                )}
              </div>

              {profile.role === 'client' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    {isEditing ? (
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Your department"
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.department || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    {isEditing ? (
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Your job title"
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.title || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {profile.role === 'affiliate' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Background & Expertise</Label>
                    {isEditing ? (
                      <Textarea
                        id="expertise"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        placeholder="Tell us about your professional background and areas of expertise..."
                        rows={3}
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-muted-foreground mt-1" />
                        <span>{profile.expertise || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                    {isEditing ? (
                      <Input
                        id="linkedIn"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.linkedIn || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://yourwebsite.com"
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.website || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetIndustries">Target Industries</Label>
                    {isEditing ? (
                      <Textarea
                        id="targetIndustries"
                        name="targetIndustries"
                        value={formData.targetIndustries}
                        onChange={handleInputChange}
                        placeholder="Which industries do you have the best connections with?"
                        rows={2}
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <Building2 className="h-4 w-4 text-muted-foreground mt-1" />
                        <span>{profile.targetIndustries || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketingExperience">Marketing Experience</Label>
                    {isEditing ? (
                      <Textarea
                        id="marketingExperience"
                        name="marketingExperience"
                        value={formData.marketingExperience}
                        onChange={handleInputChange}
                        placeholder="Your experience with digital marketing, sales, or business development..."
                        rows={2}
                        disabled={isSaving}
                      />
                    ) : (
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <User className="h-4 w-4 text-muted-foreground mt-1" />
                        <span>{profile.marketingExperience || 'Not specified'}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Your account information and activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Member Since</Label>
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Last Login</Label>
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(profile.lastLogin).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Profile Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge className={profile.profileComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {profile.profileComplete ? 'Complete' : 'Incomplete'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}