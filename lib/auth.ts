import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/firestore'

// Load service account key
const serviceAccount = require('../serviceAccountKey.json')

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Get user from Firestore
          const usersRef = db.collection('users')
          const snapshot = await usersRef.where('email', '==', credentials.email).get()
          
          if (snapshot.empty) {
            return null
          }

          const userDoc = snapshot.docs[0]
          const userData = userDoc.data()

          // Check if user uses OAuth
          if (userData.provider === 'google') {
            throw new Error('Please sign in with Google')
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, userData.password)
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: userDoc.id,
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            role: userData.role,
            image: userData.image
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  }),
  callbacks: {
    async session({ session, token }: any) {
      // Add user role and id to session
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.profileComplete = token.profileComplete
      }
      return session
    },
    async jwt({ token, user, account }: any) {
      // Persist user data in JWT
      if (user) {
        token.id = user.id
        token.role = user.role
        
        // Handle flags from signIn callback
        if (user.needsOnboarding) {
          token.needsOnboarding = true
          token.profileComplete = false
        } else if (user.profileComplete) {
          token.profileComplete = true
          token.needsOnboarding = false
        }
        
        // For new Google users, check if profile is complete
        if (account?.provider === 'google') {
          const usersRef = db.collection('users')
          const snapshot = await usersRef.where('email', '==', user.email).get()
          
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data()
            token.role = userData.role
            token.profileComplete = userData.profileComplete || false
            token.needsOnboarding = !userData.profileComplete
          } else {
            token.profileComplete = false
            token.needsOnboarding = true
          }
        }
      }
      return token
    },
    async redirect({ url, baseUrl, token }) {
      // Handle redirects after authentication
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl, 'token:', token)
      
      // For Google OAuth flow, check if user needs onboarding
      if (token && token.needsOnboarding) {
        console.log('User needs onboarding, redirecting to /onboarding')
        return `${baseUrl}/onboarding`
      }
      
      // If user has role, redirect to appropriate dashboard
      if (token && token.role && token.profileComplete) {
        if (token.role === 'affiliate') {
          return `${baseUrl}/dashboard/affiliate`
        } else if (token.role === 'client') {
          return `${baseUrl}/dashboard/client`
        }
      }
      
      // Allow specific redirect paths
      if (url === '/onboarding' || url === `${baseUrl}/onboarding`) {
        return `${baseUrl}/onboarding`
      }
      if (url === '/dashboard/affiliate' || url === `${baseUrl}/dashboard/affiliate`) {
        return `${baseUrl}/dashboard/affiliate`
      }
      if (url === '/dashboard/client' || url === `${baseUrl}/dashboard/client`) {
        return `${baseUrl}/dashboard/client`
      }
      
      // Handle callback URLs with onboarding
      if (url.includes('/onboarding')) {
        return `${baseUrl}/onboarding`
      }
      
      // Default handling
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    },
    async signIn({ user, account, profile }: any) {
      // Handle Google sign-in
      if (account?.provider === 'google') {
        try {
          const usersRef = db.collection('users')
          const snapshot = await usersRef.where('email', '==', user.email).get()
          
          if (snapshot.empty) {
            // Create new user document for first-time Google users
            const userDoc = await usersRef.add({
              email: user.email,
              firstName: profile.given_name || '',
              lastName: profile.family_name || '',
              name: user.name,
              image: user.image,
              provider: 'google',
              googleId: account.providerAccountId,
              emailVerified: true,
              profileComplete: false,
              createdAt: new Date(),
              lastLogin: new Date()
            })
            console.log('Created new Google user, should redirect to onboarding')
            // Store redirect intention in the user object
            user.needsOnboarding = true
          } else {
            // Update last login
            const userDoc = snapshot.docs[0]
            await userDoc.ref.update({
              lastLogin: new Date()
            })
            
            const userData = userDoc.data()
            console.log('Existing Google user, profile complete:', userData.profileComplete)
            // Check if profile is complete
            if (!userData.profileComplete) {
              user.needsOnboarding = true
            } else {
              user.role = userData.role
              user.profileComplete = true
            }
          }
        } catch (error) {
          console.error('Sign-in error:', error)
          return false
        }
      }
      
      return true
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
    newUser: '/onboarding'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}