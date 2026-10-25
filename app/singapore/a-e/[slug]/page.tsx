import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFacilityBySlug, nearbyAlternatives } from '@/lib/queries';
import FacilityDetail from '@/components/FacilityDetail';
import { TYPE_LABEL } from '@/lib/facility';
import { db } from '@/lib/db';

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await db.facility.findMany({ where: { type: 'AE', active: true }, select: { slug: true } });
  return rows.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) return {};
  return {
    title: `${f.name} — wait time & directions`,
    description: `Live estimated wait time, opening hours, directions and nearby alternatives for ${f.name} (${TYPE_LABEL[f.type]}).`,
    alternates: { canonical: `/singapore/a-e/${f.slug}` },
    openGraph: { title: f.name, description: `${f.name} · ${f.address}`, type: 'article' },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f || f.type !== 'AE') notFound();
  const alts = await nearbyAlternatives(f);
  const latest = f.waitTimes[0] ?? null;
  return (
    <>
      <FacilityDetail f={f} latest={latest} alternatives={alts} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(f, latest)) }} />
    </>
  );
}

function buildSchema(f: Awaited<ReturnType<typeof getFacilityBySlug>>, latest: { waitMinutes: number } | null) {
  if (!f) return {};
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: f.name,
    address: { '@type': 'PostalAddress', streetAddress: f.address, postalCode: f.postalCode ?? undefined, addressCountry: 'SG' },
    geo: { '@type': 'GeoCoordinates', latitude: f.latitude, longitude: f.longitude },
    telephone: f.phone ?? undefined,
    url: f.websiteUrl ?? undefined,
    availableService: f.services.map(s => ({ '@type': 'MedicalProcedure', name: s.label })),
    description: latest ? `Estimated A&E wait: ${latest.waitMinutes} min.` : undefined,
  };
}
