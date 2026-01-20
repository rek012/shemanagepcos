const cloudflareContextSymbol = Symbol.for('__cloudflare-context__');

// ============================================================================
// Types
// ============================================================================

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  user_type: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface UserPublic {
  id: number;
  email: string;
  username: string;
  user_type: 'admin' | 'user';
  created_at: string;
}

export interface LoginRecord {
  id: number;
  user_id: number;
  username: string;
  email: string;
  login_time: string;
  ip_address: string | null;
  device: string | null;
  user_agent: string | null;
}

export interface HourlyCount {
  hour: number;
  count: number;
}

// ============================================================================
// Custom Errors
// ============================================================================

export class DatabaseError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// ============================================================================
// Database Connection
// ============================================================================

async function getCloudflareContextSafe(): Promise<{ env?: Cloudflare.Env } & Record<string, unknown>> {
  const global = globalThis as typeof globalThis & Record<string | symbol, unknown>;
  const ctx = global[cloudflareContextSymbol] as { env?: Cloudflare.Env } | undefined;
  if (ctx?.env) {
    return ctx as { env: Cloudflare.Env } & Record<string, unknown>;
  }

  throw new DatabaseError(
    'D1 database binding not found. Ensure the Cloudflare context is initialized and wrangler.jsonc has the dbbindings binding.'
  );
}

/**
 * Get D1 database instance from Cloudflare context
 * Throws an error if the database binding is not available
 */
export async function getDatabase(): Promise<D1Database> {
  const ctx = await getCloudflareContextSafe();
  const db = (ctx.env as Cloudflare.Env | undefined)?.dbbindings;

  if (!db) {
    throw new DatabaseError('D1 database binding not found. Check wrangler.jsonc configuration.');
  }

  return db;
}

/**
 * Get D1 database instance, returns null if not available (legacy support)
 */
export async function getD1Database(): Promise<D1Database | null> {
  try {
    return await getDatabase();
  } catch {
    return null;
  }
}

// ============================================================================
// User Operations
// ============================================================================

/**
 * Find user by email
 */
export async function findUserByEmail(db: D1Database, email: string): Promise<User | null> {
  const user = await db
    .prepare('SELECT id, email, password, username, user_type, created_at, updated_at FROM users WHERE email = ?')
    .bind(email)
    .first<User>();
  
  return user || null;
}

/**
 * Find user by ID
 */
export async function findUserById(db: D1Database, id: number): Promise<User | null> {
  const user = await db
    .prepare('SELECT id, email, password, username, user_type, created_at, updated_at FROM users WHERE id = ?')
    .bind(id)
    .first<User>();
  
  return user || null;
}

/**
 * Authenticate user with email and password
 * Returns the user if credentials are valid, throws AuthenticationError otherwise
 */
export async function authenticateUser(
  db: D1Database,
  email: string,
  password: string
): Promise<User> {
  const user = await findUserByEmail(db, email);
  
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  // Note: In production, use proper password hashing (bcrypt, argon2)
  if (user.password !== password) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  return user;
}

/**
 * Get all users (without password field)
 */
export async function getAllUsers(db: D1Database): Promise<UserPublic[]> {
  const result = await db
    .prepare('SELECT id, email, username, user_type, created_at FROM users ORDER BY created_at DESC')
    .all<UserPublic>();
  
  return result.results || [];
}

/**
 * Create a new user
 */
export async function createUser(
  db: D1Database,
  data: { email: string; password: string; username: string; user_type?: 'admin' | 'user' }
): Promise<number> {
  const existing = await findUserByEmail(db, data.email);
  if (existing) {
    throw new ValidationError('User with this email already exists');
  }
  
  const result = await db
    .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
    .bind(data.email, data.password, data.username, data.user_type || 'user')
    .run();
  
  return result.meta.last_row_id as number;
}

/**
 * Update user by ID
 */
