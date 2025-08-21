import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: 'admin' | 'affiliate' | 'client'
      profileComplete?: boolean
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role?: 'admin' | 'affiliate' | 'client'
    profileComplete?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: 'admin' | 'affiliate' | 'client'
    profileComplete?: boolean
  }
}