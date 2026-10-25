export const TYPE_LABEL: Record<string, string> = {
  AE: 'A&E',
  HOSPITAL: 'Hospital',
  POLYCLINIC: 'Polyclinic',
  PRIVATE_GP: 'Private GP',
  PRIVATE_HOSPITAL: 'Private Hospital',
};

export const OWNERSHIP_LABEL: Record<string, string> = {
  PUBLIC: 'Public',
  PRIVATE: 'Private',
};

export function typeRoute(type: string): string {
  switch (type) {
    case 'AE': return '/singapore/a-e';
    case 'POLYCLINIC': return '/singapore/polyclinics';
    case 'PRIVATE_GP': return '/singapore/private-gp';
    case 'PRIVATE_HOSPITAL': return '/singapore/private-hospitals';
    default: return '/singapore';
  }
}

export function facilityPath(type: string, slug: string): string {
  return `${typeRoute(type)}/${slug}`;
}
