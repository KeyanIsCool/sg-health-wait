import type { Metadata } from 'next';
import TypeListing from '@/components/TypeListing';
export const metadata: Metadata = {
  title: 'Singapore A&E wait times — compare hospitals',
  description: 'Compare estimated A&E wait times at Singapore public and private hospitals.',
  alternates: { canonical: '/singapore/a-e' },
};
type SP = Record<string, string | string[] | undefined>;
export default async function Page({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  return <TypeListing type="AE" title="Singapore A&E wait times" breadcrumbLabel="A&E" showRegion searchParams={sp}
    intro="Estimated wait times at Singapore public hospital A&E departments. In an emergency call 995 — do not delay care based on wait times shown here." />;
}
