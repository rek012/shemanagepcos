import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'edge';

interface LoginRecord {
  id: number;
  user_id: number;
  username: string;
  email: string;
  login_time: string;
  ip_address: string;
  device: string;
}

interface HourlyCount {
  hour: number;
  count: number;
}

async function getDatabase(): Promise<D1Database> {
  const ctx = await getCloudflareContext();
  const db = (ctx.env as { dbbindings?: D1Database }).dbbindings;
  if (!db) {
    throw new Error('D1 database binding not found');
  }
  return db;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const limit = parseInt(searchParams.get('limit') || '50');

    const db = await getDatabase();

    const logins = await db
      .prepare(`
        SELECT id, user_id, username, email, login_time, ip_address, device
        FROM login_history
        ORDER BY login_time DESC
        LIMIT ?
      `)
      .bind(limit)
      .all<LoginRecord>();

    const totalResult = await db
      .prepare('SELECT COUNT(*) as count FROM login_history')
      .first<{ count: number }>();

    const todayResult = await db
      .prepare(`SELECT COUNT(*) as count FROM login_history WHERE DATE(login_time) = DATE('now')`)
      .first<{ count: number }>();

    const weekResult = await db
      .prepare(`SELECT COUNT(*) as count FROM login_history WHERE login_time >= DATE('now', '-7 days')`)
      .first<{ count: number }>();

    const monthResult = await db
      .prepare(`SELECT COUNT(*) as count FROM login_history WHERE login_time >= DATE('now', '-30 days')`)
      .first<{ count: number }>();

    const hourlyData = await db
      .prepare(`
        SELECT CAST(strftime('%H', login_time) AS INTEGER) as hour, COUNT(*) as count
        FROM login_history WHERE DATE(login_time) = ?
        GROUP BY hour ORDER BY hour
      `)
      .bind(date)
      .all<HourlyCount>();

    const hourlyMap = new Map(hourlyData.results?.map(h => [h.hour, h.count]) || []);
    const fullHourlyData: HourlyCount[] = [];
    for (let i = 0; i < 24; i++) {
      fullHourlyData.push({ hour: i, count: hourlyMap.get(i) || 0 });
    }

    return NextResponse.json({
      success: true,
      logins: logins.results?.map(login => ({
        id: `login-${login.id}`,
        userId: `user-${login.user_id}`,
        username: login.username,
        email: login.email,
        loginTime: login.login_time,
        ipAddress: login.ip_address,
        device: login.device
      })) || [],
      stats: {
        total: totalResult?.count || 0,
        today: todayResult?.count || 0,
        thisWeek: weekResult?.count || 0,
        thisMonth: monthResult?.count || 0
      },
      hourlyData: fullHourlyData
    });
  } catch (error) {
    console.error('Error fetching login data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch login data', details: String(error) },
      { status: 500 }
    );
  }
}
