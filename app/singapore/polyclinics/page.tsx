import type { Metadata } from 'next';
import TypeListing from '@/components/TypeListing';
export const metadata: Metadata = {
  title: 'Singapore polyclinics — wait times & appointment slots',
  description: 'Find Singapore public polyclinics with estimated waits and appointment slot notifications.',
  alternates: { canonical: '/singapore/polyclinics' },
};
type SP = Record<string, string | string[] | undefined>;
export default async function Page({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  return <TypeListing type="POLYCLINIC" title="Singapore polyclinics" breadcrumbLabel="Polyclinics" showRegion searchParams={sp}
    intro="Public polyclinics across Singapore. Set a slot-release reminder or watch for last-minute availability on any polyclinic page." />;
}
