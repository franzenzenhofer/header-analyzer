import { describe, it, expect, beforeEach } from 'vitest';
import { HeaderStorage } from '../src/utils/storage';
import type { HeaderEntry } from '../src/types';

describe('Header Storage', () => {
  let storage: HeaderStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = new HeaderStorage();
  });

  it('should add entries correctly', () => {
    const entry: HeaderEntry = {
      id: 'test-1',
      timestamp: Date.now(),
      headers: { 'user-agent': 'test' },
      userAgent: 'test',
      ip: '127.0.0.1',
      method: 'GET',
      url: 'https://test.com',
      botType: 'Human'
    };

    storage.add(entry);
    const all = storage.getAll();
    expect(all).toHaveLength(1);
    expect(all[0]).toEqual(entry);
  });

  it('should limit entries to MAX_ENTRIES', () => {
    for (let i = 0; i < 1100; i++) {
      storage.add({
        id: `test-${i}`,
        timestamp: Date.now(),
        headers: {},
        userAgent: 'test',
        ip: '127.0.0.1',
        method: 'GET',
        url: 'https://test.com'
      });
    }
    expect(storage.getAll()).toHaveLength(1000);
  });

  it('should clear all entries', () => {
    storage.add({
      id: 'test',
      timestamp: Date.now(),
      headers: {},
      userAgent: 'test',
      ip: '127.0.0.1',
      method: 'GET',
      url: 'https://test.com'
    });
    storage.clear();
    expect(storage.getAll()).toHaveLength(0);
  });
});