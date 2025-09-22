import { describe, it, expect } from 'vitest';
import { filterEntries, getBotTypes } from '../src/utils/filter';
import type { HeaderEntry } from '../src/types';

describe('Filter Utils', () => {
  const mockEntries: HeaderEntry[] = [
    {
      id: '1',
      timestamp: Date.now() - 10000,
      headers: {},
      userAgent: 'Googlebot/2.1',
      ip: '1.1.1.1',
      method: 'GET',
      url: 'https://test.com',
      botType: 'Google'
    },
    {
      id: '2',
      timestamp: Date.now(),
      headers: {},
      userAgent: 'Mozilla/5.0',
      ip: '2.2.2.2',
      method: 'GET',
      url: 'https://test.com',
      botType: 'Human'
    }
  ];

  it('should filter by user agent', () => {
    const filtered = filterEntries(mockEntries, { userAgent: 'Google' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('1');
  });

  it('should filter by bot type', () => {
    const filtered = filterEntries(mockEntries, { botType: 'Human' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('2');
  });

  it('should filter by date range', () => {
    const filtered = filterEntries(mockEntries, {
      dateFrom: Date.now() - 5000
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('2');
  });

  it('should get unique bot types', () => {
    const types = getBotTypes(mockEntries);
    expect(types).toContain('Google');
    expect(types).toContain('Human');
    expect(types).toHaveLength(2);
  });
});