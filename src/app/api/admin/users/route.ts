import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'edge';

interface User {
  id: number;
  email: string;
  username: string;
  user_type: 'admin' | 'user';
  created_at: string;
}

// GET all users
export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const db = (env as { dbbindings?: D1Database }).dbbindings;

    if (!db) {
      return NextResponse.json(
        { error: 'Database binding not found' },
        { status: 500 }
      );
    }

    const users = await db
      .prepare('SELECT id, email, username, user_type, created_at FROM users ORDER BY created_at DESC')
      .all<User>();

    return NextResponse.json({
      success: true,
      users: users.results || []
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: String(error) },
      { status: 500 }
    );
  }
}

// POST create new user
export async function POST(request: NextRequest) {
  try {
    const { email, password, username, userType } = await request.json() as {
      email: string;
      password: string;
      username: string;
      userType?: 'admin' | 'user';
    };

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    const db = (env as { dbbindings?: D1Database }).dbbindings;

    if (!db) {
      return NextResponse.json(
        { error: 'Database binding not found' },
        { status: 500 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Insert new user
    const result = await db
      .prepare(
        'INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)'
      )
      .bind(email, password, username, userType || 'user')
      .run();

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      userId: result.meta.last_row_id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: String(error) },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    const db = (env as { dbbindings?: D1Database }).dbbindings;

    if (!db) {
      return NextResponse.json(
        { error: 'Database binding not found' },
        { status: 500 }
      );
    }

    await db
      .prepare('DELETE FROM users WHERE id = ?')
      .bind(parseInt(userId))
      .run();

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user', details: String(error) },
      { status: 500 }
    );
  }
}
