export default function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="card p-8 text-center">
      <div className="text-ink font-medium">{title}</div>
      {hint && <div className="mt-1 text-sm text-ink-muted">{hint}</div>}
    </div>
  );
}
