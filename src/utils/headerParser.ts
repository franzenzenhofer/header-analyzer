import type { HeaderEntry } from '../types';

export function parseHeaders(request: Request): HeaderEntry {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const userAgent = headers['user-agent'] || 'Unknown';
  const botType = detectBotType(userAgent);

  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    headers,
    userAgent,
    ip: headers['cf-connecting-ip'] || headers['x-forwarded-for'] || 'Unknown',
    method: request.method,
    url: request.url,
    botType
  };
}

function detectBotType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('googlebot')) return 'Google';
  if (ua.includes('bingbot')) return 'Bing';
  if (ua.includes('slackbot')) return 'Slack';
  if (ua.includes('twitterbot')) return 'Twitter';
  if (ua.includes('facebookexternalhit')) return 'Facebook';
  if (ua.includes('linkedinbot')) return 'LinkedIn';
  if (ua.includes('whatsapp')) return 'WhatsApp';
  if (ua.includes('telegram')) return 'Telegram';
  if (ua.includes('discord')) return 'Discord';
  if (ua.includes('gpt') || ua.includes('claude')) return 'AI Assistant';
  if (ua.includes('bot') || ua.includes('crawler')) return 'Generic Bot';
  return 'Human';
}