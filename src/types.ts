export type Level = 'project' | 'campaign' | 'adGroup' | 'ad';

export interface AdMetrics {
  name: string;
  budget: string;
  spend: string;
  registrations: number;
  cpa: string;
  ctr: string;
  cpc: string;
  cpm: string;
}

export interface AdNode {
  id: string;
  name: string;
  level: Level;
  children?: AdNode[];
  metrics?: AdMetrics;
  remark?: string;
  imageUrl?: string;
}
