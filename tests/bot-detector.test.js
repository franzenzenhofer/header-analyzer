// Bot Detector Tests (<50 lines)
import { describe, test, expect } from 'vitest';
import { detectBot } from '../bot-detector.js';

describe('Bot Detection', () => {
  test('detects Googlebot', () => {
    const headers = { 'user-agent': 'Googlebot/2.1' };
    const result = detectBot({}, headers, {});
    expect(result.isBot).toBe(true);
    expect(result.operator).toBe('Google');
  });

  test('detects ChatGPT signature', () => {
    const headers = {
      'signature': 'keyId=...',
      'signature-agent': 'chatgpt.com'
    };
    const result = detectBot({}, headers, {});
    expect(result.isBot).toBe(true);
    expect(result.operator).toBe('OpenAI');
  });

  test('detects Claude bot', () => {
    const headers = { 'user-agent': 'Claude-Web/1.0' };
    const result = detectBot({}, headers, {});
    expect(result.isBot).toBe(true);
    expect(result.operator).toBe('Anthropic');
  });

  test('detects human browser', () => {
    const headers = {
      'user-agent': 'Mozilla/5.0 Chrome/120.0',
      'accept-language': 'en-US',
      'accept-encoding': 'gzip, deflate'
    };
    const result = detectBot({}, headers, {});
    expect(result.isBot).toBe(false);
  });

  test('detects suspicious patterns', () => {
    const headers = { 'user-agent': 'python-requests/2.31' };
    const result = detectBot({}, headers, {});
    expect(result.isBot).toBe(true);
    expect(result.category).toBe('Developer');
  });
});