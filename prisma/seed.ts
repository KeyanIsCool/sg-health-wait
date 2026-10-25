import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

type Seed = {
  slug: string; name: string; type: string; ownership: string;
  address: string; postalCode?: string; lat: number; lng: number;
  phone?: string; website?: string; booking?: string;
  twentyFourHour?: boolean; appointmentReleaseTime?: string;
  services?: string[]; description?: string;
};

// NOTE: Demo seed data. Addresses/coords are approximate and marked as demo.
// Replace with authoritative sources before production. See /methodology.
const facilities: Seed[] = [
  // Public hospital A&E
  { slug: 'singapore-general-hospital-ae', name: 'Singapore General Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: 'Outram Road', postalCode: '169608', lat: 1.2793, lng: 103.8356, twentyFourHour: true,
    phone: '+6562223322', website: 'https://www.sgh.com.sg',
    services: ['Emergency', 'Trauma', 'Paediatric emergency'] },
  { slug: 'tan-tock-seng-hospital-ae', name: 'Tan Tock Seng Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '11 Jalan Tan Tock Seng', postalCode: '308433', lat: 1.3215, lng: 103.8460, twentyFourHour: true,
    phone: '+6562566011', website: 'https://www.ttsh.com.sg',
    services: ['Emergency', 'Observation ward'] },
  { slug: 'national-university-hospital-ae', name: 'National University Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '5 Lower Kent Ridge Road', postalCode: '119074', lat: 1.2944, lng: 103.7836, twentyFourHour: true,
    phone: '+6567795555', website: 'https://www.nuh.com.sg',
    services: ['Emergency', 'Paediatric emergency'] },
  { slug: 'changi-general-hospital-ae', name: 'Changi General Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '2 Simei Street 3', postalCode: '529889', lat: 1.3407, lng: 103.9492, twentyFourHour: true,
    phone: '+6567888833', website: 'https://www.cgh.com.sg',
    services: ['Emergency'] },
  { slug: 'khoo-teck-puat-hospital-ae', name: 'Khoo Teck Puat Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '90 Yishun Central', postalCode: '768828', lat: 1.4243, lng: 103.8381, twentyFourHour: true,
    phone: '+6565558000', website: 'https://www.ktph.com.sg',
    services: ['Emergency'] },
  { slug: 'ng-teng-fong-general-hospital-ae', name: 'Ng Teng Fong General Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '1 Jurong East Street 21', postalCode: '609606', lat: 1.3339, lng: 103.7437, twentyFourHour: true,
    phone: '+6567162000', website: 'https://www.ntfgh.com.sg',
    services: ['Emergency'] },
  { slug: 'sengkang-general-hospital-ae', name: 'Sengkang General Hospital A&E', type: 'AE', ownership: 'PUBLIC',
    address: '110 Sengkang East Way', postalCode: '544886', lat: 1.3961, lng: 103.8930, twentyFourHour: true,
    phone: '+6569302000', website: 'https://www.skh.com.sg',
    services: ['Emergency'] },
  { slug: 'woodlands-health-ae', name: 'Woodlands Health A&E', type: 'AE', ownership: 'PUBLIC',
    address: '17 Woodlands Drive 17', postalCode: '737628', lat: 1.4360, lng: 103.7850, twentyFourHour: true,
    phone: '+6563636363', website: 'https://www.wh.com.sg',
    services: ['Emergency'] },
  { slug: 'kk-womens-and-childrens-hospital-ae', name: "KK Women's and Children's Hospital A&E", type: 'AE', ownership: 'PUBLIC',
    address: '100 Bukit Timah Road', postalCode: '229899', lat: 1.3105, lng: 103.8470, twentyFourHour: true,
    phone: '+6562255554', website: 'https://www.kkh.com.sg',
    services: ["Paediatric emergency", "Obstetric emergency"] },

  // Polyclinics (subset — expand in admin)
  // Polyclinics. appointmentReleaseTime is left null unless publicly confirmed.
  // Different polyclinic clusters (NUHS/NHGP/SingHealth) use different booking
  // flows and typical release windows vary — the UI treats null as "varies".
  { slug: 'tampines-polyclinic', name: 'Tampines Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '1 Tampines Street 41', postalCode: '529203', lat: 1.3540, lng: 103.9450,
    booking: 'https://book.healthhub.sg',
    services: ['General consult', 'Chronic disease', 'Immunisation'] },
  { slug: 'bukit-batok-polyclinic', name: 'Bukit Batok Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '50 Bukit Batok West Avenue 3', postalCode: '659164', lat: 1.3463, lng: 103.7498,
    booking: 'https://book.healthhub.sg',
    services: ['General consult', 'Chronic disease'] },
  { slug: 'bedok-polyclinic', name: 'Bedok Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '11 Bedok North Street 1', postalCode: '469662', lat: 1.3270, lng: 103.9307,
    booking: 'https://book.healthhub.sg',
    services: ['General consult'] },
  { slug: 'ang-mo-kio-polyclinic', name: 'Ang Mo Kio Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '21 Ang Mo Kio Central 2', postalCode: '569666', lat: 1.3697, lng: 103.8475,
    services: ['General consult'] },
  { slug: 'jurong-polyclinic', name: 'Jurong Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '190 Jurong East Avenue 1', postalCode: '609788', lat: 1.3330, lng: 103.7420,
    services: ['General consult'] },
  { slug: 'woodlands-polyclinic', name: 'Woodlands Polyclinic', type: 'POLYCLINIC', ownership: 'PUBLIC',
    address: '10 Woodlands Street 31', postalCode: '738579', lat: 1.4376, lng: 103.7869,
    services: ['General consult'] },

  // Private hospitals
  { slug: 'mount-elizabeth-hospital', name: 'Mount Elizabeth Hospital', type: 'PRIVATE_HOSPITAL', ownership: 'PRIVATE',
    address: '3 Mount Elizabeth', postalCode: '228510', lat: 1.3059, lng: 103.8343, twentyFourHour: true,
    phone: '+6567372666', website: 'https://www.mountelizabeth.com.sg',
    services: ['Emergency', 'Specialist'] },
  { slug: 'raffles-hospital', name: 'Raffles Hospital', type: 'PRIVATE_HOSPITAL', ownership: 'PRIVATE',
    address: '585 North Bridge Road', postalCode: '188770', lat: 1.3028, lng: 103.8565, twentyFourHour: true,
    phone: '+6563111111', website: 'https://www.rafflesmedicalgroup.com',
    services: ['Emergency', '24h'] },
  { slug: 'gleneagles-hospital', name: 'Gleneagles Hospital', type: 'PRIVATE_HOSPITAL', ownership: 'PRIVATE',
    address: '6A Napier Road', postalCode: '258500', lat: 1.3078, lng: 103.8248, twentyFourHour: true,
    phone: '+6564737222', website: 'https://www.gleneagles.com.sg' },

];

