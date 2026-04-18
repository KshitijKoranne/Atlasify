import { useEffect, useState } from "react";
import { useExport } from "@/features/export/application/useExport";
import type { ExportFormat } from "@/features/export/domain/types";
import { DownloadIcon, LoaderIcon } from "@/shared/ui/Icons";
import SupportModal from "@/features/export/ui/SupportModal";

const PRO_RESOLUTIONS = ["2K", "4K", "8K"] as const;

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

        {/* Pro tier — separate buttons per resolution */}
        <p className="desktop-export-pro-label">
          <span className="desktop-export-tier--pro">Pro</span>
          High-res
        </p>
        {PRO_RESOLUTIONS.map((res) => (
          <button
            key={res}
            type="button"
            className="desktop-export-btn desktop-export-btn--pro"
            disabled
            title={`${res} export — coming soon with Razorpay`}
          >
            <DownloadIcon className="desktop-export-btn-icon" />
            <span>{res}</span>
            <span className="desktop-export-pro-res">{
              res === "2K" ? "2048px" : res === "4K" ? "4096px" : "8192px"
            }</span>
          </button>
        ))}
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
