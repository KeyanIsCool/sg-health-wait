import type { Metadata } from 'next';
import TypeListing from '@/components/TypeListing';
export const metadata: Metadata = {
  title: 'Private hospitals in Singapore',
  description: 'Private hospitals with 24-hour emergency services in Singapore.',
  alternates: { canonical: '/singapore/private-hospitals' },
};
type SP = Record<string, string | string[] | undefined>;
export default async function Page({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  return <TypeListing type="PRIVATE_HOSPITAL" title="Private hospitals in Singapore" breadcrumbLabel="Private hospitals" showRegion searchParams={sp}
    intro="Private hospitals with 24-hour emergency services. Costs vary significantly — contact facilities for details." />;
}
