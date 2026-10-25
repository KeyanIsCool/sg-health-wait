// Normalized record every data-source adapter must return.
export type NormalizedWaitRecord = {
  facilitySlug: string;
  waitType: 'AE' | 'CONSULT';
  waitMinutes: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  sourceType: 'OFFICIAL' | 'SCRAPED' | 'CROWDSOURCED' | 'MANUAL' | 'ESTIMATED';
  sourceName: string;
  reportedAt: Date;
  expiresAt: Date;
  collectionMethod?: string;
};

export interface DataSourceAdapter {
  readonly name: string;
  readonly kind: 'OFFICIAL' | 'SCRAPED' | 'CROWD' | 'MANUAL';
  fetch(): Promise<NormalizedWaitRecord[]>;
}
