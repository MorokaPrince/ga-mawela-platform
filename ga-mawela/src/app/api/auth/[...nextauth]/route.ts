/**
 * NextAuth Configuration with MongoDB
 * Handles user authentication and session management
 */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    id: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const usersCollection = await getCollection(COLLECTIONS.USERS);
          const user = await usersCollection.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          // Check if user is active
          if (user.status !== 'active') {
            return null;
          }

          // Verify password (if stored as hash)
          // For now, simple comparison - in production, use bcrypt
          const passwordMatch = credentials.password === user.password ||
            (user.password && await bcrypt.compare(credentials.password, user.password));

          if (!passwordMatch) {
            return null;
          }

          // Update last login
          await usersCollection.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
          );

          return {
            id: user._id?.toString() || '',
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { auth as GET, auth as POST };