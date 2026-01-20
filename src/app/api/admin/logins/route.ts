import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabase,
  getLoginHistory,
  getLoginStats,
  getHourlyLoginData,
  DatabaseError,
} from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 500); // Cap at 500

    const db = await getDatabase();

    // Fetch all data in parallel for better performance
    const [logins, stats, hourlyData] = await Promise.all([
      getLoginHistory(db, limit),
      getLoginStats(db),
      getHourlyLoginData(db, date),
    ]);

    return NextResponse.json({
      success: true,
      logins: logins.map(login => ({
        id: `login-${login.id}`,
        userId: `user-${login.user_id}`,
        username: login.username,
        email: login.email,
        loginTime: login.login_time,
        ipAddress: login.ip_address || 'unknown',
        device: login.device || 'unknown',
      })),
      stats,
      hourlyData,
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 503 }
      );
    }

    console.error('Error fetching login data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch login data' },
      { status: 500 }
    );
  }
}
