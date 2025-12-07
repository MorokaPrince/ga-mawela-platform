/**
 * API Route: /api/auth/register
 * Handles user registration for community members
 */

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone, community, relationship } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection(COLLECTIONS.USERS);

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      email,
      password: hashedPassword,
      name,
      role: 'member',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false,
      profile: {
        phone: phone || '',
        community: community || '',
        relationship: relationship || '',
      },
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      message: 'Registration successful. You can now log in.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}

