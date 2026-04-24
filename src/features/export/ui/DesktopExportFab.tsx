import { useEffect, useState, useCallback } from "react";
import { useExport } from "@/features/export/application/useExport";
import type { ExportFormat } from "@/features/export/domain/types";
import { DownloadIcon, LoaderIcon } from "@/shared/ui/Icons";
import SupportModal from "@/features/export/ui/SupportModal";
import PaymentModal from "@/features/export/ui/PaymentModal";
import type { UnlockTier } from "@/features/export/infrastructure/unlockStore";
import { readUnlockState } from "@/features/export/infrastructure/unlockStore";

const PRO_TIERS: { tier: UnlockTier; label: string; px: string; price: number }[] = [
  { tier: "2k", label: "2K", px: "2048px", price: 99 },
  { tier: "4k", label: "4K", px: "4096px", price: 120 },
  { tier: "8k", label: "8K", px: "8192px", price: 150 },
];

export default function DesktopExportFab() {
  const {
    isExporting,
    handleDownloadPng,
    handleDownloadPdf,
    handleDownloadSvg,
    handleDownloadHiRes,
    supportPrompt,
    dismissSupportPrompt,
  } = useExport();

  const [activeFormat, setActiveFormat] = useState<ExportFormat | null>(null);
  const [paymentTier, setPaymentTier] = useState<UnlockTier | null>(null);
  const [unlocks, setUnlocks] = useState(readUnlockState().unlocks);

  // Refresh unlock state periodically (in case restore happened)
  useEffect(() => {
    if (!isExporting) setActiveFormat(null);
  }, [isExporting]);

  const refreshUnlocks = useCallback(() => {
    setUnlocks(readUnlockState().unlocks);
  }, []);

  const handleProClick = (tier: UnlockTier) => {
    if (unlocks[tier]) {
      // Already unlocked — trigger hi-res download
      const resMap = { "2k": 2048, "4k": 4096, "8k": 8192 };
      setActiveFormat("png");
      void handleDownloadHiRes(resMap[tier]);
    } else {
      // Not unlocked — open payment modal
      setPaymentTier(tier);
    }
  };

  const handlePaymentSuccess = () => {
    refreshUnlocks();
    setPaymentTier(null);
  };

  const isLoading = (fmt: ExportFormat) => isExporting && activeFormat === fmt;

  return (
    <>
      <div className="desktop-export-fab">
        <p className="desktop-export-label">Export Poster</p>

        {/* Free tier */}
        <button
          type="button"
          className="desktop-export-btn desktop-export-btn--primary"
          disabled={isExporting}
          onClick={() => { setActiveFormat("png"); void handleDownloadPng(); }}
        >
          {isLoading("png")
            ? <LoaderIcon className="desktop-export-btn-icon is-spinning" />
            : <DownloadIcon className="desktop-export-btn-icon" />}
          <span>PNG</span>
          <span className="desktop-export-tier">Free</span>
        </button>

        <button
          type="button"
          className="desktop-export-btn desktop-export-btn--pdf"
          disabled={isExporting}
          onClick={() => { setActiveFormat("pdf"); void handleDownloadPdf(); }}
        >
          {isLoading("pdf")
            ? <LoaderIcon className="desktop-export-btn-icon is-spinning" />
            : <DownloadIcon className="desktop-export-btn-icon" />}
          <span>PDF</span>
          <span className="desktop-export-tier">Free</span>
        </button>

        <button
          type="button"
          className="desktop-export-btn desktop-export-btn--svg"
          disabled={isExporting}
          onClick={() => { setActiveFormat("svg"); void handleDownloadSvg(); }}
        >
          {isLoading("svg")
            ? <LoaderIcon className="desktop-export-btn-icon is-spinning" />
            : <DownloadIcon className="desktop-export-btn-icon" />}
          <span>SVG</span>
          <span className="desktop-export-tier">Free</span>
        </button>

        <div className="desktop-export-divider" />

        {/* Pro tier */}
        <p className="desktop-export-pro-label">
          <span className="desktop-export-tier--pro">Pro</span>
          High-res
        </p>
        {PRO_TIERS.map(({ tier, label, px, price }) => {
          const isUnlocked = unlocks[tier];
          return (
            <button
              key={tier}
              type="button"
              className={`desktop-export-btn desktop-export-btn--pro ${isUnlocked ? "desktop-export-btn--unlocked" : ""}`}
              disabled={isExporting}
              onClick={() => handleProClick(tier)}
              title={isUnlocked ? `Download ${label} PNG` : `Unlock ${label} for ₹${price}`}
            >
              {isExporting && activeFormat === "png"
                ? <LoaderIcon className="desktop-export-btn-icon is-spinning" />
                : <DownloadIcon className="desktop-export-btn-icon" />}
              <span>{label}</span>
              <span className="desktop-export-pro-res">
                {isUnlocked ? px : `₹${price}`}
              </span>
            </button>
          );
        })}

        {/* Restore link */}
        {!unlocks["2k"] && !unlocks["4k"] && !unlocks["8k"] && (
          <button
            type="button"
            className="desktop-export-restore"
            onClick={() => setPaymentTier("2k")}
          >
            Restore purchase
          </button>
        )}
      </div>

      {paymentTier && (
        <PaymentModal
          tier={paymentTier}
          onClose={() => setPaymentTier(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {supportPrompt ? (
        <SupportModal
          posterNumber={supportPrompt.posterNumber}
          onClose={dismissSupportPrompt}
          titleId="fab-export-support-modal-title"
        />
      ) : null}
    </>
  );
}