// Expanded GP seed — see prisma/seed-gps.ts.
import { GPS } from './seed-gps';
for (const g of GPS) {
  facilities.push({
    slug: g.slug, name: g.name, type: 'PRIVATE_GP', ownership: 'PRIVATE',
    address: g.address, postalCode: g.postalCode, lat: g.lat, lng: g.lng,
    phone: g.phone, website: g.website,
    twentyFourHour: !!g.twentyFourHour,
    services: g.services ?? ['General consult'],
  });
}

async function main() {
  for (const f of facilities) {
    const facility = await db.facility.upsert({
      where: { slug: f.slug },
      update: {
        name: f.name, type: f.type, ownership: f.ownership,
        address: f.address, postalCode: f.postalCode ?? null,
        latitude: f.lat, longitude: f.lng,
        phone: f.phone ?? null, websiteUrl: f.website ?? null, bookingUrl: f.booking ?? null,
        twentyFourHour: !!f.twentyFourHour,
        appointmentReleaseTime: f.appointmentReleaseTime ?? null,
        description: f.description ?? null,
      },
      create: {
        slug: f.slug, name: f.name, type: f.type, ownership: f.ownership,
        address: f.address, postalCode: f.postalCode ?? null,
        latitude: f.lat, longitude: f.lng,
        phone: f.phone ?? null, websiteUrl: f.website ?? null, bookingUrl: f.booking ?? null,
        twentyFourHour: !!f.twentyFourHour,
        appointmentReleaseTime: f.appointmentReleaseTime ?? null,
        description: f.description ?? null,
      },
    });

    // services
    await db.facilityService.deleteMany({ where: { facilityId: facility.id } });
    for (const s of f.services ?? []) {
      await db.facilityService.create({ data: { facilityId: facility.id, label: s } });
    }

    // hours
    await db.facilityHours.deleteMany({ where: { facilityId: facility.id } });
    if (f.twentyFourHour) {
      for (let d = 0; d < 7; d++) {
        await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 0, closeMin: 24 * 60 } });
      }
    } else {
      // Polyclinics: Mon–Fri 08:00–16:30, Sat 08:00–12:30, Sun closed
      // Private GP: Mon–Sat 09:00–21:00, Sun 09:00–13:00
      const isPoly = f.type === 'POLYCLINIC';
      for (let d = 0; d < 7; d++) {
        if (isPoly) {
          if (d === 0) await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 0, closeMin: 0, closed: true } });
          else if (d === 6) await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 8*60, closeMin: 12*60+30 } });
          else await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 8*60, closeMin: 16*60+30 } });
        } else {
          if (d === 0) await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 9*60, closeMin: 13*60 } });
          else await db.facilityHours.create({ data: { facilityId: facility.id, dayOfWeek: d, openMin: 9*60, closeMin: 21*60 } });
        }
      }
    }

    // Demo wait time (clearly marked as ESTIMATED)
    if (f.type === 'AE' || f.type === 'PRIVATE_HOSPITAL') {
      const minutes = 25 + Math.floor(Math.random() * 90);
      await db.waitTime.create({
        data: {
          facilityId: facility.id,
          waitType: 'AE',
          waitMinutes: minutes,
          confidence: 'MEDIUM',
          sourceType: 'ESTIMATED',
          sourceName: 'Demo seed estimate',
          reportedAt: new Date(Date.now() - Math.random() * 20 * 60 * 1000),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
          collectionMethod: 'seed',
        },
      });
    }
  }

  // Articles
  const articles = [
    { slug: 'a-e-vs-polyclinic-vs-gp', title: 'When should you go to A&E vs a polyclinic or GP?',
      excerpt: 'A plain-language guide for Singapore residents choosing where to seek care.',
      body: '# When should you go to A&E vs a polyclinic or GP?\n\nA&E is for emergencies — chest pain, serious injury, severe breathing difficulty, suspected stroke, or anything life- or limb-threatening. If this is you, call **995**.\n\nFor routine or non-urgent care — a cough, mild fever, chronic disease review, vaccinations, medical certificates — a **polyclinic** or **GP** is usually faster, cheaper, and more appropriate.\n\nUse the wait-time estimates on this site to compare options, but **never delay emergency care** based on a shorter wait somewhere else.' },
    { slug: 'how-polyclinic-appointments-work', title: 'How polyclinic appointments work in Singapore',
      excerpt: 'Appointment release times, walk-ins, and how to avoid long waits.',
      body: '# How polyclinic appointments work\n\nMost polyclinics release appointment slots the night before, typically around **10:00 PM**. Walk-ins are accepted but can involve long waits during peak hours.\n\nSet a reminder on this site 10 minutes before your polyclinic releases slots.' },
    { slug: 'singapore-a-e-wait-times-explained', title: 'Singapore A&E wait times explained',
      excerpt: 'How wait times are measured, why they vary, and what the colours mean on this site.',
      body: '# Singapore A&E wait times explained\n\nA&E wait times depend on triage severity, time of day, and how many patients are already being seen. Our figures are **estimates** unless marked as official hospital data.\n\nSee [Methodology](/methodology) for details.' },
  ];
  for (const a of articles) {
    await db.article.upsert({
      where: { slug: a.slug },
      update: { title: a.title, excerpt: a.excerpt, bodyMd: a.body },
      create: { slug: a.slug, title: a.title, excerpt: a.excerpt, bodyMd: a.body },
    });
  }

  // Data source status rows
  for (const s of [
    { name: 'Hospital A&E (estimated)', kind: 'ESTIMATED' },
    { name: 'Polyclinic directory (manual)', kind: 'MANUAL' },
    { name: 'Crowd reports', kind: 'CROWD' },
  ]) {
    await db.dataSourceStatus.upsert({
      where: { name: s.name },
      update: { kind: s.kind, lastSuccessAt: new Date() },
      create: { name: s.name, kind: s.kind, lastSuccessAt: new Date() },
    });
  }

  console.log(`Seeded ${facilities.length} facilities and ${articles.length} articles.`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
