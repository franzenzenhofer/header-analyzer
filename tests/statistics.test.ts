import { describe, it, expect } from 'vitest';
import { calculateStatistics } from '../src/utils/statistics';
import type { HeaderEntry } from '../src/types';

describe('Statistics Calculator', () => {
  it('should calculate correct statistics', () => {
    const entries: HeaderEntry[] = [
      {
        id: '1',
        timestamp: Date.now(),
        headers: {},
        userAgent: 'Googlebot',
        ip: '1.1.1.1',
        method: 'GET',
        url: 'https://test.com',
        botType: 'Google'
      },
      {
        id: '2',
        timestamp: Date.now(),
        headers: {},
        userAgent: 'Googlebot',
        ip: '2.2.2.2',
        method: 'GET',
        url: 'https://test.com',
        botType: 'Google'
      },
      {
        id: '3',
        timestamp: Date.now(),
        headers: {},
        userAgent: 'Bingbot',
        ip: '2.2.2.2',
        method: 'GET',
        url: 'https://test.com',
        botType: 'Bing'
      }
    ];

    const stats = calculateStatistics(entries);

    expect(stats.totalRequests).toBe(3);
    expect(stats.uniqueIPs).toBe(2);
    expect(stats.botTypes['Google']).toBe(2);
    expect(stats.botTypes['Bing']).toBe(1);
    expect(stats.topUserAgents[0]).toEqual({ agent: 'Googlebot', count: 2 });
  });

  it('should handle empty entries', () => {
    const stats = calculateStatistics([]);
    expect(stats.totalRequests).toBe(0);
    expect(stats.uniqueIPs).toBe(0);
    expect(stats.topUserAgents).toHaveLength(0);
  });
});