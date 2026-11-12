import React from 'react';
import { BuilderStatus } from './useBuilder';

interface SummaryPanelProps {
  summary: {
    platformLabel: string;
    catalogueLabel: string;
    pageLabels: string[];
    pageCount: number;
    integrationLabels: string[];
    integrationCount: number;
    automationLabels: string[];
    automationCount: number;
    itemCount: number;
  };
  status: BuilderStatus;
  onSubmit: () => void;
  onReset: () => void;
  className?: string;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  status,
  onSubmit,
  onReset,
  className = '',
}) => {
  const isSent = status === 'sent';
  const isSending = status === 'sending';

  return (
    <aside
      id="package-summary"
      aria-label="Your package"
      className={`border border-ink bg-paper w-full lg:sticky lg:top-[104px] ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-ink font-mono text-[12px] uppercase tracking-[0.06em]">
        <span className="font-semibold text-ink">Your package</span>
        <span className="text-muted" aria-live="polite">
          {summary.itemCount} items
        </span>
      </div>

      {/* List */}
      <dl className="m-0 p-0">
        {/* Row 1: Build */}
        <div className="p-5 border-b border-line">
          <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-1.5">
            Build
          </dt>
          <dd className="m-0 text-[16px] font-semibold text-ink">
            {summary.platformLabel}
          </dd>
        </div>

        {/* Row 2: Catalogue */}
        <div className="p-5 border-b border-line">
          <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-1.5">
            Catalogue
          </dt>
          <dd className="m-0 text-[16px] font-semibold text-ink">
            {summary.catalogueLabel}
          </dd>
        </div>

        {/* Row 3: Pages */}
        <div className="p-5 border-b border-line">
          <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-1.5">
            Pages · <span aria-live="polite">{summary.pageCount}</span>
          </dt>
          <dd className="m-0 text-[15px] leading-[1.5] text-body">
            {summary.pageLabels.join(', ')}
          </dd>
        </div>

        {/* Row 4: Integrations */}
        <div className="p-5 border-b border-line">
          <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-1.5">
            Integrations · <span aria-live="polite">{summary.integrationCount}</span>
          </dt>
          <dd className="m-0 text-[15px] leading-[1.5] text-body">
            {summary.integrationLabels.length
              ? summary.integrationLabels.join(', ')
              : 'None yet'}
          </dd>
        </div>

        {/* Row 5: Automations */}
        <div className="p-5 border-b border-line">
          <dt className="font-mono text-[12px] uppercase tracking-[0.04em] text-muted mb-1.5">
            Automations · <span aria-live="polite">{summary.automationCount}</span>
          </dt>
          <dd className="m-0 text-[15px] leading-[1.5] text-body">
            {summary.automationLabels.length
              ? summary.automationLabels.join(', ')
              : 'None yet'}
          </dd>
        </div>
      </dl>

      {/* Footer / Submit area */}
      <div className="p-5 flex flex-col gap-3">
        {!isSent ? (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSending}
              className="w-full bg-ink text-white font-semibold text-[16px] px-5 py-4 min-h-[48px] hover:bg-[#222720] transition-colors rounded-none cursor-pointer flex items-center justify-center disabled:opacity-50"
            >
              {isSending ? 'Sending…' : 'Send my package'}
            </button>
            <p className="m-0 text-[13px] leading-[1.5] text-muted">
              No payment now. You get an itemised quote on WhatsApp or email within [24 hours].
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              role="status"
              className="bg-accent p-4 text-[15px] leading-[1.5] text-ink"
            >
              <strong className="block text-[17px] font-bold mb-1">
                Package sent.
              </strong>
              We&apos;ll send your itemised quote within [24 hours].
            </div>
            <button
              type="button"
              onClick={onReset}
              className="w-full bg-transparent border border-ink text-ink font-semibold text-[15px] px-4 py-3 min-h-[44px] hover:bg-ink hover:text-white transition-colors rounded-none cursor-pointer flex items-center justify-center"
            >
              Edit package
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SummaryPanel;

