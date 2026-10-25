export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 animate-pulse">
      <div className="h-10 w-2/3 bg-canvas-soft rounded" />
      <div className="h-4 w-1/2 bg-canvas-soft rounded mt-3" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 bg-canvas-soft rounded-card" />)}
      </div>
    </div>
  );
}
