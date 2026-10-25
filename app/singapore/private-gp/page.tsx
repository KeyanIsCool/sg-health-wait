import type { Metadata } from 'next';
import TypeListing from '@/components/TypeListing';
export const metadata: Metadata = {
  title: 'Private GP clinics in Singapore — by region & nearest',
  description: 'Browse private GPs across Singapore. Filter by region (Central, North, North-East, East, West) or use your location.',
  alternates: { canonical: '/singapore/private-gp' },
};
type SP = Record<string, string | string[] | undefined>;
export default async function Page({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  return <TypeListing type="PRIVATE_GP" title="Private GPs in Singapore" breadcrumbLabel="Private GPs"
    showRegion searchParams={sp}
    intro="General practitioners across every region. Tap 'Use my location' to sort by distance, or pick a region below." />;
}
