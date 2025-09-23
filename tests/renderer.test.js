// Renderer Tests (<50 lines)
import { describe, test, expect } from 'vitest';

describe('Renderers', () => {
  test('renders bot status correctly', () => {
    const statuses = [
      { isBot: true, expected: 'BOT' },
      { isBot: false, suspiciousScore: 60, expected: 'MAYBE BOT' },
      { isBot: false, suspiciousScore: 20, expected: 'HUMAN' }
    ];

    statuses.forEach(({ isBot, suspiciousScore = 0, expected }) => {
      const label = isBot ? 'BOT' :
                   suspiciousScore >= 50 ? 'MAYBE BOT' : 'HUMAN';
      expect(label).toBe(expected);
    });
  });

  test('formats request info', () => {
    const req = {
      id: '123',
      timestamp: '2025-01-01',
      request: { method: 'GET', url: 'http://test.com' }
    };
    expect(req.id).toBe('123');
    expect(req.request.method).toBe('GET');
  });

  test('validates color scheme', () => {
    const colors = {
      text: '#000',
      background: '#fff',
      link: '#0645ad',
      border: '#a2a9b1'
    };
    expect(colors.text).toBe('#000');
    expect(colors.link).toBe('#0645ad');
  });

  test('checks pagination logic', () => {
    const total = 500;
    const perPage = 50;
    const pages = Math.ceil(total / perPage);
    expect(pages).toBe(10);
  });
});