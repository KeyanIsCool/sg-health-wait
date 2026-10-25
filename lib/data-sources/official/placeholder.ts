import type { DataSourceAdapter, NormalizedWaitRecord } from '../types';

// Placeholder for a future official hospital wait-time API.
// Do NOT scrape sources in violation of their terms. Prefer official feeds.
export const officialAEAdapter: DataSourceAdapter = {
  name: 'Hospital A&E (official)',
  kind: 'OFFICIAL',
  async fetch(): Promise<NormalizedWaitRecord[]> {
    // TODO: integrate against each hospital's public endpoint once available.
    return [];
  },
};
