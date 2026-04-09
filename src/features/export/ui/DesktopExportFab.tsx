import { useEffect, useState } from "react";
import { useExport } from "@/features/export/application/useExport";
import type { ExportFormat } from "@/features/export/domain/types";
import { DownloadIcon, LoaderIcon } from "@/shared/ui/Icons";
import SupportModal from "@/features/export/ui/SupportModal";

export default function DesktopExportFab() {
  const {
    isExporting,
    handleDownloadPng,
    handleDownloadPdf,
    handleDownloadSvg,
    supportPrompt,
    dismissSupportPrompt,
  } = useExport();
  const [activeFormat, setActiveFormat] = useState<ExportFormat | null>(null);

  useEffect(() => {
    if (!isExporting) setActiveFormat(null);
  }, [isExporting]);

  const isLoading = (fmt: ExportFormat) => isExporting && activeFormat === fmt;

  return (
    <>
      <div className="desktop-export-fab">
        <p className="desktop-export-label">Export Poster</p>

        {/* Primary — PNG free tier */}
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

        {/* PDF */}
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

        {/* SVG */}
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

        {/* Pro tier — placeholder, wired to Razorpay later */}
        <button
          type="button"
          className="desktop-export-btn desktop-export-btn--pro"
          disabled
          title="High-resolution export — coming soon"
        >
          <DownloadIcon className="desktop-export-btn-icon" />
          <span>2K / 4K / 8K</span>
          <span className="desktop-export-tier desktop-export-tier--pro">Pro</span>
        </button>
      </div>

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
