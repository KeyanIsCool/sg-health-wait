import { waitStatus } from '@/lib/time';

const CLASS: Record<string, string> = {
  short: 'wait-short', moderate: 'wait-moderate', long: 'wait-long', verylong: 'wait-verylong', unknown: 'wait-unknown',
};
const DOT: Record<string, string> = { short: '●', moderate: '●', long: '●', verylong: '●', unknown: '○' };
const LABEL: Record<string, string> = {
  short: 'Shorter wait', moderate: 'Moderate wait', long: 'Long wait', verylong: 'Very long wait', unknown: 'Unknown',
};

export default function WaitTimeBadge({ minutes, size = 'md' }: { minutes: number | null; size?: 'sm' | 'md' | 'lg' }) {
  const s = minutes == null ? 'unknown' : waitStatus(minutes);
  const sizeCls = size === 'lg' ? 'text-3xl md:text-4xl py-2.5 px-4' : size === 'sm' ? 'text-sm px-2.5 py-1' : 'text-xl px-3 py-1.5';
  return (
    <span className={`inline-flex items-baseline gap-2 rounded-xl tabular font-bold tracking-tight ${CLASS[s]} ${sizeCls}`}>
      <span aria-hidden className="text-[.6em] leading-none translate-y-[-.3em]">{DOT[s]}</span>
      {minutes == null
        ? <span className="text-base">Wait time unavailable</span>
        : <><span>{minutes}</span><span className="text-[.55em] font-semibold uppercase tracking-wider opacity-75">min</span></>}
      <span className="sr-only"> ({LABEL[s]})</span>
    </span>
  );
}
