'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { 
  Handshake, 
  Search, 
  Filter,
  Calendar,
  Target,
  TrendingUp,
  Plus,
  MessageSquare,
  Phone,
  Mail,
  Building,
  User,
  DollarSign
} from 'lucide-react'
import { Negotiation, Client } from '@/types/index'

interface NegotiationWithClient extends Negotiation {
  client: Client
}

interface NegotiationsPageData {
  negotiations: NegotiationWithClient[]
  totalCount: number
  averageValue: number
  conversionRate: number
  stageDistribution: Record<string, number>
}

interface NewLeadFormData {
  companyName: string
  contactPerson: string
  email: string
  phone?: string
  estimatedValue?: number
  notes: string
}

export default function NegotiationsPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<NegotiationsPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false)
  const [newLeadForm, setNewLeadForm] = useState<NewLeadFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    estimatedValue: undefined,
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchNegotiations()
  }, [])

  const fetchNegotiations = async () => {
    try {
      const response = await fetch('/api/affiliates/negotiations')
      if (response.ok) {
        const negotiationsData = await response.json()
        setData(negotiationsData)
      }
    } catch (error) {
      console.error('Error fetching negotiations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const response = await fetch('/api/affiliates/negotiations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLeadForm)
      })
      
      if (response.ok) {
        setShowNewLeadDialog(false)
        setNewLeadForm({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          estimatedValue: undefined,
          notes: ''
        })
        fetchNegotiations()
      }
    } catch (error) {
      console.error('Error creating lead:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'lead':
        return 'bg-gray-100 text-gray-800'
      case 'qualification':
        return 'bg-blue-100 text-blue-800'
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800'
      case 'negotiation':
        return 'bg-orange-100 text-orange-800'
      case 'closed-won':
        return 'bg-green-100 text-green-800'
      case 'closed-lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageLabel = (stage: string) => {
    return stage.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const filteredNegotiations = data?.negotiations?.filter(negotiation => {
    const matchesSearch = negotiation.client?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         negotiation.client?.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         negotiation.client?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === 'all' || negotiation.stage === stageFilter
    return matchesSearch && matchesStage
  }) || []

  if (loading) {
    return (
      <DashboardLayout title="Negotiations">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Negotiations">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                In pipeline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data?.averageValue || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Estimated value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Lead to contract
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(filteredNegotiations.reduce((sum, n) => sum + (n.estimatedValue || 0), 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Total estimated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lead Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle>Lead Pipeline</CardTitle>
                <CardDescription>
                  Track and manage your sales opportunities
                </CardDescription>
              </div>
              <Dialog open={showNewLeadDialog} onOpenChange={setShowNewLeadDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>
                      Create a new lead to start tracking your sales opportunity
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateLead} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          required
                          value={newLeadForm.companyName}
                          onChange={(e) => setNewLeadForm({...newLeadForm, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          required
                          value={newLeadForm.contactPerson}
                          onChange={(e) => setNewLeadForm({...newLeadForm, contactPerson: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={newLeadForm.email}
                          onChange={(e) => setNewLeadForm({...newLeadForm, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={newLeadForm.phone}
                          onChange={(e) => setNewLeadForm({...newLeadForm, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">Estimated Value (Optional)</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        placeholder="0"
                        value={newLeadForm.estimatedValue || ''}
                        onChange={(e) => setNewLeadForm({...newLeadForm, estimatedValue: e.target.value ? parseInt(e.target.value) : undefined})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Initial Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any relevant information about this lead..."
                        value={newLeadForm.notes}
                        onChange={(e) => setNewLeadForm({...newLeadForm, notes: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowNewLeadDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Create Lead'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="qualification">Qualification</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                  <SelectItem value="closed-lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Negotiations List */}
            {filteredNegotiations.length === 0 ? (
              <div className="text-center py-12">
                <Handshake className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No leads found</h3>
                <p className="text-muted-foreground mb-4">
                  {data?.totalCount === 0 
                    ? "Start building your sales pipeline by adding your first lead."
                    : "No leads match your search criteria."
                  }
                </p>
                <Button onClick={() => setShowNewLeadDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Lead
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNegotiations.map((negotiation) => (
                  <div key={negotiation.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <h3 className="font-medium">{negotiation.client?.companyName}</h3>
                          </div>
                          <Badge className={getStageColor(negotiation.stage)}>
                            {getStageLabel(negotiation.stage)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span><strong>Contact:</strong> {negotiation.client?.contactPerson}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>{negotiation.client?.email}</span>
                          </div>
                          {negotiation.client?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              <span>{negotiation.client.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {negotiation.estimatedValue && (
                            <span><strong>Est. Value:</strong> {formatCurrency(negotiation.estimatedValue)}</span>
                          )}
                          {negotiation.probability && (
                            <span><strong>Probability:</strong> {negotiation.probability}%</span>
                          )}
                          <span><strong>Last Contact:</strong> {formatDate(negotiation.lastContactDate)}</span>
                        </div>
                        {negotiation.nextFollowUp && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3 h-3 text-orange-500" />
                            <span className="text-orange-600">Next Follow-up: {formatDate(negotiation.nextFollowUp)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add Note
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Stage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}