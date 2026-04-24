import { initDb, getDb } from "./_db.js";

const TIER_HIERARCHY = { "8k": 3, "4k": 2, "2k": 1 };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    await initDb();
    const db = getDb();

    const result = await db.execute({
      sql: `SELECT tier FROM payments WHERE email = ? ORDER BY created_at DESC`,
      args: [email.toLowerCase().trim()],
    });

    if (result.rows.length === 0) {
      return res.status(200).json({ unlocked: false, tier: null });
    }

    // Find the highest tier purchased
    let highestTier = null;
    let highestRank = 0;
    for (const row of result.rows) {
      const rank = TIER_HIERARCHY[row.tier] || 0;
      if (rank > highestRank) {
        highestRank = rank;
        highestTier = row.tier;
      }
    }

    // Determine which resolutions are unlocked
    const unlocks = {
      "2k": highestRank >= 1,
      "4k": highestRank >= 2,
      "8k": highestRank >= 3,
    };

    return res.status(200).json({
      unlocked: true,
      tier: highestTier,
      unlocks,
    });
  } catch (err) {
    console.error("check-unlock error:", err);
    return res.status(500).json({ error: "Check failed" });
  }
}
