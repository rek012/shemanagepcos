-- Schema for PCOS Health App D1 Database
-- Database: dbpcos
-- Binding: dbbindings

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    user_type TEXT NOT NULL DEFAULT 'user' CHECK(user_type IN ('admin', 'user')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Login history table for tracking user logins
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

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_login_history_login_time ON login_history(login_time);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Default admin user (password: Admin@123)
-- Note: In production, use proper password hashing
INSERT OR IGNORE INTO users (email, password, username, user_type) 
VALUES ('admin@pcos.com', 'Admin@123', 'Admin', 'admin');

-- Default regular user (password: User@123)
INSERT OR IGNORE INTO users (email, password, username, user_type) 
VALUES ('user@pcos.com', 'User@123', 'User', 'user');
