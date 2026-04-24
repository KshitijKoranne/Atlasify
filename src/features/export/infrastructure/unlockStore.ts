const STORAGE_KEY = "atlasify.unlock";

export type UnlockTier = "2k" | "4k" | "8k";

export interface UnlockState {
  email: string | null;
  unlocks: { "2k": boolean; "4k": boolean; "8k": boolean };
}

const TIER_PRICES: Record<UnlockTier, number> = {
  "2k": 99,
  "4k": 120,
  "8k": 150,
};

const TIER_LABELS: Record<UnlockTier, string> = {
  "2k": "2K (2048px)",
  "4k": "4K (4096px)",
  "8k": "8K (8192px)",
};

const TIER_INCLUDES: Record<UnlockTier, string> = {
  "2k": "2K exports",
  "4k": "2K + 4K exports",
  "8k": "2K + 4K + 8K exports",
};

export { TIER_PRICES, TIER_LABELS, TIER_INCLUDES };

export function readUnlockState(): UnlockState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { email: null, unlocks: { "2k": false, "4k": false, "8k": false } };
    const parsed = JSON.parse(raw);
    return {
      email: parsed.email || null,
      unlocks: {
        "2k": !!parsed.unlocks?.["2k"],
        "4k": !!parsed.unlocks?.["4k"],
        "8k": !!parsed.unlocks?.["8k"],
      },
    };
  } catch {
    return { email: null, unlocks: { "2k": false, "4k": false, "8k": false } };
  }
}

export function writeUnlockState(email: string, unlocks: UnlockState["unlocks"]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: email.toLowerCase().trim(), unlocks }),
  );
}

export function clearUnlockState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isResolutionUnlocked(tier: UnlockTier): boolean {
  const state = readUnlockState();
  return state.unlocks[tier];
}

/** Given a purchased tier, compute which resolutions it unlocks */
export function computeUnlocks(tier: UnlockTier): UnlockState["unlocks"] {
  const rank = { "2k": 1, "4k": 2, "8k": 3 }[tier];
  return {
    "2k": rank >= 1,
    "4k": rank >= 2,
    "8k": rank >= 3,
  };
}

/** Merge new unlocks with existing ones (only adds, never removes) */
export function mergeUnlocks(
  existing: UnlockState["unlocks"],
  incoming: UnlockState["unlocks"],
): UnlockState["unlocks"] {
  return {
    "2k": existing["2k"] || incoming["2k"],
    "4k": existing["4k"] || incoming["4k"],
    "8k": existing["8k"] || incoming["8k"],
  };
}
