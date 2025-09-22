export interface HeaderEntry {
  id: string;
  timestamp: number;
  headers: Record<string, string>;
  userAgent: string;
  ip: string;
  method: string;
  url: string;
  botType?: string;
}

export interface FilterOptions {
  userAgent?: string;
  botType?: string;
  dateFrom?: number;
  dateTo?: number;
}

export interface Statistics {
  totalRequests: number;
  uniqueIPs: number;
  botTypes: Record<string, number>;
  topUserAgents: Array<{ agent: string; count: number }>;
  requestsPerHour: Array<{ hour: string; count: number }>;
}