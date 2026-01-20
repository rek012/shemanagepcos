import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabase,
  authenticateUser,
  recordLogin,
  getClientIP,
  getUserAgent,
  AuthenticationError,
  DatabaseError,
} from '@/lib/db';

export const runtime = 'edge';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json() as LoginRequest;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
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

    // Get database connection
    const db = await getDatabase();

    // Authenticate user
    const user = await authenticateUser(db, email.toLowerCase().trim(), password);

    // Record login history (non-blocking, continue even if it fails)
    const ipAddress = getClientIP(request.headers);
    const userAgent = getUserAgent(request.headers);

    try {
      await recordLogin(db, user, { ip_address: ipAddress, user_agent: userAgent });
    } catch (historyError) {
      console.error('Failed to record login history:', historyError);
      // Continue - login history is non-critical
    }

    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.user_type,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    if (error instanceof DatabaseError) {
      console.error('Database error during login:', error);
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Handle unexpected errors
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
