import Razorpay from "razorpay";
import { initDb } from "./_db.js";

const TIERS = {
  "2k": { amount: 9900, description: "Atlasify 2K Export" },
  "4k": { amount: 12000, description: "Atlasify 4K Export (includes 2K)" },
  "8k": { amount: 15000, description: "Atlasify 8K Export (includes 2K + 4K)" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { tier, email } = req.body;

    if (!tier || !TIERS[tier]) {
      return res.status(400).json({ error: "Invalid tier. Must be 2k, 4k, or 8k." });
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required." });
    }

    await initDb();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: TIERS[tier].amount,
      currency: "INR",
      receipt: `atlasify_${tier}_${Date.now()}`,
      notes: {
        tier,
        email,
        product: "Atlasify Hi-Res Export",
      },
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      tier,
      description: TIERS[tier].description,
    });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}
