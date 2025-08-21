'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DebugSessionPage() {
  const { data: session, status } = useSession()

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Session Debug Information</CardTitle>
          <CardDescription>
            Current session data for troubleshooting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Status:</strong> {status}
          </div>
          
          {session ? (
            <div className="space-y-4">
              <div>
                <strong>Session exists:</strong> Yes
              </div>
              
              <div>
                <strong>User data:</strong>
                <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
                  {JSON.stringify(session.user, null, 2)}
                </pre>
              </div>
              
              <div>
                <strong>Full session:</strong>
                <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Navigation based on current data:</h3>
                <ul className="space-y-1">
                  <li>• Role: {session.user?.role || 'Not set'}</li>
                  <li>• Profile Complete: {session.user?.profileComplete ? 'Yes' : 'No'}</li>
                  <li>• Should redirect to: {
                    !session.user?.profileComplete && !session.user?.role
                      ? '/onboarding'
                      : session.user?.role === 'affiliate'
                      ? '/dashboard/affiliate'
                      : session.user?.role === 'client'
                      ? '/dashboard/client'
                      : '/dashboard (fallback)'
                  }</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <strong>Session exists:</strong> No
            </div>
          )}
          
          <div className="pt-4 space-x-2">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/onboarding">Go to Onboarding</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Go to Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}