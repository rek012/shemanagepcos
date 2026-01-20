import { NextRequest, NextResponse } from 'next/server';

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

// Generate mock data for local development
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
  
  // Generate random logins
  for (let i = 0; i < Math.min(limit, 20); i++) {
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const loginDate = new Date(now);
    loginDate.setHours(randomHour, randomMinute, 0, 0);
    
    mockLogins.push({
      id: `login-${i + 1}`,
      userId: `user-${Math.floor(Math.random() * 5) + 1}`,
      username: ['Admin', 'User', 'TestUser'][Math.floor(Math.random() * 3)],
      email: ['admin@pcos.com', 'user@pcos.com', 'test@pcos.com'][Math.floor(Math.random() * 3)],
      loginTime: loginDate.toISOString(),
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      device: devices[Math.floor(Math.random() * 4)]
    });
  }

  // Sort by login time descending
  mockLogins.sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime());

  // Calculate hourly distribution
  const hourlyMap = new Map<number, number>();
  for (let i = 0; i < 24; i++) {
    hourlyMap.set(i, 0);
  }
  
  mockLogins.forEach(login => {
    const hour = new Date(login.loginTime).getHours();
    hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
  });

  const hourlyData: HourlyCount[] = [];
  for (let i = 0; i < 24; i++) {
    hourlyData.push({
      hour: i,
      count: hourlyMap.get(i) || 0
    });
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

    const db = await getDatabase();

    // If database is available, use it
    if (db) {
      // Get recent logins
      const logins = await db
        .prepare(`
          SELECT id, user_id, username, email, login_time, ip_address, device
          FROM login_history
          ORDER BY login_time DESC
          LIMIT ?
        `)
        .bind(limit)
        .all<LoginRecord>();

      // Get total login count
      const totalResult = await db
        .prepare('SELECT COUNT(*) as count FROM login_history')
        .first<{ count: number }>();

      // Get today's login count
      const todayResult = await db
        .prepare(`
          SELECT COUNT(*) as count FROM login_history 
          WHERE DATE(login_time) = DATE('now')
        `)
        .first<{ count: number }>();

      // Get this week's login count
      const weekResult = await db
        .prepare(`
          SELECT COUNT(*) as count FROM login_history 
          WHERE login_time >= DATE('now', '-7 days')
        `)
        .first<{ count: number }>();

      // Get this month's login count
      const monthResult = await db
        .prepare(`
          SELECT COUNT(*) as count FROM login_history 
          WHERE login_time >= DATE('now', '-30 days')
        `)
        .first<{ count: number }>();

      // Get hourly distribution for the selected date
      const hourlyData = await db
        .prepare(`
          SELECT 
            CAST(strftime('%H', login_time) AS INTEGER) as hour,
            COUNT(*) as count
          FROM login_history
          WHERE DATE(login_time) = ?
          GROUP BY hour
          ORDER BY hour
        `)
        .bind(date)
        .all<HourlyCount>();

      // Fill in missing hours with 0
      const hourlyMap = new Map(hourlyData.results?.map(h => [h.hour, h.count]) || []);
      const fullHourlyData: HourlyCount[] = [];
      for (let i = 0; i < 24; i++) {
        fullHourlyData.push({
          hour: i,
          count: hourlyMap.get(i) || 0
        });
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

    // Fallback to mock data for local development
    const mockData = generateMockData(date, limit);
    
    return NextResponse.json({
      success: true,
      ...mockData
    });
  } catch (error) {
    console.error('Error fetching login data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch login data', details: String(error) },
      { status: 500 }
    );
  }
}
