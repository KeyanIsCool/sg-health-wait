// A broader set of representative private GP clinics across Singapore.
// NOTE: These are illustrative seed records (demo data). Replace with
// authoritative directory data before production.
export type GpSeed = {
  slug: string; name: string; address: string; postalCode?: string;
  lat: number; lng: number; phone?: string; website?: string;
  twentyFourHour?: boolean; services?: string[];
};

export const GPS: GpSeed[] = [
  // Central
  { slug: 'raffles-medical-orchard', name: 'Raffles Medical (Orchard)', address: '290 Orchard Road, Paragon', postalCode: '238859', lat: 1.3043, lng: 103.8372, services: ['General consult', 'Teleconsult'] },
  { slug: 'raffles-medical-raffles-city', name: 'Raffles Medical (Raffles City)', address: '252 North Bridge Road, Raffles City', postalCode: '179103', lat: 1.2944, lng: 103.8530 },
  { slug: 'parkway-shenton-shenton-way', name: 'Parkway Shenton (Shenton Way)', address: '96 Robinson Rd, SIF Building', postalCode: '068899', lat: 1.2795, lng: 103.8497 },
  { slug: 'minmed-novena', name: 'Minmed Clinic (Novena)', address: '10 Sinaran Drive, Novena Medical Center', postalCode: '307506', lat: 1.3216, lng: 103.8431 },
  { slug: 'ihealth-medical-bishan', name: 'iHealth Medical (Bishan)', address: 'Blk 283 Bishan St 22', postalCode: '570283', lat: 1.3517, lng: 103.8491 },
  { slug: 'drs-tan-partners-tiong-bahru', name: 'Drs Tan & Partners (Tiong Bahru)', address: '302 Tiong Bahru Rd, Tiong Bahru Plaza', postalCode: '168732', lat: 1.2862, lng: 103.8266 },

  // East
  { slug: 'healthway-medical-tampines', name: 'Healthway Medical (Tampines)', address: 'Blk 201E Tampines St 23', postalCode: '527201', lat: 1.3534, lng: 103.9470 },
  { slug: 'healthway-medical-bedok', name: 'Healthway Medical (Bedok)', address: 'Blk 212 Bedok North St 1', postalCode: '460212', lat: 1.3262, lng: 103.9303 },
  { slug: 'my-family-clinic-pasir-ris', name: 'My Family Clinic (Pasir Ris)', address: 'Blk 737 Pasir Ris St 72', postalCode: '510737', lat: 1.3733, lng: 103.9494 },
  { slug: 'raffles-medical-changi', name: 'Raffles Medical (Changi City)', address: '5 Changi Business Park Central 1', postalCode: '486038', lat: 1.3339, lng: 103.9627, twentyFourHour: false },
  { slug: 'icare-medical-simei', name: 'iCare Medical (Simei)', address: 'Blk 248 Simei St 3', postalCode: '520248', lat: 1.3433, lng: 103.9540 },
  { slug: 'minmed-east-coast', name: 'Minmed Clinic (East Coast)', address: '1 Marine Parade Central', postalCode: '449408', lat: 1.3028, lng: 103.9050 },

  // West
  { slug: 'healthway-medical-jurong-east', name: 'Healthway Medical (Jurong East)', address: 'Blk 134 Jurong Gateway Road', postalCode: '600134', lat: 1.3335, lng: 103.7420 },
  { slug: 'healthway-medical-clementi', name: 'Healthway Medical (Clementi)', address: 'Blk 441 Clementi Ave 3', postalCode: '120441', lat: 1.3151, lng: 103.7649 },
  { slug: 'parkway-shenton-jurong-point', name: 'Parkway Shenton (Jurong Point)', address: '1 Jurong West Central 2', postalCode: '648886', lat: 1.3399, lng: 103.7066 },
  { slug: 'my-family-clinic-choa-chu-kang', name: 'My Family Clinic (Choa Chu Kang)', address: 'Blk 684 Choa Chu Kang Cres', postalCode: '680684', lat: 1.3850, lng: 103.7447 },
  { slug: 'drs-tan-partners-bukit-batok', name: 'Drs Tan & Partners (Bukit Batok)', address: 'Blk 630 Bukit Batok Central', postalCode: '650630', lat: 1.3496, lng: 103.7495 },
  { slug: 'icare-medical-boon-lay', name: 'iCare Medical (Boon Lay)', address: 'Blk 221 Boon Lay Place', postalCode: '640221', lat: 1.3451, lng: 103.7120 },

  // North
  { slug: 'healthway-medical-yishun', name: 'Healthway Medical (Yishun)', address: 'Blk 846 Yishun Ring Rd', postalCode: '760846', lat: 1.4293, lng: 103.8360 },
  { slug: 'minmed-woodlands', name: 'Minmed Clinic (Woodlands)', address: '30 Woodlands Ave 1, Causeway Point', postalCode: '738099', lat: 1.4360, lng: 103.7865 },
  { slug: 'my-family-clinic-sembawang', name: 'My Family Clinic (Sembawang)', address: 'Blk 451 Sembawang Dr', postalCode: '750451', lat: 1.4511, lng: 103.8178 },
  { slug: 'icare-medical-admiralty', name: 'iCare Medical (Admiralty)', address: 'Blk 678A Woodlands Ave 6', postalCode: '731678', lat: 1.4421, lng: 103.8008 },

  // North-East
  { slug: 'healthway-medical-sengkang', name: 'Healthway Medical (Sengkang)', address: 'Blk 108 Rivervale Walk', postalCode: '540108', lat: 1.3932, lng: 103.9009 },
  { slug: 'healthway-medical-punggol', name: 'Healthway Medical (Punggol)', address: 'Blk 681 Punggol Dr', postalCode: '820681', lat: 1.4000, lng: 103.9087 },
  { slug: 'my-family-clinic-hougang', name: 'My Family Clinic (Hougang)', address: 'Blk 684 Hougang Ave 8', postalCode: '530684', lat: 1.3747, lng: 103.8914 },
  { slug: 'drs-tan-partners-serangoon', name: 'Drs Tan & Partners (Serangoon)', address: 'NEX Mall, 23 Serangoon Central', postalCode: '556083', lat: 1.3515, lng: 103.8720 },
  { slug: 'icare-medical-ang-mo-kio', name: 'iCare Medical (Ang Mo Kio)', address: 'Blk 712 Ang Mo Kio Ave 6', postalCode: '560712', lat: 1.3680, lng: 103.8482 },

  // 24-hour clinics (spread)
  { slug: 'raffles-medical-24h-raffles-hospital', name: 'Raffles Medical 24-hour (Raffles Hospital)', address: '585 North Bridge Rd', postalCode: '188770', lat: 1.3028, lng: 103.8565, twentyFourHour: true, services: ['24-hour clinic', 'General consult'] },
  { slug: 'minmed-24h-airport', name: 'Minmed 24-hour (Changi Airport)', address: 'Changi Airport T3 Basement 2', postalCode: '819663', lat: 1.3570, lng: 103.9867, twentyFourHour: true, services: ['24-hour clinic'] },
  { slug: 'drs-tan-partners-24h-robertson', name: 'Drs Tan & Partners 24-hour (Robertson Quay)', address: '11 Unity Street, Robertson Walk', postalCode: '237995', lat: 1.2924, lng: 103.8389, twentyFourHour: true, services: ['24-hour clinic', 'Teleconsult'] },
];
