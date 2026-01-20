import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// D1 Database initialization endpoint
// This creates the necessary tables if they don't exist and seeds default admin

export const runtime = 'edge';

export async function POST() {
  try {
    // Get D1 binding from Cloudflare context
    const { env } = await getCloudflareContext();
    const db = (env as { dbbindings?: D1Database }).dbbindings;

    if (!db) {
      return NextResponse.json(
        { error: 'Database binding not found' },
        { status: 500 }
      );
    }

    // Create users table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        username TEXT NOT NULL,
        user_type TEXT NOT NULL DEFAULT 'user' CHECK(user_type IN ('admin', 'user')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create login_history table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS login_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        device TEXT,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create index for faster queries on login_history
    await db.exec(`
      CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
    `);

    await db.exec(`
      CREATE INDEX IF NOT EXISTS idx_login_history_login_time ON login_history(login_time);
    `);

    // Check if default admin exists
    const existingAdmin = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind('admin@pcos.com')
      .first();

    if (!existingAdmin) {
      // Insert default admin user
      // Note: In production, use proper password hashing (bcrypt, argon2, etc.)
      await db
        .prepare(
          'INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)'
        )
        .bind('admin@pcos.com', 'Admin@123', 'Admin', 'admin')
        .run();
    }

    // Check if default user exists
    const existingUser = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind('user@pcos.com')
      .first();

    if (!existingUser) {
      // Insert default regular user
      await db
        .prepare(
          'INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)'
        )
        .bind('user@pcos.com', 'User@123', 'User', 'user')
        .run();
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: ['users', 'login_history'],
      defaultUsers: [
        { email: 'admin@pcos.com', type: 'admin' },
        { email: 'user@pcos.com', type: 'user' }
      ]
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST request to initialize the database'
  });
}
