import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFacilityBySlug, nearbyAlternatives } from '@/lib/queries';
import FacilityDetail from '@/components/FacilityDetail';
import { db } from '@/lib/db';

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await db.facility.findMany({ where: { type: 'POLYCLINIC', active: true }, select: { slug: true } });
  return rows.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) return {};
  return {
    title: `${f.name} — hours & appointments`,
    description: `Opening hours, appointment release time${f.appointmentReleaseTime ? ` (${f.appointmentReleaseTime})` : ''} and directions for ${f.name}.`,
    alternates: { canonical: `/singapore/polyclinics/${f.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f || f.type !== 'POLYCLINIC') notFound();
  const alts = await nearbyAlternatives(f);
  return <FacilityDetail f={f} latest={f.waitTimes[0] ?? null} alternatives={alts} />;
}
