import { useState, useCallback } from "react";
import type { UnlockTier } from "../infrastructure/unlockStore";
import {
  TIER_PRICES,
  TIER_LABELS,
  TIER_INCLUDES,
  readUnlockState,
  writeUnlockState,
  computeUnlocks,
  mergeUnlocks,
} from "../infrastructure/unlockStore";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

interface PaymentModalProps {
  tier: UnlockTier;
  onClose: () => void;
  onSuccess: (tier: UnlockTier) => void;
}

type Mode = "pay" | "restore";

export default function PaymentModal({ tier, onClose, onSuccess }: PaymentModalProps) {
  const [email, setEmail] = useState(readUnlockState().email || "");
  const [mode, setMode] = useState<Mode>("pay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = email.includes("@") && email.includes(".");

  const handlePay = useCallback(async () => {
    if (!isValidEmail || loading) return;
    setLoading(true);
    setError(null);

    try {
      // Create order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email: email.trim() }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setError(orderData.error || "Failed to create order");
        setLoading(false);
        return;
      }

      // Load Razorpay script if not loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay"));
          document.head.appendChild(script);
        });
      }

      // Open checkout
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Atlasify",
        description: orderData.description,
        order_id: orderData.orderId,
        prefill: { email: email.trim() },
        theme: { color: "#d4a43a" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // Verify payment
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                tier,
                email: email.trim(),
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              const existing = readUnlockState();
              const newUnlocks = computeUnlocks(tier);
              const merged = mergeUnlocks(existing.unlocks, newUnlocks);
              writeUnlockState(email.trim(), merged);
              onSuccess(tier);
            } else {
              setError("Payment verification failed. Contact support.");
            }
          } catch {
            setError("Verification error. Your payment is safe — contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }, [email, tier, loading, isValidEmail, onSuccess]);

  const handleRestore = useCallback(async () => {
    if (!isValidEmail || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/check-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (data.unlocked && data.unlocks) {
        const existing = readUnlockState();
        const merged = mergeUnlocks(existing.unlocks, data.unlocks);
        writeUnlockState(email.trim(), merged);
        onSuccess(data.tier);
      } else {
        setError("No purchases found for this email.");
      }
    } catch {
      setError("Could not check. Try again.");
    }
    setLoading(false);
  }, [email, loading, isValidEmail, onSuccess]);

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="payment-modal-close" onClick={onClose}>
          ×
        </button>

        {mode === "pay" ? (
          <>
            <h2 className="payment-modal-title">
              Unlock {TIER_LABELS[tier]}
            </h2>
            <p className="payment-modal-price">
              ₹{TIER_PRICES[tier]}
              <span className="payment-modal-price-note"> · one-time</span>
            </p>
            <p className="payment-modal-includes">
              Includes {TIER_INCLUDES[tier]} — forever, on any poster.
            </p>

            <label className="payment-modal-label">
              Email
              <input
                type="email"
                className="payment-modal-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </label>
            <p className="payment-modal-email-hint">
              Use this email to restore your purchase on another device.
            </p>

            {error && <p className="payment-modal-error">{error}</p>}

            <button
              type="button"
              className="payment-modal-pay-btn"
              disabled={!isValidEmail || loading}
              onClick={handlePay}
            >
              {loading ? "Processing..." : `Pay ₹${TIER_PRICES[tier]}`}
            </button>

            <button
              type="button"
              className="payment-modal-switch"
              onClick={() => { setMode("restore"); setError(null); }}
            >
              Already paid? Restore purchase →
            </button>
          </>
        ) : (
          <>
            <h2 className="payment-modal-title">Restore Purchase</h2>
            <p className="payment-modal-includes">
              Enter the email you used when you purchased.
            </p>

            <label className="payment-modal-label">
              Email
              <input
                type="email"
                className="payment-modal-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </label>

            {error && <p className="payment-modal-error">{error}</p>}

            <button
              type="button"
              className="payment-modal-pay-btn"
              disabled={!isValidEmail || loading}
              onClick={handleRestore}
            >
              {loading ? "Checking..." : "Restore"}
            </button>

            <button
              type="button"
              className="payment-modal-switch"
              onClick={() => { setMode("pay"); setError(null); }}
            >
              ← Back to purchase
            </button>
          </>
        )}
      </div>
    </div>
  );
}
