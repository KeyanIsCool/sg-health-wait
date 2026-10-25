// Build an unambiguous Google Maps directions URL.
// Using NAME + ADDRESS + "Singapore" + postal code produces far more accurate
// routing than raw lat/lng (which can resolve to a nearby road instead of the
// building). We include lat/lng as a fallback hint.
export function directionsUrl(f: { name: string; address: string; postalCode: string | null; lat: number; lng: number }) {
  const parts = [f.name, f.address];
  if (f.postalCode) parts.push(`Singapore ${f.postalCode}`);
  else parts.push('Singapore');
  const q = encodeURIComponent(parts.join(', '));
  // Google Maps best practice: pass a human-readable `destination` query.
  // Separately pin via `destination_place_id`? Not available without geocoding.
  return `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`;
}

// For a "View on map" (not directions) link that drops a pin at a known place.
export function placeUrl(f: { name: string; address: string; postalCode: string | null }) {
  const parts = [f.name, f.address];
  if (f.postalCode) parts.push(`Singapore ${f.postalCode}`);
  const q = encodeURIComponent(parts.join(', '));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
