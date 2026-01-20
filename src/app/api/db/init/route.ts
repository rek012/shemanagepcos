import { NextResponse } from 'next/server';
import { getDatabase, initializeDatabase, DatabaseError } from '@/lib/db';

export const runtime = 'edge';

export async function POST() {
  try {
    const db = await getDatabase();
    const result = await initializeDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: result.tables,
      seededUsers: result.seededUsers.length > 0 ? result.seededUsers : 'No new users seeded (already exist)',
      defaultCredentials: [
        { email: 'admin@pcos.com', password: 'Admin@123', type: 'admin' },
        { email: 'user@pcos.com', password: 'User@123', type: 'user' },
      ],
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 503 }
      );
    }

    console.error('Database initialization error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize database', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database initialization endpoint',
    usage: 'Send a POST request to initialize the database tables and seed default users',
    defaultUsers: [
      { email: 'admin@pcos.com', type: 'admin' },
      { email: 'user@pcos.com', type: 'user' },
    ],
  });
}
