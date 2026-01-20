import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Get D1 database instance from Cloudflare context
 * Use this in API routes to access the D1 database
 */
export async function getD1Database(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext();
    return (env as { dbbindings?: D1Database }).dbbindings || null;
  } catch (error) {
    console.error('Failed to get Cloudflare context:', error);
    return null;
  }
}

/**
 * Initialize database tables if they don't exist
 */
export async function initializeDatabase(db: D1Database): Promise<void> {
  // Create users table
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

  // Create login_history table
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

  // Create indexes
  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
  `);

  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_login_history_login_time ON login_history(login_time);
  `);

  // Seed default admin if not exists
  const existingAdmin = await db
    .prepare('SELECT id FROM users WHERE email = ?')
    .bind('admin@pcos.com')
    .first();

  if (!existingAdmin) {
    await db
      .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
      .bind('admin@pcos.com', 'Admin@123', 'Admin', 'admin')
      .run();
  }

  // Seed default user if not exists
  const existingUser = await db
    .prepare('SELECT id FROM users WHERE email = ?')
    .bind('user@pcos.com')
    .first();

  if (!existingUser) {
    await db
      .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
      .bind('user@pcos.com', 'User@123', 'User', 'user')
      .run();
  }
}
