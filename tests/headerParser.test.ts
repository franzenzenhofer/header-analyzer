import { describe, it, expect } from 'vitest';
import { parseHeaders } from '../src/utils/headerParser';

describe('Header Parser', () => {
  it('should parse request headers correctly', () => {
    const mockRequest = new Request('https://test.com', {
      headers: {
        'user-agent': 'Googlebot/2.1',
        'cf-connecting-ip': '192.168.1.1'
      }
    });

    const result = parseHeaders(mockRequest);

    expect(result.userAgent).toBe('Googlebot/2.1');
    expect(result.ip).toBe('192.168.1.1');
    expect(result.botType).toBe('Google');
    expect(result.method).toBe('GET');
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it('should detect different bot types', () => {
    const bots = [
      { ua: 'bingbot', expected: 'Bing' },
      { ua: 'facebookexternalhit', expected: 'Facebook' },
      { ua: 'Twitterbot', expected: 'Twitter' },
      { ua: 'Mozilla/5.0', expected: 'Human' }
    ];

    bots.forEach(bot => {
      const req = new Request('https://test.com', {
        headers: { 'user-agent': bot.ua }
      });
      const result = parseHeaders(req);
      expect(result.botType).toBe(bot.expected);
    });
  });
});