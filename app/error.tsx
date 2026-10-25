'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-ink-muted">We couldn&apos;t load that page. Please try again.</p>
      <button className="btn-primary mt-4" onClick={() => reset()}>Retry</button>
    </div>
  );
}