export async function updateUser(
  db: D1Database,
  id: number,
  data: { email?: string; password?: string; username?: string; user_type?: 'admin' | 'user' }
): Promise<void> {
  const updates: string[] = [];
  const values: (string | number)[] = [];
  
  if (data.email) {
    updates.push('email = ?');
    values.push(data.email);
  }
  if (data.password) {
    updates.push('password = ?');
    values.push(data.password);
  }
  if (data.username) {
    updates.push('username = ?');
    values.push(data.username);
  }
  if (data.user_type) {
    updates.push('user_type = ?');
    values.push(data.user_type);
  }
  
  if (updates.length === 0) {
    throw new ValidationError('No fields to update');
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  await db
    .prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

/**
 * Delete user by ID
 */
export async function deleteUser(db: D1Database, id: number): Promise<void> {
  const user = await findUserById(db, id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  if (user.email === 'admin@pcos.com') {
    throw new ValidationError('Cannot delete the default admin user');
  }
  
  await db
    .prepare('DELETE FROM users WHERE id = ?')
    .bind(id)
    .run();
}

// ============================================================================
// Login History Operations
// ============================================================================

/**
 * Parse device/browser from user agent string
 */
export function parseDevice(userAgent: string): string {
  if (!userAgent) return 'Unknown';
  
  if (userAgent.includes('Edg/') || userAgent.includes('Edge/')) {
    return 'Edge';
  }
  if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
    return 'Opera';
  }
  if (userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
    return 'Chrome';
  }
  if (userAgent.includes('Firefox/')) {
    return 'Firefox';
  }
  if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
    return 'Safari';
  }
  
  return 'Other';
}

/**
 * Record a login event in history
 */
export async function recordLogin(
  db: D1Database,
  user: { id: number; username: string; email: string },
  metadata: { ip_address: string; user_agent: string }
): Promise<void> {
  const device = parseDevice(metadata.user_agent);
  
  await db
    .prepare(
      'INSERT INTO login_history (user_id, username, email, ip_address, device, user_agent) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .bind(user.id, user.username, user.email, metadata.ip_address, device, metadata.user_agent)
    .run();
}

/**
 * Get login history with optional limit
 */
export async function getLoginHistory(db: D1Database, limit: number = 50): Promise<LoginRecord[]> {
  const result = await db
    .prepare(`
      SELECT id, user_id, username, email, login_time, ip_address, device, user_agent
      FROM login_history
      ORDER BY login_time DESC
      LIMIT ?
    `)
    .bind(limit)
    .all<LoginRecord>();
  
  return result.results || [];
}

/**
 * Get login statistics
 */
export async function getLoginStats(db: D1Database): Promise<{
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}> {
  const [total, today, week, month] = await Promise.all([
    db.prepare('SELECT COUNT(*) as count FROM login_history').first<{ count: number }>(),
    db.prepare("SELECT COUNT(*) as count FROM login_history WHERE DATE(login_time) = DATE('now')").first<{ count: number }>(),
    db.prepare("SELECT COUNT(*) as count FROM login_history WHERE login_time >= DATE('now', '-7 days')").first<{ count: number }>(),
    db.prepare("SELECT COUNT(*) as count FROM login_history WHERE login_time >= DATE('now', '-30 days')").first<{ count: number }>(),
  ]);
  
  return {
    total: total?.count || 0,
    today: today?.count || 0,
    thisWeek: week?.count || 0,
    thisMonth: month?.count || 0,
  };
}

/**
 * Get hourly login counts for a specific date
 */
export async function getHourlyLoginData(db: D1Database, date: string): Promise<HourlyCount[]> {
  const result = await db
    .prepare(`
      SELECT CAST(strftime('%H', login_time) AS INTEGER) as hour, COUNT(*) as count
      FROM login_history
      WHERE DATE(login_time) = ?
      GROUP BY hour
      ORDER BY hour
    `)
    .bind(date)
    .all<HourlyCount>();
  
  // Fill in missing hours with 0
  const hourlyMap = new Map((result.results || []).map(h => [h.hour, h.count]));
  const fullHourlyData: HourlyCount[] = [];
  
  for (let i = 0; i < 24; i++) {
    fullHourlyData.push({ hour: i, count: hourlyMap.get(i) || 0 });
  }
  
  return fullHourlyData;
}

// ============================================================================
// Database Initialization
// ============================================================================

/**
 * Initialize database tables and seed default users
 */
export async function initializeDatabase(db: D1Database): Promise<{
  tables: string[];
  seededUsers: string[];
}> {
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

  // Create indexes for better query performance
  await db.exec('CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);');
  await db.exec('CREATE INDEX IF NOT EXISTS idx_login_history_login_time ON login_history(login_time);');
  await db.exec('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');

  const seededUsers: string[] = [];

  // Seed default admin
  const existingAdmin = await findUserByEmail(db, 'admin@pcos.com');
  if (!existingAdmin) {
    await db
      .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
      .bind('admin@pcos.com', 'Admin@123', 'Admin', 'admin')
      .run();
    seededUsers.push('admin@pcos.com');
  }

  // Seed default user
  const existingUser = await findUserByEmail(db, 'user@pcos.com');
  if (!existingUser) {
    await db
      .prepare('INSERT INTO users (email, password, username, user_type) VALUES (?, ?, ?, ?)')
      .bind('user@pcos.com', 'User@123', 'User', 'user')
      .run();
    seededUsers.push('user@pcos.com');
  }

  return {
    tables: ['users', 'login_history'],
    seededUsers,
  };
}

// ============================================================================
// Request Helpers
// ============================================================================

/**
 * Extract client IP from request headers (Cloudflare-aware)
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Extract user agent from request headers
 */
export function getUserAgent(headers: Headers): string {
  return headers.get('user-agent') || 'unknown';
}
