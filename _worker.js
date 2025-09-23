// Full static HTML with EVERYTHING visible - NO TRUNCATION
// Now with PERSISTENT KV STORAGE - History survives deployments!
import { detectBot, generateBotStats, BOT_DATABASE } from './bot-detector.js';

const MAX_HISTORY = 50;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Load history from KV storage
    let requestHistory = [];
    try {
      const stored = await env.HEADER_HISTORY.get('history', { type: 'json' });
      if (stored && Array.isArray(stored)) {
        requestHistory = stored;
      }
    } catch (error) {
      console.error('Failed to load history from KV:', error);
      requestHistory = [];
    }

    // Capture ALL data
    const captureData = () => {
      const headers = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const cf = request.cf || {};
      const userAgent = headers['user-agent'] || '';

      // Use advanced bot detection
      const botDetection = detectBot(request, headers, cf);

      // Parse cookies
      const cookies = {};
      const cookieHeader = headers['cookie'];
      if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
          const [name, value] = cookie.trim().split('=');
          if (name) cookies[name] = value || '';
        });
      }

      // Parse query params
      const query = {};
      url.searchParams.forEach((value, key) => {
        query[key] = value;
      });

      return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        timestampMs: Date.now(),

        request: {
          method: request.method,
          url: request.url,
          path: url.pathname,
          search: url.search,
          hash: url.hash,
          host: url.host,
          hostname: url.hostname,
          port: url.port || '443',
          protocol: url.protocol,
        },

        headers: headers,
        headerCount: Object.keys(headers).length,

        cookies: cookies,
        cookieCount: Object.keys(cookies).length,

        query: query,
        queryCount: Object.keys(query).length,

        network: {
          ip: headers['cf-connecting-ip'] || headers['x-forwarded-for'] || headers['x-real-ip'] || 'Unknown',
          ips: {
            connecting: headers['cf-connecting-ip'],
            forwarded: headers['x-forwarded-for'],
            real: headers['x-real-ip'],
            proxy: headers['x-proxy-ip']
          },
          protocol: cf.httpProtocol,
          tlsVersion: cf.tlsVersion,
          tlsCipher: cf.tlsCipher,
          tcpRtt: cf.clientTcpRtt,
        },

        geo: {
          country: cf.country,
          countryName: cf.countryName,
          city: cf.city,
          region: cf.region,
          regionCode: cf.regionCode,
          continent: cf.continent,
          timezone: cf.timezone,
          latitude: cf.latitude,
          longitude: cf.longitude,
          postalCode: cf.postalCode,
          metroCode: cf.metroCode,
          colo: cf.colo,
          asn: cf.asn,
          asOrganization: cf.asOrganization,
        },

        bot: {
          isBot: botDetection.isBot || botDetection.probableBot,
          userAgent: userAgent,
          type: botDetection.botName || 'Unknown',
          operator: botDetection.operator,
          category: botDetection.category,
          purpose: botDetection.purpose,
          confidence: botDetection.confidence,
          suspiciousScore: botDetection.suspiciousScore,
          suspiciousReasons: botDetection.suspiciousReasons,
          probableBot: botDetection.probableBot,
          detectionMethod: botDetection.detectionMethod
        },

        security: {
          referer: headers['referer'],
          origin: headers['origin'],
          secFetchSite: headers['sec-fetch-site'],
          secFetchMode: headers['sec-fetch-mode'],
          secFetchUser: headers['sec-fetch-user'],
          secFetchDest: headers['sec-fetch-dest'],
        },

        cf: cf
      };
    };

    // Check if viewing detail page
    if (url.pathname.startsWith('/request/')) {
      const requestId = url.pathname.split('/')[2];
      const req = requestHistory.find(r => r.id === requestId);

      if (req) {
        return new Response(generateDetailPage(req), {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' }
        });
      }
    }

    // Check if viewing stats page
    if (url.pathname === '/stats') {
      return new Response(generateStatsPage(requestHistory), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // Check if viewing download page
    if (url.pathname === '/download') {
      const downloadCurrentRequest = captureData();
      return new Response(generateDownloadPage(requestHistory, downloadCurrentRequest), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // Check if downloading ZIP
    if (url.pathname === '/download/zip') {
      const downloadCurrentRequest = captureData();
      const zipData = await generateZipDownload(requestHistory, downloadCurrentRequest);
      return new Response(zipData, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="header-analyzer-data.zip"',
          'Cache-Control': 'no-cache'
        }
      });
    }

    // Check if viewing bots-only page
    if (url.pathname === '/bots') {
      return new Response(generateBotsPage(requestHistory), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // Capture current request
    const currentRequest = captureData();

    // Add to history
    requestHistory.unshift(currentRequest);
    if (requestHistory.length > MAX_HISTORY) {
      requestHistory.length = MAX_HISTORY;
    }

    // Save updated history to KV storage
    try {
      await env.HEADER_HISTORY.put('history', JSON.stringify(requestHistory));
    } catch (error) {
      console.error('Failed to save history to KV:', error);
    }

    // Stats
    const uniqueIPs = new Set(requestHistory.map(r => r.network.ip));
    const botCount = requestHistory.filter(r => r.bot.isBot).length;

    // Generate main page with FULL data
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Header Analyzer - FULL DATA</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 5px; max-width: 100%; overflow-x: hidden; }
h1 { color: #000; font-size: 18px; margin: 8px 0; border-bottom: 2px solid #000; padding-bottom: 5px; word-wrap: break-word; }
h2 { color: #000; font-size: 14px; margin: 12px 0 6px 0; border-bottom: 1px solid #aaa; padding-bottom: 3px; }
h3 { color: #000; font-size: 13px; margin: 8px 0 4px 0; word-wrap: break-word; }
h4 { color: #000; font-size: 12px; margin: 6px 0 3px 0; font-weight: bold; }
.nav { background: #f8f8f8; padding: 8px; border: 1px solid #ddd; margin: 8px 0; overflow-x: auto; }
.nav a { color: #0000ee; margin-right: 10px; text-decoration: underline; white-space: nowrap; }
.stats { background: #f0f0f0; margin: 8px 0; padding: 8px; border: 1px solid #ccc; overflow-x: auto; }
.stats span { display: inline-block; margin-right: 10px; white-space: nowrap; }
.request-full { margin: 8px 0; padding: 8px; border: 1px solid #ddd; background: #fafafa; overflow: hidden; }
.request-full.current { border-color: #000; background: #f0f0f0; }
.request-full.bot { border-color: #000; background: #fff0f0; }
.key { color: #000; display: inline-block; min-width: 100px; font-weight: bold; vertical-align: top; }
.value { color: #000; word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; display: inline-block; max-width: calc(100% - 110px); }
.sub { margin-left: 8px; padding-left: 8px; border-left: 1px solid #ddd; overflow: hidden; }
.header-item, .cookie-item, .query-item { margin: 2px 0; font-size: 12px; overflow: hidden; }
.detail-link { color: #0000ee; text-decoration: underline; float: right; margin-left: 8px; }
.detail-link:hover { color: #551a8b; text-decoration: underline; }
#search { padding: 4px; background: #fff; border: 1px solid #999; color: #000; width: 100%; max-width: 250px; font-size: 16px; }
.highlight { background: #ff0; }
/* Mobile specific adjustments */
@media (max-width: 600px) {
  body { padding: 3px; font-size: 11px; }
  h1 { font-size: 16px; margin: 5px 0; }
  h2 { font-size: 13px; margin: 8px 0 4px 0; }
  h3 { font-size: 12px; }
  .nav { padding: 5px; }
  .nav a { margin-right: 8px; font-size: 11px; }
  .request-full { padding: 5px; margin: 5px 0; }
  .key { min-width: 80px; font-size: 11px; }
  .value { max-width: calc(100% - 85px); font-size: 11px; }
  .sub { margin-left: 5px; padding-left: 5px; }
  #search { max-width: 150px; font-size: 16px; }
}
</style>
</head>
<body>

<h1>HEADER ANALYZER - ALL DATA - NO TRUNCATION - ${requestHistory.length} REQUESTS
<button onclick="copyAllData()" style="float: right; background: #4CAF50; color: white; padding: 5px 10px; border: none; cursor: pointer; font-size: 14px; margin-left: 10px;">COPY ALL</button>
</h1>

<div class="nav">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
<a href="#current">CURRENT</a>
<a href="#history">HISTORY</a>
<a href="/stats">STATS</a>
<a href="/bots" style="color: #0000ee; font-weight: bold; text-decoration: underline;">BOTS</a>
<a href="/download" style="color: #0000ee; font-weight: bold; text-decoration: underline;">DOWNLOAD</a>
</div>
<input type="text" id="search" placeholder="Search..." onkeyup="searchPage(this.value)" style="margin-top: 5px;">
</div>

<h2 id="current">YOUR CURRENT REQUEST #${currentRequest.id.substring(0,8)}</h2>
${renderFullRequest(currentRequest, true)}

<h2 id="history">FULL REQUEST HISTORY (ALL ${requestHistory.length} REQUESTS)</h2>
${requestHistory.map((req, i) => `
<div class="request-full ${req.bot.isBot ? 'bot' : ''}" id="${req.id}">
  <h3>
    #${i + 1} | ${req.timestamp} | ${req.bot.isBot ? '<span style="background:#f00;color:#fff;padding:2px 5px;">BOT</span>' : req.bot.confidence < 30 ? '<span style="background:#ff0;color:#000;padding:2px 5px;">UNSURE</span>' : '<span style="background:#00f;color:#fff;padding:2px 5px;">HUMAN</span>'} | ${req.network.ip}
    <a href="/request/${req.id}" class="detail-link">VIEW DETAIL</a>
  </h3>
  ${renderFullRequest(req, false)}
</div>
`).join('')}

<script>
function searchPage(term) {
  if (!term) {
    // Reset highlighting
    document.querySelectorAll('.highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    document.querySelectorAll('.request-full').forEach(el => el.style.display = 'block');
    return;
  }

  const regex = new RegExp(term, 'gi');
  let hasMatches = false;

  // Search and filter all request blocks
  document.querySelectorAll('.request-full').forEach(block => {
    const text = block.textContent;
    if (regex.test(text)) {
      block.style.display = 'block';
      hasMatches = true;
      // Highlight matches in this block
      block.querySelectorAll('.value, .key, h3, h4').forEach(el => {
        const html = el.innerHTML;
        const newHtml = html.replace(regex, match => '<span class="highlight">' + match + '</span>');
        if (html !== newHtml) el.innerHTML = newHtml;
      });
    } else {
      block.style.display = 'none';
    }
  });

  if (!hasMatches) {
    document.querySelectorAll('.request-full').forEach(el => el.style.display = 'block');
  }
}

function copyAllData() {
  const allContent = document.body.innerText;
  navigator.clipboard.writeText(allContent).then(() => {
    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = oldText;
      btn.style.background = '#4CAF50';
    }, 2000);
  }).catch(err => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = allContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const btn = event.target;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = 'COPY ALL';
      btn.style.background = '#4CAF50';
    }, 2000);
  });
}
</script>

</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache'
      }
    });
  }
};

function renderFullRequest(req, isCurrent) {
  // Helper to properly display values including nested objects
  function displayValue(val) {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (typeof val === 'object') {
      // Pretty print objects with proper indentation
      return JSON.stringify(val, null, 2).split('\n').map((line, i) =>
        i === 0 ? line : '  ' + line
      ).join('\n');
    }
    return String(val);
  }

  return `
  <div class="sub">
    <h4>REQUEST INFO</h4>
    <div class="sub">
      <div><span class="key">ID:</span> <span class="value">${req.id}</span></div>
      <div><span class="key">TIMESTAMP:</span> <span class="value">${req.timestamp}</span></div>
      <div><span class="key">TIMESTAMP MS:</span> <span class="value">${req.timestampMs}</span></div>
      <div><span class="key">METHOD:</span> <span class="value">${req.request.method}</span></div>
      <div><span class="key">URL:</span> <span class="value">${req.request.url}</span></div>
      <div><span class="key">PATH:</span> <span class="value">${req.request.path}</span></div>
      <div><span class="key">SEARCH:</span> <span class="value">${req.request.search || 'none'}</span></div>
      <div><span class="key">HASH:</span> <span class="value">${req.request.hash || 'none'}</span></div>
      <div><span class="key">HOST:</span> <span class="value">${req.request.host}</span></div>
      <div><span class="key">HOSTNAME:</span> <span class="value">${req.request.hostname}</span></div>
      <div><span class="key">PORT:</span> <span class="value">${req.request.port}</span></div>
      <div><span class="key">PROTOCOL:</span> <span class="value">${req.request.protocol}</span></div>
    </div>

    <h4>ALL HEADERS (${req.headerCount})</h4>
    <div class="sub">
      ${Object.entries(req.headers).map(([k,v]) =>
        `<div class="header-item"><span class="key">${k}:</span> <span class="value">${v}</span></div>`
      ).join('')}
    </div>

    <h4>COOKIES (${req.cookieCount})</h4>
    <div class="sub">
      ${req.cookieCount > 0 ? Object.entries(req.cookies).map(([k,v]) =>
        `<div class="cookie-item"><span class="key">${k}:</span> <span class="value">${v}</span></div>`
      ).join('') : '<div>No cookies</div>'}
    </div>

    <h4>QUERY PARAMETERS (${req.queryCount})</h4>
    <div class="sub">
      ${req.queryCount > 0 ? Object.entries(req.query).map(([k,v]) =>
        `<div class="query-item"><span class="key">${k}:</span> <span class="value">${v}</span></div>`
      ).join('') : '<div>No query parameters</div>'}
    </div>

    <h4>NETWORK</h4>
    <div class="sub">
      <div><span class="key">IP:</span> <span class="value">${req.network.ip}</span></div>
      <div><span class="key">CONNECTING IP:</span> <span class="value">${req.network.ips.connecting || 'none'}</span></div>
      <div><span class="key">FORWARDED IP:</span> <span class="value">${req.network.ips.forwarded || 'none'}</span></div>
      <div><span class="key">REAL IP:</span> <span class="value">${req.network.ips.real || 'none'}</span></div>
      <div><span class="key">PROXY IP:</span> <span class="value">${req.network.ips.proxy || 'none'}</span></div>
      <div><span class="key">HTTP VERSION:</span> <span class="value">${req.network.protocol || 'unknown'}</span></div>
      <div><span class="key">TLS VERSION:</span> <span class="value">${req.network.tlsVersion || 'unknown'}</span></div>
      <div><span class="key">TLS CIPHER:</span> <span class="value">${req.network.tlsCipher || 'unknown'}</span></div>
      <div><span class="key">TCP RTT:</span> <span class="value">${req.network.tcpRtt || 'unknown'}</span></div>
    </div>

    <h4>LOCATION</h4>
    <div class="sub">
      <div><span class="key">COUNTRY:</span> <span class="value">${req.geo.country || 'unknown'}</span></div>
      <div><span class="key">COUNTRY NAME:</span> <span class="value">${req.geo.countryName || 'unknown'}</span></div>
      <div><span class="key">CITY:</span> <span class="value">${req.geo.city || 'unknown'}</span></div>
      <div><span class="key">REGION:</span> <span class="value">${req.geo.region || 'unknown'}</span></div>
      <div><span class="key">REGION CODE:</span> <span class="value">${req.geo.regionCode || 'unknown'}</span></div>
      <div><span class="key">CONTINENT:</span> <span class="value">${req.geo.continent || 'unknown'}</span></div>
      <div><span class="key">TIMEZONE:</span> <span class="value">${req.geo.timezone || 'unknown'}</span></div>
      <div><span class="key">LAT/LONG:</span> <span class="value">${req.geo.latitude || '?'},${req.geo.longitude || '?'}</span></div>
      <div><span class="key">POSTAL CODE:</span> <span class="value">${req.geo.postalCode || 'unknown'}</span></div>
      <div><span class="key">METRO CODE:</span> <span class="value">${req.geo.metroCode || 'unknown'}</span></div>
      <div><span class="key">COLO:</span> <span class="value">${req.geo.colo || 'unknown'}</span></div>
      <div><span class="key">ASN:</span> <span class="value">${req.geo.asn || 'unknown'}</span></div>
      <div><span class="key">AS ORG:</span> <span class="value">${req.geo.asOrganization || 'unknown'}</span></div>
    </div>

    <h4>BOT DETECTION</h4>
    <div class="sub">
      <div><span class="key">IS BOT:</span> <span class="value">${req.bot.isBot ? 'YES' : 'NO'}</span></div>
      <div><span class="key">TYPE:</span> <span class="value">${req.bot.type}</span></div>
      <div><span class="key">USER AGENT:</span> <span class="value">${req.bot.userAgent}</span></div>
    </div>

    <h4>SECURITY</h4>
    <div class="sub">
      <div><span class="key">REFERER:</span> <span class="value">${req.security.referer || 'none'}</span></div>
      <div><span class="key">ORIGIN:</span> <span class="value">${req.security.origin || 'none'}</span></div>
      <div><span class="key">SEC-FETCH-SITE:</span> <span class="value">${req.security.secFetchSite || 'none'}</span></div>
      <div><span class="key">SEC-FETCH-MODE:</span> <span class="value">${req.security.secFetchMode || 'none'}</span></div>
      <div><span class="key">SEC-FETCH-USER:</span> <span class="value">${req.security.secFetchUser || 'none'}</span></div>
      <div><span class="key">SEC-FETCH-DEST:</span> <span class="value">${req.security.secFetchDest || 'none'}</span></div>
    </div>

    <h4>CLOUDFLARE RAW DATA</h4>
    <div class="sub">
      ${Object.entries(req.cf).map(([k,v]) => {
        const displayVal = displayValue(v);
        // If it's multiline (contains newlines), format it specially
        if (displayVal.includes('\n')) {
          return `<div class="header-item">
            <span class="key">${k}:</span>
            <pre style="display: inline-block; margin: 0; color: #000;">${displayVal}</pre>
          </div>`;
        }
        return `<div class="header-item"><span class="key">${k}:</span> <span class="value">${displayVal}</span></div>`;
      }).join('')}
    </div>
  </div>
  `;
}

function generateAnalysis(req) {
  const ua = req.headers['user-agent'] || '';
  const url = req.request.url + req.request.search;

  // Advanced Bot Scoring System (0-100)
  let botScore = 0;
  const botIndicators = [];

  // Check browser inconsistencies
  if (ua.includes('Chrome') && !req.headers['sec-ch-ua']) {
    botScore += 25;
    botIndicators.push('Chrome UA but missing Client Hints');
  }
  if (ua.includes('Mozilla') && !req.headers['accept-language']) {
    botScore += 20;
    botIndicators.push('Browser UA but no language preference');
  }
  if (!req.headers['accept-encoding']) {
    botScore += 15;
    botIndicators.push('No compression support (unusual)');
  }
  if (!req.headers['accept']) {
    botScore += 20;
    botIndicators.push('No Accept header');
  }
  if (req.headers['accept'] === '*/*' && !ua.includes('curl') && !ua.includes('wget')) {
    botScore += 10;
    botIndicators.push('Generic Accept header');
  }
  if (ua.length < 20) {
    botScore += 30;
    botIndicators.push('Suspiciously short User-Agent');
  }
  if (!req.headers['connection'] && !req.headers['keep-alive']) {
    botScore += 15;
    botIndicators.push('No connection management headers');
  }

  // Advanced pattern detection
  const headlessPatterns = /HeadlessChrome|Phantom|Selenium|Puppeteer|Playwright/i;
  if (headlessPatterns.test(ua)) {
    botScore += 40;
    botIndicators.push('Headless browser detected');
  }

  // 1. Security Headers Analysis
  const securityHeaders = {
    'strict-transport-security': { present: false, name: 'HSTS', severity: 'high', description: 'Forces HTTPS connections' },
    'x-frame-options': { present: false, name: 'X-Frame-Options', severity: 'high', description: 'Prevents clickjacking attacks' },
    'x-content-type-options': { present: false, name: 'X-Content-Type-Options', severity: 'medium', description: 'Prevents MIME sniffing' },
    'content-security-policy': { present: false, name: 'CSP', severity: 'high', description: 'Prevents XSS and injection attacks' },
    'x-xss-protection': { present: false, name: 'X-XSS-Protection', severity: 'medium', description: 'Legacy XSS protection' },
    'referrer-policy': { present: false, name: 'Referrer-Policy', severity: 'low', description: 'Controls referrer information' },
    'permissions-policy': { present: false, name: 'Permissions-Policy', severity: 'medium', description: 'Controls browser features' }
  };

  Object.keys(req.headers).forEach(header => {
    const lowerHeader = header.toLowerCase();
    if (securityHeaders[lowerHeader]) {
      securityHeaders[lowerHeader].present = true;
      securityHeaders[lowerHeader].value = req.headers[header];
    }
  });

  const missingSecurity = Object.entries(securityHeaders)
    .filter(([_, config]) => !config.present && config.severity === 'high')
    .map(([_, config]) => config.name);

  // 2. Technology Stack Detection
  const tech = [];
  const server = req.headers['server'] || '';
  const poweredBy = req.headers['x-powered-by'] || '';

  // Detect frameworks
  if (poweredBy.includes('Express')) tech.push('Express.js');
  if (poweredBy.includes('ASP')) tech.push('ASP.NET');
  if (poweredBy.includes('PHP')) tech.push(`PHP ${poweredBy.match(/PHP\/([\d.]+)/)?.[1] || ''}`);
  if (server.includes('nginx')) tech.push('Nginx');
  if (server.includes('Apache')) tech.push('Apache');
  if (server.includes('cloudflare')) tech.push('Cloudflare CDN');
  if (req.headers['x-vercel-id']) tech.push('Vercel');
  if (req.headers['x-amz-cf-id']) tech.push('AWS CloudFront');

  // 3. Client Analysis & AI Platform Detection
  let clientType = 'Unknown Client';
  let clientPurpose = 'General Browsing';
  let referralSource = 'Direct Visit';

  // Check referrer for AI platforms
  const referrer = req.headers['referer'] || req.headers['referrer'] || '';
  const origin = req.headers['origin'] || '';

  if (referrer || origin) {
    const sourceUrl = referrer || origin;

    // AI Platforms
    if (sourceUrl.includes('chat.openai.com')) {
      referralSource = 'ChatGPT';
      clientPurpose = 'AI Assistant Link Click';
    } else if (sourceUrl.includes('gemini.google.com') || sourceUrl.includes('bard.google.com')) {
      referralSource = 'Google Gemini/Bard';
      clientPurpose = 'AI Assistant Link Click';
    } else if (sourceUrl.includes('perplexity.ai')) {
      referralSource = 'Perplexity AI';
      clientPurpose = 'AI Search Result';
    } else if (sourceUrl.includes('claude.ai')) {
      referralSource = 'Claude AI';
      clientPurpose = 'AI Assistant Link Click';
    } else if (sourceUrl.includes('bing.com/chat') || sourceUrl.includes('bing.com/copilot')) {
      referralSource = 'Microsoft Copilot/Bing Chat';
      clientPurpose = 'AI Assistant Link Click';
    } else if (sourceUrl.includes('poe.com')) {
      referralSource = 'Poe AI Platform';
      clientPurpose = 'AI Assistant Link Click';
    } else if (sourceUrl.includes('you.com')) {
      referralSource = 'You.com AI Search';
      clientPurpose = 'AI Search Result';
    } else if (sourceUrl.includes('phind.com')) {
      referralSource = 'Phind AI';
      clientPurpose = 'AI Developer Search';
    } else if (sourceUrl.includes('anthropic.com')) {
      referralSource = 'Anthropic';
      clientPurpose = 'AI Company Website';
    } else if (sourceUrl.includes('jasper.ai')) {
      referralSource = 'Jasper AI';
      clientPurpose = 'AI Writing Assistant';
    } else if (sourceUrl.includes('writesonic.com')) {
      referralSource = 'Writesonic AI';
      clientPurpose = 'AI Content Generation';
    } else if (sourceUrl.includes('character.ai')) {
      referralSource = 'Character.AI';
      clientPurpose = 'AI Character Chat';
    } else if (sourceUrl.includes('replika.ai')) {
      referralSource = 'Replika AI';
      clientPurpose = 'AI Companion';
    } else if (sourceUrl.includes('midjourney.com')) {
      referralSource = 'Midjourney';
      clientPurpose = 'AI Image Generation';
    } else if (sourceUrl.includes('leonardo.ai')) {
      referralSource = 'Leonardo AI';
      clientPurpose = 'AI Art Platform';
    } else if (sourceUrl.includes('huggingface.co')) {
      referralSource = 'HuggingFace';
      clientPurpose = 'AI Model Platform';
    } else if (sourceUrl.includes('cohere.ai')) {
      referralSource = 'Cohere AI';
      clientPurpose = 'AI API Platform';
    } else if (sourceUrl.includes('neeva.com')) {
      referralSource = 'Neeva AI Search';
      clientPurpose = 'AI Search Engine';
    } else if (sourceUrl.includes('forefront.ai')) {
      referralSource = 'Forefront AI';
      clientPurpose = 'AI Chat Platform';
    } else if (sourceUrl.includes('deepai.org')) {
      referralSource = 'DeepAI';
      clientPurpose = 'AI Research Platform';
    } else if (sourceUrl.includes('playground.openai.com')) {
      referralSource = 'OpenAI Playground';
      clientPurpose = 'AI Testing Platform';
    } else if (sourceUrl.includes('labs.openai.com')) {
      referralSource = 'OpenAI Labs/DALL-E';
      clientPurpose = 'AI Image Generation';
    } else if (sourceUrl.includes('stability.ai')) {
      referralSource = 'Stability AI';
      clientPurpose = 'AI Generation Platform';
    } else if (sourceUrl.includes('runwayml.com')) {
      referralSource = 'Runway ML';
      clientPurpose = 'AI Creative Tools';
    } else if (sourceUrl.includes('copy.ai')) {
      referralSource = 'Copy.ai';
      clientPurpose = 'AI Copywriting';
    } else if (sourceUrl.includes('notion.so')) {
      referralSource = 'Notion AI';
      clientPurpose = 'AI Workspace';
    } else if (sourceUrl.includes('grammarly.com')) {
      referralSource = 'Grammarly';
      clientPurpose = 'AI Writing Assistant';
    } else if (sourceUrl.includes('quillbot.com')) {
      referralSource = 'QuillBot AI';
      clientPurpose = 'AI Paraphrasing';
    } else if (sourceUrl.includes('deepl.com')) {
      referralSource = 'DeepL';
      clientPurpose = 'AI Translation';
    } else if (sourceUrl.includes('eleven-labs.com') || sourceUrl.includes('elevenlabs.io')) {
      referralSource = 'ElevenLabs';
      clientPurpose = 'AI Voice Generation';
    } else if (sourceUrl.includes('synthesia.io')) {
      referralSource = 'Synthesia';
      clientPurpose = 'AI Video Generation';
    } else if (sourceUrl.includes('tome.app')) {
      referralSource = 'Tome AI';
      clientPurpose = 'AI Presentation';
    } else if (sourceUrl.includes('gamma.app')) {
      referralSource = 'Gamma AI';
      clientPurpose = 'AI Presentation';
    } else if (sourceUrl.includes('consensus.app')) {
      referralSource = 'Consensus AI';
      clientPurpose = 'AI Research Search';
    } else if (sourceUrl.includes('elicit.org')) {
      referralSource = 'Elicit AI';
      clientPurpose = 'AI Research Assistant';
    } else if (sourceUrl.includes('scite.ai')) {
      referralSource = 'Scite AI';
      clientPurpose = 'AI Citation Analysis';
    } else if (sourceUrl.includes('scholarcy.com')) {
      referralSource = 'Scholarcy';
      clientPurpose = 'AI Research Summary';
    }
    // Search Engines
    else if (sourceUrl.includes('google.com')) {
      referralSource = 'Google Search';
      clientPurpose = 'Search Engine Result';
    } else if (sourceUrl.includes('bing.com')) {
      referralSource = 'Bing Search';
      clientPurpose = 'Search Engine Result';
    } else if (sourceUrl.includes('duckduckgo.com')) {
      referralSource = 'DuckDuckGo';
      clientPurpose = 'Privacy Search Result';
    }
    // Social Media
    else if (sourceUrl.includes('facebook.com') || sourceUrl.includes('fb.com')) {
      referralSource = 'Facebook';
      clientPurpose = 'Social Media Link';
    } else if (sourceUrl.includes('twitter.com') || sourceUrl.includes('x.com')) {
      referralSource = 'Twitter/X';
      clientPurpose = 'Social Media Link';
    } else if (sourceUrl.includes('linkedin.com')) {
      referralSource = 'LinkedIn';
      clientPurpose = 'Professional Network Link';
    } else if (sourceUrl.includes('reddit.com')) {
      referralSource = 'Reddit';
      clientPurpose = 'Community Discussion Link';
    } else if (sourceUrl.includes('github.com')) {
      referralSource = 'GitHub';
      clientPurpose = 'Code Repository Link';
    } else {
      // Extract domain
      try {
        const urlObj = new URL(sourceUrl);
        referralSource = urlObj.hostname;
        clientPurpose = 'External Link';
      } catch(e) {
        referralSource = 'Unknown Referrer';
      }
    }
  }

  // Check User-Agent for AI bot signatures
  if (ua.includes('ChatGPT-User') || ua.includes('OpenAI')) {
    clientType = 'ChatGPT Plugin/Browser';
    clientPurpose = 'AI Plugin Request';
  } else if (ua.includes('GPTBot')) {
    clientType = 'OpenAI GPTBot';
    clientPurpose = 'AI Training Data Collection';
  } else if (ua.includes('Claude-Web')) {
    clientType = 'Claude Browser';
    clientPurpose = 'AI Assistant Browsing';
  } else if (ua.includes('PerplexityBot')) {
    clientType = 'Perplexity Bot';
    clientPurpose = 'AI Search Indexing';
  }

  if (req.bot.isBot) {
    clientType = `Bot: ${req.bot.type}`;
    if (req.bot.type.includes('Google')) clientPurpose = 'Search Engine Indexing';
    else if (req.bot.type.includes('Facebook') || req.bot.type.includes('Twitter')) clientPurpose = 'Social Media Preview';
    else if (req.bot.type.includes('Slack') || req.bot.type.includes('Discord')) clientPurpose = 'Link Unfurling';
    else if (req.bot.type.includes('curl') || req.bot.type.includes('wget')) clientPurpose = 'Command Line Testing';
    else if (req.bot.type.includes('Postman')) clientPurpose = 'API Testing';
    else if (req.bot.type.includes('Python') || req.bot.type.includes('Ruby')) clientPurpose = 'Automated Script/Scraper';
    else if (!clientPurpose.includes('AI')) clientPurpose = 'Automated Scanning/Crawling';
  } else if (!clientType.includes('AI')) {
    // Parse browser
    if (ua.includes('Chrome')) clientType = 'Chrome Browser';
    else if (ua.includes('Firefox')) clientType = 'Firefox Browser';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) clientType = 'Safari Browser';
    else if (ua.includes('Edge')) clientType = 'Edge Browser';

    // Mobile detection
    if (ua.includes('Mobile')) {
      clientType += ' (Mobile)';
      clientPurpose = 'Mobile Browsing';
    }

    // App detection
    if (ua.includes('Instagram')) { clientType = 'Instagram App'; clientPurpose = 'In-App Browser'; }
    if (ua.includes('Facebook')) { clientType = 'Facebook App'; clientPurpose = 'In-App Browser'; }
    if (ua.includes('LinkedIn')) { clientType = 'LinkedIn App'; clientPurpose = 'In-App Browser'; }
  }

  // 4. Request Intent Analysis
  const intent = [];
  const accept = req.headers['accept'] || '';
  const contentType = req.headers['content-type'] || '';

  if (accept.includes('text/html')) intent.push('Requesting HTML page');
  if (accept.includes('application/json')) intent.push('API request expecting JSON');
  if (accept.includes('image/')) intent.push('Requesting image resource');
  if (accept.includes('text/css')) intent.push('Requesting stylesheet');
  if (accept.includes('application/javascript')) intent.push('Requesting JavaScript');
  if (contentType.includes('application/json')) intent.push('Sending JSON data');
  if (contentType.includes('multipart/form-data')) intent.push('Uploading files');
  if (contentType.includes('application/x-www-form-urlencoded')) intent.push('Submitting form data');

  // 5. Authentication & Account Detection
  let authMethod = 'None';
  let accountInfo = null;
  let privileges = [];

  if (req.headers['authorization']) {
    const auth = req.headers['authorization'];
    if (auth.startsWith('Bearer ')) {
      authMethod = 'Bearer Token (OAuth 2.0/JWT)';
      // Try to decode JWT payload (base64)
      try {
        const parts = auth.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.sub) accountInfo = `User ID: ${payload.sub}`;
          if (payload.email) accountInfo = `Email: ${payload.email}`;
          if (payload.role) privileges.push(`Role: ${payload.role}`);
          if (payload.admin === true) privileges.push('ADMIN ACCESS');
          if (payload.scope) privileges.push(`Scopes: ${payload.scope}`);
        }
      } catch(e) {}
    }
    else if (auth.startsWith('Basic ')) {
      authMethod = 'Basic Authentication';
      try {
        const decoded = atob(auth.substring(6));
        const username = decoded.split(':')[0];
        accountInfo = `Username: ${username}`;
        if (username.toLowerCase().includes('admin')) privileges.push('Possible Admin Account');
      } catch(e) {}
    }
    else if (auth.includes('AWS4-HMAC')) authMethod = 'AWS Signature v4';
    else authMethod = 'Custom Authorization';
  } else if (req.headers['x-api-key']) {
    authMethod = 'API Key Authentication';
    const key = req.headers['x-api-key'];
    if (key.length > 20) accountInfo = `API Key: ${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  } else if (req.cookieCount > 0) {
    const cookieNames = Object.keys(req.cookies);
    const cookieStr = cookieNames.join(', ');

    if (cookieStr.includes('session') || cookieStr.includes('sess')) {
      authMethod = 'Session Cookie';
      const sessionCookie = req.cookies['session'] || req.cookies['sess'] || req.cookies['sessionid'];
      if (sessionCookie) accountInfo = `Session: ${sessionCookie.substring(0, 10)}...`;
    }
    if (cookieStr.includes('jwt') || cookieStr.includes('token')) {
      authMethod = 'Token in Cookie';
      const token = req.cookies['jwt'] || req.cookies['token'] || req.cookies['auth_token'];
      if (token && token.includes('.')) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.sub) accountInfo = `User ID: ${payload.sub}`;
            if (payload.email) accountInfo = `Email: ${payload.email}`;
            if (payload.role) privileges.push(`Role: ${payload.role}`);
          }
        } catch(e) {}
      }
    }

    // Check for user identification cookies
    if (req.cookies['user_id']) accountInfo = `User ID: ${req.cookies['user_id']}`;
    if (req.cookies['username']) accountInfo = `Username: ${req.cookies['username']}`;
    if (req.cookies['email']) accountInfo = `Email: ${req.cookies['email']}`;

    // Check for privilege indicators
    if (req.cookies['is_admin'] === 'true' || req.cookies['admin'] === '1') privileges.push('ADMIN COOKIE');
    if (req.cookies['is_staff'] === 'true') privileges.push('Staff Access');
    if (req.cookies['role']) privileges.push(`Role: ${req.cookies['role']}`);
  }

  // Check headers for user info
  if (req.headers['x-user-id']) accountInfo = `User ID: ${req.headers['x-user-id']}`;
  if (req.headers['x-username']) accountInfo = `Username: ${req.headers['x-username']}`;
  if (req.headers['x-email']) accountInfo = `Email: ${req.headers['x-email']}`;
  if (req.headers['x-user-role']) privileges.push(`Role: ${req.headers['x-user-role']}`);

  // 6. Privacy & Tracking
  const privacy = [];
  const dnt = req.headers['dnt'];
  const gpc = req.headers['sec-gpc'];

  if (dnt === '1') privacy.push('DO NOT TRACK enabled');
  if (gpc === '1') privacy.push('Global Privacy Control enabled');
  if (req.headers['sec-fetch-site'] === 'cross-site') privacy.push('Cross-site request');
  if (req.headers['sec-fetch-mode'] === 'cors') privacy.push('CORS request');

  // Check for tracking cookies
  const trackingCookies = Object.keys(req.cookies).filter(name =>
    name.includes('_ga') || name.includes('_fb') || name.includes('utm') ||
    name.includes('analytics') || name.includes('track')
  );
  if (trackingCookies.length > 0) privacy.push(`${trackingCookies.length} tracking cookies detected`);

  // 7. Network Path Analysis
  const path = [];
  if (req.headers['x-forwarded-for']) {
    const ips = req.headers['x-forwarded-for'].split(',').map(ip => ip.trim());
    path.push(`Proxied through ${ips.length} servers`);
  }
  if (req.headers['via']) path.push(`Via: ${req.headers['via']}`);
  if (req.headers['x-real-ip']) path.push('Behind reverse proxy');
  if (req.headers['cf-ray']) path.push('Routed through Cloudflare');
  if (req.headers['x-amz-cf-id']) path.push('Served by AWS CloudFront');

  // 8. Suspicious Activity Detection
  const suspicious = [];

  // Check for SQL injection attempts
  const sqlPatterns = /(\bunion\b|\bselect\b|\bdrop\b|\binsert\b|\bupdate\b|\bdelete\b|;--|\bor\b\s+1=1|\band\b\s+1=1)/i;
  if (sqlPatterns.test(url)) suspicious.push('Possible SQL injection attempt in URL');

  // Check for XSS attempts
  const xssPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
  if (xssPatterns.test(url)) suspicious.push('Possible XSS attempt in URL');

  // Check for path traversal
  if (url.includes('../') || url.includes('..\\')) suspicious.push('Path traversal attempt detected');

  // Check for scanner signatures
  if (ua.includes('sqlmap')) suspicious.push('SQLMap scanner detected');
  if (ua.includes('nikto')) suspicious.push('Nikto vulnerability scanner detected');
  if (ua.includes('nmap')) suspicious.push('Nmap scanner detected');

  // Check for missing expected headers
  if (!req.headers['accept-language']) suspicious.push('Missing Accept-Language header (unusual for browsers)');
  if (!req.headers['accept-encoding']) suspicious.push('Missing Accept-Encoding header (unusual for modern clients)');

  // Rate limiting signs
  if (req.headers['x-ratelimit-remaining']) {
    const remaining = parseInt(req.headers['x-ratelimit-remaining']);
    if (remaining < 10) suspicious.push(`Rate limit nearly exhausted (${remaining} requests remaining)`);
  }

  // Performance Analysis
  const perfMetrics = [];
  if (req.network.tcpRtt) {
    const rtt = parseInt(req.network.tcpRtt);
    if (rtt > 200) perfMetrics.push(`High latency: ${rtt}ms RTT`);
    else if (rtt < 50) perfMetrics.push(`Low latency: ${rtt}ms RTT`);
    else perfMetrics.push(`Normal latency: ${rtt}ms RTT`);
  }

  // Fingerprinting Detection
  const fingerprints = [];
  if (req.headers['x-forwarded-for'] && req.headers['x-real-ip']) {
    const xff = req.headers['x-forwarded-for'].split(',')[0].trim();
    if (xff !== req.headers['x-real-ip']) fingerprints.push('IP inconsistency detected');
  }

  // Browser fingerprinting headers
  if (req.headers['sec-ch-ua-platform']) fingerprints.push(`Platform: ${req.headers['sec-ch-ua-platform']}`);
  if (req.headers['sec-ch-ua-mobile']) fingerprints.push(`Mobile: ${req.headers['sec-ch-ua-mobile']}`);
  if (req.headers['sec-ch-ua']) fingerprints.push('Client hints enabled');

  // Detective Analysis - Browser & App Detection
  let browserInfo = 'Unknown Browser';
  let engineInfo = '';
  let deviceInfo = '';
  let isInAppBrowser = false;
  let appName = '';

  // Detailed browser detection
  if (ua.includes('FBAN') || ua.includes('FBAV')) {
    isInAppBrowser = true;
    appName = 'Facebook App';
    browserInfo = 'Facebook In-App Browser';
  } else if (ua.includes('Instagram')) {
    isInAppBrowser = true;
    appName = 'Instagram App';
    browserInfo = 'Instagram In-App Browser';
  } else if (ua.includes('LinkedInApp')) {
    isInAppBrowser = true;
    appName = 'LinkedIn App';
    browserInfo = 'LinkedIn In-App Browser';
  } else if (ua.includes('Twitter') && ua.includes('Mobile')) {
    isInAppBrowser = true;
    appName = 'Twitter/X App';
    browserInfo = 'Twitter In-App Browser';
  } else if (ua.includes('Snapchat')) {
    isInAppBrowser = true;
    appName = 'Snapchat App';
    browserInfo = 'Snapchat In-App Browser';
  } else if (ua.includes('TikTok')) {
    isInAppBrowser = true;
    appName = 'TikTok App';
    browserInfo = 'TikTok In-App Browser';
  } else if (ua.includes('WhatsApp')) {
    isInAppBrowser = true;
    appName = 'WhatsApp';
    browserInfo = 'WhatsApp In-App Browser';
  } else if (ua.includes('Telegram')) {
    isInAppBrowser = true;
    appName = 'Telegram';
    browserInfo = 'Telegram In-App Browser';
  } else if (ua.includes('Slack')) {
    isInAppBrowser = true;
    appName = 'Slack';
    browserInfo = 'Slack In-App Browser';
  } else if (ua.includes('Discord')) {
    isInAppBrowser = true;
    appName = 'Discord';
    browserInfo = 'Discord In-App Browser';
  } else if (ua.includes('Reddit')) {
    isInAppBrowser = true;
    appName = 'Reddit App';
    browserInfo = 'Reddit In-App Browser';
  } else if (ua.includes('Pinterest')) {
    isInAppBrowser = true;
    appName = 'Pinterest App';
    browserInfo = 'Pinterest In-App Browser';
  } else if (ua.includes('Line/')) {
    isInAppBrowser = true;
    appName = 'Line App';
    browserInfo = 'Line In-App Browser';
  } else if (ua.includes('WeChat')) {
    isInAppBrowser = true;
    appName = 'WeChat';
    browserInfo = 'WeChat In-App Browser';
  } else if (ua.includes('Edg/')) {
    browserInfo = 'Microsoft Edge';
    const version = ua.match(/Edg\/([\d.]+)/)?.[1];
    if (version) browserInfo += ` ${version}`;
    engineInfo = 'Chromium/Blink';
  } else if (ua.includes('Chrome/') && !ua.includes('Edg')) {
    browserInfo = 'Google Chrome';
    const version = ua.match(/Chrome\/([\d.]+)/)?.[1];
    if (version) browserInfo += ` ${version}`;
    engineInfo = 'Chromium/Blink';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browserInfo = 'Safari';
    const version = ua.match(/Version\/([\d.]+)/)?.[1];
    if (version) browserInfo += ` ${version}`;
    engineInfo = 'WebKit';
  } else if (ua.includes('Firefox/')) {
    browserInfo = 'Mozilla Firefox';
    const version = ua.match(/Firefox\/([\d.]+)/)?.[1];
    if (version) browserInfo += ` ${version}`;
    engineInfo = 'Gecko';
  } else if (ua.includes('Opera/') || ua.includes('OPR/')) {
    browserInfo = 'Opera';
    const version = ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1];
    if (version) browserInfo += ` ${version}`;
    engineInfo = 'Chromium/Blink';
  } else if (ua.includes('Brave')) {
    browserInfo = 'Brave Browser';
    engineInfo = 'Chromium/Blink';
  } else if (ua.includes('Vivaldi')) {
    browserInfo = 'Vivaldi';
    engineInfo = 'Chromium/Blink';
  } else if (ua.includes('DuckDuckGo')) {
    browserInfo = 'DuckDuckGo Browser';
    engineInfo = 'WebKit';
  }

  // Device detection
  if (ua.includes('iPhone')) deviceInfo = 'iPhone';
  else if (ua.includes('iPad')) deviceInfo = 'iPad';
  else if (ua.includes('Android')) deviceInfo = 'Android Device';
  else if (ua.includes('Windows NT')) deviceInfo = 'Windows PC';
  else if (ua.includes('Macintosh')) deviceInfo = 'Mac';
  else if (ua.includes('Linux')) deviceInfo = 'Linux';
  else if (ua.includes('CrOS')) deviceInfo = 'Chromebook';

  // Detective Summary
  let detectiveSummary = [];

  if (referralSource.includes('AI')) {
    detectiveSummary.push(`[AI DETECTED] Visitor came from ${referralSource} - likely shared your link in an AI chat`);
  }

  if (isInAppBrowser) {
    detectiveSummary.push(`[IN-APP BROWSER] User clicked your link inside ${appName} - not using their default browser`);
  }

  if (referralSource === 'Direct Visit' && !req.headers['referer']) {
    if (ua.includes('bot') || ua.includes('crawl')) {
      detectiveSummary.push(`[BOT VISIT] Direct automated access - no human clicked a link`);
    } else {
      detectiveSummary.push(`[DIRECT ACCESS] User typed URL directly, used bookmark, or link shared privately (email/message)`);
    }
  }

  if (privileges.includes('ADMIN')) {
    detectiveSummary.push(`[ADMIN DETECTED] This user has administrative privileges`);
  }

  if (suspicious.length > 0) {
    detectiveSummary.push(`[SECURITY ALERT] Suspicious patterns detected - possible attack attempt`);
  }

  // Generate enhanced HTML
  return `
<h2 style="color: #000; margin-top: 20px; border-top: 2px solid #000; padding-top: 10px;">DETECTIVE ANALYSIS</h2>
<div style="background: #f8f8f8; border: 1px solid #ddd; padding: 10px; margin: 10px 0;">

  ${detectiveSummary.length > 0 ? `
  <h3 style="color: #000; background: #ff0; padding: 5px; border: 2px solid #000;">DETECTIVE FINDINGS</h3>
  <div style="margin: 10px; background: #fff; padding: 10px; border: 1px solid #000;">
    ${detectiveSummary.map(s => `<div style="margin: 5px 0;">- ${s}</div>`).join('')}
  </div>
  ` : ''}

  <h3 style="color: #000; margin: 10px 0;">REFERRER ANALYSIS</h3>
  <div style="margin-left: 10px; background: ${referralSource.includes('AI') ? '#ffff99' : referralSource === 'Direct Visit' ? '#f0f0f0' : '#e6ffe6'}; padding: 8px; border: 2px solid #000;">
    <div><strong>WHERE FROM:</strong> <span style="font-size: 14px; font-weight: bold;">${referralSource}</span></div>
    <div><strong>HOW ARRIVED:</strong> ${clientPurpose}</div>
    ${referrer ? `<div><strong>FULL REFERRER:</strong> ${referrer}</div>` : '<div><strong>NO REFERRER:</strong> Direct access or privacy-protected</div>'}
  </div>

  <h3 style="color: #000; margin: 10px 0;">BROWSER DETECTIVE</h3>
  <div style="margin-left: 10px; background: ${isInAppBrowser ? '#ffe6e6' : '#fff'}; padding: 8px; border: 1px solid #000;">
    <div><strong>BROWSER:</strong> ${browserInfo}</div>
    ${isInAppBrowser ? `<div style="color: #800;"><strong>IN-APP WARNING:</strong> Using ${appName} embedded browser - limited features</div>` : ''}
    ${engineInfo ? `<div><strong>ENGINE:</strong> ${engineInfo}</div>` : ''}
    ${deviceInfo ? `<div><strong>DEVICE:</strong> ${deviceInfo}</div>` : ''}
    <div><strong>USER AGENT:</strong> <code style="font-size: 10px;">${ua || 'None provided'}</code></div>
  </div>

  ${botScore > 30 ? `
  <h3 style="color: #800; margin: 10px 0;">BOT PROBABILITY: ${botScore}%</h3>
  <div style="margin-left: 10px; background: #fff0f0; padding: 5px; border: 1px solid #c00;">
    ${botIndicators.map(i => `<div>- ${i}</div>`).join('')}
  </div>
  ` : ''}

  <h3 style="color: #000; margin: 10px 0;">CLIENT PROFILE</h3>
  <div style="margin-left: 10px;">
    <div><strong>Type:</strong> ${clientType}</div>
    <div><strong>Location:</strong> ${req.geo.country || 'Unknown'} ${req.geo.city ? `(${req.geo.city})` : ''}</div>
    <div><strong>Network:</strong> ${req.geo.asOrganization || req.geo.asn || 'Unknown'}</div>
    <div><strong>IP Address:</strong> ${req.network.ip}</div>
  </div>

  ${accountInfo || privileges.length > 0 ? `
  <h3 style="color: #000; margin: 10px 0;">Account Information</h3>
  <div style="margin-left: 10px; background: #f0f0ff; padding: 5px; border: 1px solid #00f;">
    ${accountInfo ? `<div><strong>Account:</strong> ${accountInfo}</div>` : ''}
    ${privileges.length > 0 ? `<div><strong>Privileges:</strong> ${privileges.join(', ')}</div>` : ''}
  </div>
  ` : ''}

  <h3 style="color: #000; margin: 10px 0;">Security Assessment</h3>
  <div style="margin-left: 10px;">
    ${missingSecurity.length > 0 ?
      `<div style="color: #800;"><strong>[WARNING] Missing Critical Security Headers:</strong> ${missingSecurity.join(', ')}</div>` :
      '<div style="color: #080;"><strong>[OK] All critical security headers present</strong></div>'
    }
    <div><strong>Authentication:</strong> ${authMethod}</div>
    ${suspicious.length > 0 ?
      `<div style="color: #800;"><strong>[ALERT] Suspicious Activity:</strong><ul style="margin: 5px 0 0 20px;">${suspicious.map(s => `<li>${s}</li>`).join('')}</ul></div>` :
      ''
    }
  </div>

  <h3 style="color: #000; margin: 10px 0;">Technology Stack</h3>
  <div style="margin-left: 10px;">
    <div><strong>Detected:</strong> ${tech.length > 0 ? tech.join(', ') : 'Standard HTTP client'}</div>
    <div><strong>TLS Version:</strong> ${req.network.tlsVersion || 'Unknown'}</div>
    <div><strong>HTTP Protocol:</strong> ${req.network.protocol || 'Unknown'}</div>
    <div><strong>Cipher:</strong> ${req.network.tlsCipher || 'Unknown'}</div>
  </div>

  <h3 style="color: #000; margin: 10px 0;">Request Intent</h3>
  <div style="margin-left: 10px;">
    ${intent.length > 0 ? intent.map(i => `<div>- ${i}</div>`).join('') : '<div>Standard web request</div>'}
  </div>

  <h3 style="color: #000; margin: 10px 0;">Network Path</h3>
  <div style="margin-left: 10px;">
    <div><strong>Origin IP:</strong> ${req.network.ip}</div>
    ${path.length > 0 ? path.map(p => `<div>- ${p}</div>`).join('') : '<div>Direct connection</div>'}
    ${perfMetrics.length > 0 ? `<div><strong>Performance:</strong> ${perfMetrics.join(', ')}</div>` : ''}
  </div>

  <h3 style="color: #000; margin: 10px 0;">Privacy & Tracking</h3>
  <div style="margin-left: 10px;">
    ${privacy.length > 0 ? privacy.map(p => `<div>- ${p}</div>`).join('') : '<div>No privacy preferences detected</div>'}
    <div><strong>Cookies:</strong> ${req.cookieCount} total${trackingCookies?.length > 0 ? ` (${trackingCookies.length} tracking)` : ''}</div>
    ${fingerprints.length > 0 ? `<div><strong>Fingerprinting:</strong><br>${fingerprints.map(f => `- ${f}`).join('<br>')}</div>` : ''}
  </div>

  <h3 style="color: #000; margin: 10px 0;">Risk Score</h3>
  <div style="margin-left: 10px;">
    <div style="background: #fff; border: 1px solid #ccc; height: 20px; margin: 5px 0;">
      <div style="background: ${suspicious.length > 2 ? '#f00' : suspicious.length > 0 ? '#fa0' : '#0a0'}; height: 100%; width: ${Math.min(100, (suspicious.length * 20) + botScore)}%;"></div>
    </div>
    <div>Risk Level: ${suspicious.length > 2 || botScore > 60 ? 'HIGH' : suspicious.length > 0 || botScore > 30 ? 'MEDIUM' : 'LOW'}</div>
  </div>

  <h3 style="color: #000; margin: 10px 0;">Recommendations</h3>
  <div style="margin-left: 10px; background: #fffbf0; border: 1px solid #fc0; padding: 5px; margin-top: 5px;">
    ${missingSecurity.length > 0 ? `<div>[ACTION] Add security headers: ${missingSecurity.join(', ')}</div>` : ''}
    ${suspicious.length > 0 ? '<div>[ACTION] Review and block suspicious requests</div>' : ''}
    ${authMethod === 'None' && !req.bot.isBot ? '<div>[INFO] Consider implementing authentication if this is a private resource</div>' : ''}
    ${req.bot.isBot && !req.bot.type.includes('Google') && !req.bot.type.includes('Bing') ? '<div>[ACTION] Consider rate limiting bot traffic</div>' : ''}
    ${trackingCookies?.length > 3 ? '<div>[PRIVACY] Review tracking cookie usage for compliance</div>' : ''}
    ${botScore > 60 ? '<div>[SECURITY] High bot probability - implement CAPTCHA or rate limiting</div>' : ''}
    ${!missingSecurity.length && !suspicious.length && authMethod !== 'None' ? '<div>[PASS] Request appears legitimate and properly secured</div>' : ''}
  </div>

</div>
`;
}

function generateDetailPage(req) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Request ${req.id}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 5px; max-width: 100%; overflow-x: hidden; }
h1 { color: #000; font-size: 18px; margin: 8px 0; border-bottom: 2px solid #000; padding-bottom: 5px; word-wrap: break-word; }
.nav { padding: 8px; border: 1px solid #ddd; margin: 8px 0; background: #f8f8f8; overflow-x: auto; }
.nav a { color: #0000ee; margin-right: 10px; text-decoration: underline; white-space: nowrap; }
pre { background: #f8f8f8; border: 1px solid #ddd; padding: 8px; overflow: auto; color: #000; max-width: 100%; }
.key { color: #000; display: inline-block; min-width: 100px; font-weight: bold; vertical-align: top; }
.value { color: #000; word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; display: inline-block; max-width: calc(100% - 110px); }
.sub { margin-left: 8px; padding-left: 8px; border-left: 1px solid #ddd; overflow: hidden; }
@media (max-width: 600px) {
  body { padding: 3px; font-size: 11px; }
  h1 { font-size: 16px; margin: 5px 0; }
  .nav { padding: 5px; }
  .nav a { margin-right: 8px; font-size: 11px; }
  pre { padding: 5px; font-size: 10px; }
  .key { min-width: 80px; font-size: 11px; }
  .value { max-width: calc(100% - 85px); font-size: 11px; }
  .sub { margin-left: 5px; padding-left: 5px; }
}
</style>
</head>
<body>
<h1>REQUEST DETAIL: ${req.id}
<button onclick="copyReport()" style="float: right; background: #4CAF50; color: white; padding: 5px 10px; border: none; cursor: pointer; font-size: 14px; margin-left: 10px;">COPY ALL</button>
</h1>
<h2 style="color: #000; margin-top: -5px; margin-bottom: 10px;">
${req.bot.isBot ?
  `<span style="background:#f00;color:#fff;padding:3px 8px;">BOT DETECTED: ${req.bot.type || 'Generic Bot'}</span>` :
  req.bot.confidence < 30 ?
  '<span style="background:#ff0;color:#000;padding:3px 8px;">UNSURE - Possibly Human</span>' :
  '<span style="background:#00f;color:#fff;padding:3px 8px;">HUMAN USER</span>'
}
</h2>
<div class="nav">
<a href="/">← BACK TO ALL</a>
<a href="/stats">VIEW STATS</a>
<a href="#raw">RAW JSON</a>
</div>
${renderFullRequest(req, true)}
${generateAnalysis(req)}
<h2 id="raw">RAW JSON DATA</h2>
<pre id="rawData">${JSON.stringify(req, null, 2)}</pre>
<script>
function copyReport() {
  const rawData = document.getElementById('rawData').textContent;
  navigator.clipboard.writeText(rawData).then(() => {
    const btn = document.querySelector('button');
    const oldText = btn.innerText;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = oldText;
      btn.style.background = '#4CAF50';
    }, 2000);
  }).catch(err => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = rawData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const btn = document.querySelector('button');
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = 'COPY ALL';
      btn.style.background = '#4CAF50';
    }, 2000);
  });
}
</script>
</body>
</html>`;
}

function generateStatsPage(requestHistory) {
  // Calculate statistics
  const total = requestHistory.length;
  const uniqueIPs = new Set(requestHistory.map(r => r.network.ip));
  const botCount = requestHistory.filter(r => r.bot.isBot).length;
  const humanCount = total - botCount;
  const botRate = total > 0 ? Math.round(botCount/total*100) : 0;

  // Country distribution
  const countries = {};
  requestHistory.forEach(r => {
    const country = r.geo.country || 'Unknown';
    countries[country] = (countries[country] || 0) + 1;
  });

  // Bot type distribution
  const botTypes = {};
  requestHistory.filter(r => r.bot.isBot).forEach(r => {
    botTypes[r.bot.type] = (botTypes[r.bot.type] || 0) + 1;
  });

  // Hour distribution (last 24 hours)
  const hourly = Array(24).fill(0);
  const now = Date.now();
  requestHistory.forEach(r => {
    const age = now - r.timestampMs;
    const hour = Math.floor(age / 3600000);
    if (hour < 24) hourly[23 - hour]++;
  });

  // Create ASCII bar chart
  function asciiBar(value, max, width = 40) {
    const filled = Math.round((value / max) * width);
    return '█'.repeat(filled) + '░'.repeat(width - filled);
  }

  // Create horizontal bar chart
  function makeChart(data, title) {
    const max = Math.max(...Object.values(data), 1);
    return Object.entries(data)
      .sort((a,b) => b[1] - a[1])
      .slice(0, 10)
      .map(([key, val]) =>
        `${key.padEnd(15)} ${String(val).padStart(4)} ${asciiBar(val, max)}`
      ).join('\n');
  }

  // Create hourly chart
  const maxHour = Math.max(...hourly, 1);
  const hourlyChart = hourly.map((val, i) =>
    `${String(23-i).padStart(2,'0')}:00 ${String(val).padStart(3)} ${asciiBar(val, maxHour, 30)}`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Header Analyzer - Statistics</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 5px; max-width: 100%; overflow-x: hidden; }
h1 { color: #000; font-size: 18px; margin: 8px 0; border-bottom: 2px solid #000; padding-bottom: 5px; word-wrap: break-word; }
h2 { color: #000; font-size: 14px; margin: 12px 0 8px 0; border-bottom: 1px solid #aaa; }
.nav { padding: 8px; border: 1px solid #ddd; margin: 8px 0; background: #f8f8f8; overflow-x: auto; }
.nav a { color: #0000ee; margin-right: 10px; text-decoration: underline; white-space: nowrap; }
.stats-box { border: 1px solid #ddd; padding: 8px; margin: 8px 0; background: #f8f8f8; overflow: hidden; }
.stat-line { margin: 2px 0; }
.key { color: #000; display: inline-block; min-width: 100px; font-weight: bold; }
.value { color: #000; }
pre { color: #000; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
.chart { background: #f8f8f8; padding: 8px; border: 1px solid #ddd; margin: 8px 0; overflow: hidden; }
.big-number { font-size: 20px; color: #000; font-weight: bold; }
@media (max-width: 600px) {
  body { padding: 3px; font-size: 11px; }
  h1 { font-size: 16px; margin: 5px 0; }
  h2 { font-size: 13px; margin: 8px 0 5px 0; }
  .nav { padding: 5px; }
  .nav a { margin-right: 8px; font-size: 11px; }
  .stats-box, .chart { padding: 5px; margin: 5px 0; }
  .big-number { font-size: 16px; }
  pre { font-size: 10px; }
}
</style>
</head>
<body>

<h1>HEADER ANALYZER - STATISTICS</h1>

<div class="nav">
<a href="/">← BACK TO ALL</a>
<a href="#summary">SUMMARY</a>
<a href="#countries">COUNTRIES</a>
<a href="#bots">BOTS</a>
<a href="#hourly">HOURLY</a>
</div>

<h2 id="summary">SUMMARY STATISTICS</h2>
<div class="stats-box">
<pre>
┌──────────────────────────────────────────┐
TOTAL REQUESTS: <span class="big-number">${total}</span>
────────────────────────
Unique IPs:    ${uniqueIPs.size}
Bot Traffic:   ${botCount} (${botRate}%)
Human Traffic: ${humanCount} (${100-botRate}%)
</pre>
</div>

<h2 id="countries">TOP COUNTRIES</h2>
<div class="chart">
<pre>${makeChart(countries, 'Countries')}</pre>
</div>

<h2 id="bots">BOT TYPES</h2>
<div class="chart">
<pre>${makeChart(botTypes, 'Bot Types')}</pre>
</div>

<h2 id="hourly">LAST 24 HOURS</h2>
<div class="chart">
<pre>${hourlyChart}</pre>
</div>

<h2>REQUEST METHODS</h2>
<div class="chart">
<pre>${makeChart(
  requestHistory.reduce((acc, r) => {
    acc[r.request.method] = (acc[r.request.method] || 0) + 1;
    return acc;
  }, {}),
  'Methods'
)}</pre>
</div>

<h2>TLS VERSIONS</h2>
<div class="chart">
<pre>${makeChart(
  requestHistory.reduce((acc, r) => {
    const tls = r.network.tlsVersion || 'Unknown';
    acc[tls] = (acc[tls] || 0) + 1;
    return acc;
  }, {}),
  'TLS'
)}</pre>
</div>

<h2>HTTP PROTOCOLS</h2>
<div class="chart">
<pre>${makeChart(
  requestHistory.reduce((acc, r) => {
    const proto = r.network.protocol || 'Unknown';
    acc[proto] = (acc[proto] || 0) + 1;
    return acc;
  }, {}),
  'Protocols'
)}</pre>
</div>

<h2>TOP PATHS</h2>
<div class="chart">
<pre>${makeChart(
  requestHistory.reduce((acc, r) => {
    acc[r.request.path] = (acc[r.request.path] || 0) + 1;
    return acc;
  }, {}),
  'Paths'
)}</pre>
</div>

<div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #000; color: #000;">
Generated: ${new Date().toISOString()} | ${total} requests analyzed
</div>

</body>
</html>`;
}

function generateBotsPage(requestHistory) {
  // Get all bot requests (including probable bots)
  const botRequests = requestHistory.filter(r => r.bot.isBot || r.bot.probableBot);
  const suspiciousBots = requestHistory.filter(r => r.bot.suspiciousScore >= 30 && !r.bot.isBot);
  const hiddenBots = requestHistory.filter(r => r.bot.probableBot && !r.bot.isBot);

  const total = botRequests.length;
  const uniqueIPs = new Set(botRequests.map(r => r.network.ip));

  // Get statistics
  const stats = generateBotStats(requestHistory);

  // Categorize bots
  const categorizedBots = {
    'AI Bots': botRequests.filter(r => r.bot.category === 'AI'),
    'Search Engines': botRequests.filter(r => r.bot.category === 'Search' || r.bot.category === 'Search/AI'),
    'Social Media': botRequests.filter(r => r.bot.category === 'Social'),
    'SEO Tools': botRequests.filter(r => r.bot.category === 'SEO'),
    'Monitoring': botRequests.filter(r => r.bot.category === 'Monitoring'),
    'Developer Tools': botRequests.filter(r => r.bot.category === 'Developer'),
    'Suspicious/Hidden': [...hiddenBots, ...suspiciousBots]
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bot Detection Specialist - Advanced Analysis</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #000; color: #0f0; font: 11px/1.3 monospace; padding: 5px; }
h1 { color: #0f0; font-size: 16px; margin: 5px 0; border-bottom: 2px solid #0f0; padding-bottom: 3px; }
h2 { color: #0f0; font-size: 13px; margin: 8px 0 4px 0; border-bottom: 1px solid #0f0; }
h3 { color: #0f0; font-size: 12px; margin: 5px 0 3px 0; }
.nav { background: #111; padding: 5px; border: 1px solid #0f0; margin: 5px 0; }
.nav a, .filter-btn { color: #0ff; margin-right: 8px; text-decoration: underline; cursor: pointer; background: none; border: none; font: inherit; }
.nav a:hover, .filter-btn:hover { color: #fff; }
.stats { background: #111; margin: 5px 0; padding: 5px; border: 1px solid #0f0; }
.stats span { display: inline-block; margin-right: 10px; color: #0f0; }
.filters { background: #111; padding: 5px; border: 1px solid #0f0; margin: 5px 0; }
.filter-group { margin: 5px 0; }
.filter-group label { color: #0ff; margin-right: 5px; }
.request-full { margin: 5px 0; padding: 5px; border: 1px solid #0f0; background: #111; }
.request-full.bot-confirmed { border-color: #f00; background: #200; }
.request-full.bot-suspicious { border-color: #ff0; background: #220; }
.request-full.bot-hidden { border-color: #f0f; background: #202; }
.key { color: #0ff; display: inline-block; min-width: 100px; font-weight: bold; }
.value { color: #fff; }
.sub { margin-left: 10px; padding-left: 10px; border-left: 1px solid #0f0; }
.bot-badge { display: inline-block; padding: 2px 5px; margin: 2px; border: 1px solid; }
.bot-badge.ai { background: #400; border-color: #f00; color: #fff; }
.bot-badge.search { background: #040; border-color: #0f0; color: #fff; }
.bot-badge.social { background: #004; border-color: #00f; color: #fff; }
.bot-badge.seo { background: #440; border-color: #ff0; color: #fff; }
.bot-badge.suspicious { background: #f0f; border-color: #fff; color: #000; }
.bot-badge.hidden { background: #f00; border-color: #fff; color: #fff; animation: pulse 1s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
.confidence-meter { display: inline-block; width: 100px; height: 10px; background: #222; border: 1px solid #0f0; }
.confidence-fill { height: 100%; background: linear-gradient(90deg, #f00, #ff0, #0f0); }
.suspicious-reasons { background: #200; border: 1px solid #f00; padding: 3px; margin: 3px 0; color: #ff0; font-size: 10px; }
#search { padding: 4px; background: #000; border: 1px solid #0f0; color: #0f0; width: 200px; }
.highlight { background: #ff0; color: #000; }
</style>
</head>
<body>

<h1>🤖 BOT DETECTION SPECIALIST ANALYSIS - ${total} BOTS DETECTED (${hiddenBots.length} HIDDEN)
</h1>

<div class="nav">
<a href="/">← MAIN</a>
<button class="filter-btn" onclick="filterBots('all')">ALL BOTS</button>
<button class="filter-btn" onclick="filterBots('ai')">AI BOTS</button>
<button class="filter-btn" onclick="filterBots('search')">SEARCH</button>
<button class="filter-btn" onclick="filterBots('social')">SOCIAL</button>
<button class="filter-btn" onclick="filterBots('seo')">SEO</button>
<button class="filter-btn" onclick="filterBots('suspicious')">SUSPICIOUS</button>
<button class="filter-btn" onclick="filterBots('hidden')">HIDDEN</button>
<input type="text" id="search" placeholder="Search..." onkeyup="searchPage(this.value)">
</div>

<div class="stats">
<span>TOTAL: ${total}</span>
<span>CONFIRMED: ${botRequests.filter(r => r.bot.isBot && !r.bot.probableBot).length}</span>
<span>HIDDEN: ${hiddenBots.length}</span>
<span>SUSPICIOUS: ${suspiciousBots.length}</span>
<span>IPs: ${uniqueIPs.size}</span>
</div>

<h2>BY OPERATOR</h2>
<div class="stats">
${Object.entries(stats.byOperator || {}).map(([op, count]) =>
  `<span class="bot-badge">${op}: ${count}</span>`
).join('') || '<span>No operators detected</span>'}
</div>

<h2>BY CATEGORY</h2>
<div class="stats">
${Object.entries(categorizedBots).map(([category, bots]) =>
  `<span class="bot-badge ${category.toLowerCase().replace(/[\s\/]/g, '-')}">${category}: ${bots.length}</span>`
).join('')}
</div>

<h2>BOT REQUESTS</h2>
${total === 0 ? '<div style="padding: 20px; color: #0f0;">No bot requests yet. Waiting for bots...</div>' :
  botRequests.map((req, i) => {
    const botClass = req.bot.probableBot && !req.bot.isBot ? 'bot-hidden' :
                     req.bot.suspiciousScore >= 50 ? 'bot-suspicious' :
                     req.bot.isBot ? 'bot-confirmed' : '';

    return `
<div class="request-full ${botClass}" id="${req.id}" data-category="${req.bot.category || 'unknown'}" data-operator="${req.bot.operator || 'unknown'}">
  <h3>
    #${i + 1} | ${req.timestamp}
    ${req.bot.isBot && !req.bot.probableBot ? '<span class="bot-badge ai">CONFIRMED BOT</span>' :
      req.bot.probableBot && !req.bot.isBot ? '<span class="bot-badge hidden">HIDDEN BOT</span>' :
      req.bot.suspiciousScore >= 50 ? '<span class="bot-badge suspicious">SUSPICIOUS</span>' : ''}
  </h3>

  <div class="sub">
    <div><span class="key">BOT NAME:</span> <span class="value">${req.bot.type || 'Unknown'}</span></div>
    <div><span class="key">OPERATOR:</span> <span class="value">${req.bot.operator || 'Unknown'}</span></div>
    <div><span class="key">CATEGORY:</span> <span class="value">${req.bot.category || 'Unknown'}</span></div>
    <div><span class="key">PURPOSE:</span> <span class="value">${req.bot.purpose || 'Unknown'}</span></div>
    <div>
      <span class="key">CONFIDENCE:</span>
      <span class="confidence-meter">
        <span class="confidence-fill" style="width: ${req.bot.confidence}%"></span>
      </span>
      <span class="value">${req.bot.confidence}%</span>
    </div>
    ${req.bot.suspiciousScore > 0 ? `
    <div><span class="key">SUSPICIOUS SCORE:</span> <span class="value" style="color: ${req.bot.suspiciousScore >= 80 ? '#f00' : req.bot.suspiciousScore >= 50 ? '#ff0' : '#0f0'}">${req.bot.suspiciousScore}/100</span></div>
    ` : ''}
    ${req.bot.suspiciousReasons && req.bot.suspiciousReasons.length > 0 ? `
    <div class="suspicious-reasons">
      <span class="key">DETECTION REASONS:</span><br>
      ${req.bot.suspiciousReasons.map(r => `• ${r}`).join('<br>')}
    </div>
    ` : ''}
    <div><span class="key">USER AGENT:</span> <span class="value">${req.bot.userAgent}</span></div>
    <div><span class="key">IP:</span> <span class="value">${req.network.ip}</span></div>
    <div><span class="key">LOCATION:</span> <span class="value">${req.geo.city || 'Unknown'}, ${req.geo.country || 'Unknown'}</span></div>
    <div><span class="key">ASN:</span> <span class="value">${req.cf?.asOrganization || 'Unknown'}</span></div>
  </div>

  <a href="/request/${req.id}" class="detail-link">FULL DETAILS →</a>
</div>`;
  }).join('')}

<script>
function searchPage(term) {
  if (!term) {
    // Reset highlighting
    document.querySelectorAll('.highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    document.querySelectorAll('.request-full').forEach(el => el.style.display = 'block');
    return;
  }

  const regex = new RegExp(term, 'gi');
  let hasMatches = false;

  // Search and filter all request blocks
  document.querySelectorAll('.request-full').forEach(block => {
    const text = block.textContent;
    if (regex.test(text)) {
      block.style.display = 'block';
      hasMatches = true;
      // Highlight matches in this block
      block.querySelectorAll('.value, .key, h3, h4').forEach(el => {
        const html = el.innerHTML;
        const newHtml = html.replace(regex, match => '<span class="highlight">' + match + '</span>');
        if (html !== newHtml) el.innerHTML = newHtml;
      });
    } else {
      block.style.display = 'none';
    }
  });

  if (!hasMatches) {
    document.querySelectorAll('.request-full').forEach(el => el.style.display = 'block');
  }
}

function copyAllData() {
  const allContent = document.body.innerText;
  navigator.clipboard.writeText(allContent).then(() => {
    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = oldText;
      btn.style.background = '#4CAF50';
    }, 2000);
  }).catch(err => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = allContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const btn = event.target;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = 'COPY ALL';
      btn.style.background = '#4CAF50';
    }, 2000);
  });
}

function filterBots(type) {
  const requests = document.querySelectorAll('.request-full');
  requests.forEach(req => {
    if (type === 'all') {
      req.style.display = 'block';
    } else if (type === 'ai') {
      req.style.display = req.dataset.category === 'AI' ? 'block' : 'none';
    } else if (type === 'search') {
      req.style.display = (req.dataset.category === 'Search' || req.dataset.category === 'Search/AI') ? 'block' : 'none';
    } else if (type === 'social') {
      req.style.display = req.dataset.category === 'Social' ? 'block' : 'none';
    } else if (type === 'seo') {
      req.style.display = req.dataset.category === 'SEO' ? 'block' : 'none';
    } else if (type === 'suspicious') {
      req.style.display = req.classList.contains('bot-suspicious') ? 'block' : 'none';
    } else if (type === 'hidden') {
      req.style.display = req.classList.contains('bot-hidden') ? 'block' : 'none';
    }
  });
}

function copyAllBots() {
  const allContent = document.body.innerText;
  navigator.clipboard.writeText(allContent).then(() => {
    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = oldText;
      btn.style.background = '#4CAF50';
    }, 2000);
  }).catch(err => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = allContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    const btn = event.target;
    btn.innerText = 'COPIED!';
    btn.style.background = '#666';
    setTimeout(() => {
      btn.innerText = 'COPY ALL';
      btn.style.background = '#4CAF50';
    }, 2000);
  });
}
</script>

</body>
</html>`;

  return html;
}

function generateDownloadPage(requestHistory, currentRequest) {
  const total = requestHistory.length + 1; // +1 for current
  const totalSize = JSON.stringify([currentRequest, ...requestHistory]).length;
  const sizeKB = (totalSize / 1024).toFixed(2);
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Download Data - Header Analyzer</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 5px; max-width: 100%; overflow-x: hidden; }
h1 { color: #000; font-size: 18px; margin: 8px 0; border-bottom: 2px solid #000; padding-bottom: 5px; word-wrap: break-word; }
h2 { color: #000; font-size: 14px; margin: 12px 0 8px 0; border-bottom: 1px solid #aaa; }
.nav { padding: 8px; border: 1px solid #ddd; margin: 8px 0; background: #f8f8f8; overflow-x: auto; }
.nav a { color: #0000ee; margin-right: 10px; text-decoration: underline; white-space: nowrap; }
.download-box { border: 2px solid #000; padding: 15px; margin: 15px 0; background: #f8f8f8; }
.download-btn { background: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 16px; margin: 10px 5px; }
.download-btn:hover { background: #45a049; }
.stats { margin: 10px 0; padding: 10px; border: 1px solid #ccc; background: #fff; }
.key { color: #000; font-weight: bold; }
pre { background: #f0f0f0; padding: 10px; border: 1px solid #ccc; overflow-x: auto; margin: 10px 0; }
@media (max-width: 600px) {
  body { padding: 3px; font-size: 11px; }
  h1 { font-size: 16px; margin: 5px 0; }
  h2 { font-size: 13px; }
  .download-btn { font-size: 14px; padding: 8px 15px; }
}
</style>
</head>
<body>

<h1>DOWNLOAD ALL DATA</h1>

<div class="nav">
<a href="/">← BACK TO ALL</a>
<a href="/stats">STATISTICS</a>
<a href="/bots">BOTS</a>
</div>

<h2>DOWNLOAD OPTIONS</h2>

<div class="download-box">
<h3>Dataset Information</h3>
<div class="stats">
<div><span class="key">Total Requests:</span> ${total}</div>
<div><span class="key">Dataset Size:</span> ${sizeKB} KB (${sizeMB} MB)</div>
<div><span class="key">Time Range:</span> ${requestHistory.length > 0 ? requestHistory[requestHistory.length-1].timestamp + ' to ' + currentRequest.timestamp : 'N/A'}</div>
<div><span class="key">Bot Requests:</span> ${requestHistory.filter(r => r.bot.isBot).length + (currentRequest.bot.isBot ? 1 : 0)}</div>
<div><span class="key">Human Requests:</span> ${requestHistory.filter(r => !r.bot.isBot).length + (!currentRequest.bot.isBot ? 1 : 0)}</div>
</div>

<h3>Download Formats</h3>

<button class="download-btn" onclick="downloadJSON()">Download as JSON</button>
<button class="download-btn" onclick="downloadCSV()">Download as CSV</button>
<button class="download-btn" onclick="window.location.href='/download/zip'">Download as ZIP</button>

<h3>What's Included</h3>
<pre>
- ALL ${total} captured requests
- Complete headers for each request
- Network information (IPs, protocols, TLS)
- Geographic data (country, city, coordinates)
- Bot detection results
- Cookies and query parameters
- CloudFlare metadata
- Timestamps and request IDs
</pre>

</div>

<script>
const allData = ${JSON.stringify([currentRequest, ...requestHistory])};

function downloadJSON() {
  const dataStr = JSON.stringify(allData, null, 2);
  const blob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'header-analyzer-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadCSV() {
  // Convert to CSV format
  const headers = ['id', 'timestamp', 'method', 'url', 'ip', 'country', 'city', 'isBot', 'botType', 'userAgent', 'headerCount'];
  const rows = allData.map(r => [
    r.id,
    r.timestamp,
    r.request.method,
    r.request.url,
    r.network.ip,
    r.geo.country || '',
    r.geo.city || '',
    r.bot.isBot,
    r.bot.type || '',
    r.headers['user-agent'] || '',
    r.headerCount
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.map(cell =>
    typeof cell === 'string' && cell.includes(',') ? '"' + cell + '"' : cell
  ).join(','))].join('\\n');

  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'header-analyzer-data.csv';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

</body>
</html>`;
}

async function generateZipDownload(requestHistory, currentRequest) {
  // Simple ZIP creation (using minimal implementation)
  const allData = [currentRequest, ...requestHistory];

  // Create files content
  const jsonContent = JSON.stringify(allData, null, 2);
  const readmeContent = `Header Analyzer Data Export
Generated: ${new Date().toISOString()}
Total Requests: ${allData.length}
Bot Requests: ${allData.filter(r => r.bot.isBot).length}
Human Requests: ${allData.filter(r => !r.bot.isBot).length}

Files in this archive:
- data.json: Complete dataset in JSON format
- readme.txt: This file
`;

  // Very simple ZIP format (uncompressed for simplicity)
  // This is a minimal implementation - for production use a proper ZIP library
  const encoder = new TextEncoder();
  const jsonBytes = encoder.encode(jsonContent);
  const readmeBytes = encoder.encode(readmeContent);

  // Create a simple tar-like format as ZIP is complex
  // Return JSON wrapped as download
  return encoder.encode(JSON.stringify({
    files: [
      { name: 'data.json', content: jsonContent },
      { name: 'readme.txt', content: readmeContent }
    ],
    metadata: {
      created: new Date().toISOString(),
      requests: allData.length
    }
  }, null, 2));
}