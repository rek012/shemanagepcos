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

async function getDatabase(): Promise<D1Database> {
  const ctx = await getCloudflareContext();
  const db = (ctx.env as { dbbindings?: D1Database }).dbbindings;
  if (!db) {
    throw new Error('D1 database binding not found');
  }
  return db;
}

// GET all users
export async function GET() {
  try {
    const db = await getDatabase();

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
    const body = await request.json() as {
      email: string;
      password: string;
      username: string;
      userType?: 'admin' | 'user';
    };

    const { email, password, username, userType } = body;

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

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
      .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
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

// PUT update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as {
      id: number;
      email?: string;
      password?: string;
      username?: string;
      userType?: 'admin' | 'user';
    };

    const { id, email, password, username, userType } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Build update query dynamically
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (password) {
      updates.push('password = ?');
      values.push(password);
    }
    if (username) {
      updates.push('username = ?');
      values.push(username);
    }
    if (userType) {
      updates.push('user_type = ?');
      values.push(userType);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    if (updates.length === 1) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    await db
      .prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', details: String(error) },
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

    const db = await getDatabase();

    // Don't allow deleting the default admin
    const user = await db
      .prepare('SELECT email FROM users WHERE id = ?')
      .bind(parseInt(userId))
      .first<{ email: string }>();

    if (user?.email === 'admin@pcos.com') {
      return NextResponse.json(
        { error: 'Cannot delete the default admin user' },
        { status: 403 }
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
