// Request capture module (<50 lines)
import { detectBot } from './bot-engine.js';

export function captureRequest(request, env) {
  const url = new URL(request.url);
  const headers = {};
  request.headers.forEach((v, k) => headers[k] = v);
  const cf = request.cf || {};
  const geo = {
    country: cf.country || headers['cf-ipcountry'],
    city: cf.city,
    asn: cf.asn,
    colo: cf.colo
  };

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    timestampMs: Date.now(),
    request: {
      method: request.method,
      url: request.url,
      path: url.pathname,
      host: url.host
    },
    headers,
    cookies: parseCookies(headers['cookie']),
    query: Object.fromEntries(url.searchParams),
    network: {
      ip: cf.ip || headers['cf-connecting-ip'] || headers['x-forwarded-for'] || 'unknown',
      country: geo.country || 'unknown',
      city: geo.city || 'unknown',
      asn: geo.asn || 'unknown'
    },
    geo,
    bot: detectBot(headers, cf),
    cf
  };
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(c => {
      const [n, v] = c.trim().split('=');
      if (n) cookies[n] = v || '';
    });
  }
  return cookies;
}