const LABELS: Record<string, string> = {
  OFFICIAL: 'Official hospital data',
  SCRAPED: 'Hospital website',
  CROWDSOURCED: 'Community estimate',
  MANUAL: 'Manually updated',
  ESTIMATED: 'Estimated',
};

export default function SourceBadge({ sourceType, sourceName }: { sourceType: string; sourceName?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
      <span aria-hidden>·</span>
      <span>{LABELS[sourceType] ?? sourceType}{sourceName ? ` — ${sourceName}` : ''}</span>
    </span>
  );
}
