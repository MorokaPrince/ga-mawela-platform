import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface User {
    role: string
  }
  interface Session {
    user: {
      id: string
      role: string
    } & {
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Simple admin check - replace with real authentication logic
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'admin123') {
          return { id: '1', email: 'admin@example.com', role: 'admin' }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
})

export { auth as GET, auth as POST }