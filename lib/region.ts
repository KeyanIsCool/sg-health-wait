// Lightweight region bucketing for Singapore based on lat/lng.
// Not an official boundary — a usable approximation to filter facilities by
// Central / North / North-East / East / West.
export type Region = 'CENTRAL' | 'NORTH' | 'NORTH_EAST' | 'EAST' | 'WEST';

export const REGION_LABEL: Record<Region, string> = {
  CENTRAL: 'Central',
  NORTH: 'North',
  NORTH_EAST: 'North-East',
  EAST: 'East',
  WEST: 'West',
};

export function regionOf(p: { lat: number; lng: number }): Region {
  if (p.lat >= 1.40) return 'NORTH';
  if (p.lat >= 1.355 && p.lng >= 103.87) return 'NORTH_EAST';
  if (p.lng >= 103.90) return 'EAST';
  if (p.lng <= 103.78) return 'WEST';
  return 'CENTRAL';
}
