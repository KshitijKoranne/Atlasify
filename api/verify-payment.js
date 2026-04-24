import crypto from "crypto";
import { initDb, getDb } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      tier,
      email,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }
    if (!tier || !["2k", "4k", "8k"].includes(tier)) {
      return res.status(400).json({ error: "Invalid tier" });
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Store in DB
    await initDb();
    const db = getDb();

    const amounts = { "2k": 99, "4k": 120, "8k": 150 };

    await db.execute({
      sql: `INSERT OR IGNORE INTO payments (email, tier, amount, razorpay_payment_id, razorpay_order_id) VALUES (?, ?, ?, ?, ?)`,
      args: [
        email.toLowerCase().trim(),
        tier,
        amounts[tier],
        razorpay_payment_id,
        razorpay_order_id,
      ],
    });

    return res.status(200).json({
      verified: true,
      tier,
      email: email.toLowerCase().trim(),
    });
  } catch (err) {
    console.error("verify-payment error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
