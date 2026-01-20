import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  user_type: 'admin' | 'user';
}

// Fallback credentials for local development when D1 is unavailable
const DEV_USERS = [
  { id: 1, email: 'admin@pcos.com', password: 'Admin@123', username: 'Admin', user_type: 'admin' as const },
  { id: 2, email: 'user@pcos.com', password: 'User@123', username: 'User', user_type: 'user' as const }
];

async function getDatabase(): Promise<D1Database | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext();
    return (env as { dbbindings?: D1Database }).dbbindings || null;
  } catch {
    // Cloudflare context not available (local dev without Miniflare)
    return null;
  }
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

    // If database is available, use it
    if (db) {
      // Find user by email
      const user = await db
        .prepare('SELECT id, email, password, username, user_type FROM users WHERE email = ?')
        .bind(email)
        .first<User>();

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Check password (in production, use proper password comparison with hashing)
      if (user.password !== password) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Get client info for login history
      const ipAddress = request.headers.get('x-forwarded-for') || 
                        request.headers.get('cf-connecting-ip') || 
                        'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      const device = parseDevice(userAgent);

      // Record login in history
      await db
        .prepare(
          'INSERT INTO login_history (user_id, username, email, ip_address, device, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
        )
        .bind(user.id, user.username, user.email, ipAddress, device, userAgent)
        .run();

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          userType: user.user_type
        }
      });
    }

    // Fallback to hardcoded users for local development
    const devUser = DEV_USERS.find(u => u.email === email && u.password === password);
    
    if (!devUser) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: devUser.id,
        email: devUser.email,
        username: devUser.username,
        userType: devUser.user_type
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
