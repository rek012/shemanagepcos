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

// Generate mock data for when D1 is unavailable
function generateMockData(date: string, limit: number) {
  const mockLogins: Array<{
    id: string;
    userId: string;
    username: string;
    email: string;
    loginTime: string;
    ipAddress: string;
    device: string;
  }> = [];
  
  const now = new Date(date);
  const devices = ['Chrome', 'Firefox', 'Safari', 'Edge'];
  
  for (let i = 0; i < Math.min(limit, 15); i++) {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const loginDate = new Date(now);
    loginDate.setHours(randomHour, randomMinute, 0, 0);
    
    mockLogins.push({
      id: `login-${i + 1}`,
      userId: `user-${Math.floor(Math.random() * 5) + 1}`,
      username: ['Admin', 'User'][Math.floor(Math.random() * 2)],
      email: ['admin@pcos.com', 'user@pcos.com'][Math.floor(Math.random() * 2)],
      loginTime: loginDate.toISOString(),
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      device: devices[Math.floor(Math.random() * 4)]
    });
  }

  mockLogins.sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime());

  const hourlyMap = new Map<number, number>();
  for (let i = 0; i < 24; i++) hourlyMap.set(i, 0);
  
  mockLogins.forEach(login => {
    const hour = new Date(login.loginTime).getHours();
    hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
  });

  const hourlyData: HourlyCount[] = [];
  for (let i = 0; i < 24; i++) {
    hourlyData.push({ hour: i, count: hourlyMap.get(i) || 0 });
  }

  return {
    logins: mockLogins,
    stats: {
      total: mockLogins.length,
      today: mockLogins.filter(l => new Date(l.loginTime).toDateString() === new Date().toDateString()).length,
      thisWeek: mockLogins.length,
      thisMonth: mockLogins.length
    },
    hourlyData
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const limit = parseInt(searchParams.get('limit') || '50');

    // Try to get D1 database
    let db: D1Database | null = null;
    try {
      const ctx = await getCloudflareContext();
      db = (ctx.env as { dbbindings?: D1Database }).dbbindings || null;
    } catch (e) {
      console.log('Cloudflare context not available:', e);
    }

    if (db) {
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
    }

    // Fallback to mock data
    const mockData = generateMockData(date, limit);
    return NextResponse.json({ success: true, ...mockData });
  } catch (error) {
    console.error('Error fetching login data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch login data', details: String(error) },
      { status: 500 }
    );
  }
}
