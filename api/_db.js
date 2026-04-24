import { createClient } from "@libsql/client";

let client = null;

export function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function initDb() {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      tier TEXT NOT NULL CHECK(tier IN ('2k', '4k', '8k')),
      amount INTEGER NOT NULL,
      razorpay_payment_id TEXT NOT NULL,
      razorpay_order_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(razorpay_payment_id)
    )
  `);
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email)
  `);
}
