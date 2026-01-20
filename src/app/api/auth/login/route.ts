import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'edge';

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  user_type: 'admin' | 'user';
}

async function getDatabase(): Promise<D1Database> {
  const ctx = await getCloudflareContext();
  const db = (ctx.env as { dbbindings?: D1Database }).dbbindings;
  if (!db) {
    throw new Error('D1 database binding not found');
  }
  return db;
}

function parseDevice(userAgent: string): string {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  } else if (userAgent.includes('Edg')) {
    return 'Edge';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    return 'Opera';
  }
  return 'Other';
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json() as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    const user = await db
      .prepare('SELECT id, email, password, username, user_type FROM users WHERE email = ?')
      .bind(email)
      .first<User>();

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Record login in history
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('cf-connecting-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const device = parseDevice(userAgent);

    try {
      await db
        .prepare(
          'INSERT INTO login_history (user_id, username, email, ip_address, device, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
        )
        .bind(user.id, user.username, user.email, ipAddress, device, userAgent)
        .run();
    } catch (historyError) {
      console.error('Failed to record login history:', historyError);
      // Continue even if history recording fails
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.user_type
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed', details: String(error) },
      { status: 500 }
    );
  }
}
