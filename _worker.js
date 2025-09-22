// Full static HTML with EVERYTHING visible - NO TRUNCATION
const requestHistory = [];
const MAX_HISTORY = 50;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Capture ALL data
    const captureData = () => {
      const headers = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const cf = request.cf || {};
      const userAgent = headers['user-agent'] || '';
      const isBot = /bot|crawler|spider|scraper|curl|wget|postman|anthropic|claude|gpt/i.test(userAgent);

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
          isBot: isBot,
          userAgent: userAgent,
          type: isBot ? userAgent.match(/googlebot|bingbot|facebookexternalhit|twitterbot|slackbot|linkedinbot|anthropic|claude|gpt|openai/i)?.[0] || 'Generic Bot' : 'Human'
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
      return new Response(generateStatsPage(), {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // Check if viewing bots-only page
    if (url.pathname === '/bots') {
      return new Response(generateBotsPage(), {
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
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 10px; }
h1 { color: #000; font-size: 20px; margin: 10px 0; border-bottom: 2px solid #000; padding-bottom: 5px; }
h2 { color: #000; font-size: 16px; margin: 15px 0 8px 0; border-bottom: 1px solid #aaa; padding-bottom: 3px; }
h3 { color: #333; font-size: 14px; margin: 10px 0 5px 0; }
h4 { color: #000; font-size: 12px; margin: 8px 0 4px 0; font-weight: bold; }
.nav { background: #f8f8f8; padding: 10px; border: 1px solid #ddd; margin: 10px 0; }
.nav a { color: #0000ee; margin-right: 15px; text-decoration: underline; }
.stats { background: #f0f0f0; margin: 10px 0; padding: 10px; border: 1px solid #ccc; }
.stats span { display: inline-block; margin-right: 15px; }
.request-full { margin: 10px 0; padding: 10px; border: 1px solid #ddd; background: #fafafa; }
.request-full.current { border-color: #000; background: #f0f0f0; }
.request-full.bot { border-color: #800; background: #fff0f0; }
.key { color: #666; display: inline-block; min-width: 150px; font-weight: bold; }
.value { color: #000; word-wrap: break-word; word-break: break-all; }
.sub { margin-left: 10px; padding-left: 10px; border-left: 1px solid #ddd; }
.header-item, .cookie-item, .query-item { margin: 2px 0; font-size: 12px; }
.detail-link { color: #0000ee; text-decoration: underline; float: right; }
.detail-link:hover { color: #551a8b; text-decoration: underline; }
#search { padding: 5px; background: #fff; border: 1px solid #999; color: #000; width: 300px; }
.highlight { background: #ff0; }
</style>
</head>
<body>

<h1>HEADER ANALYZER - ALL DATA - NO TRUNCATION - ${requestHistory.length} REQUESTS</h1>

<div class="nav">
<a href="#current">CURRENT</a>
<a href="#stats">STATS</a>
<a href="#history">HISTORY</a>
<a href="/bots" style="color: #800; font-weight: bold;">BOTS ONLY</a>
<a href="/stats">FULL STATISTICS</a>
<input type="text" id="search" placeholder="Search in page (Ctrl+F)..." onkeyup="searchPage(this.value)">
</div>

<h2 id="current">YOUR CURRENT REQUEST #${currentRequest.id.substring(0,8)}</h2>
${renderFullRequest(currentRequest, true)}

<h2 id="stats">STATISTICS</h2>
<div class="stats">
<span>TOTAL: ${requestHistory.length}</span>
<span>UNIQUE IPs: ${uniqueIPs.size}</span>
<span>BOTS: ${botCount}</span>
<span>HUMANS: ${requestHistory.length - botCount}</span>
<span>BOT RATE: ${requestHistory.length > 0 ? Math.round(botCount/requestHistory.length*100) : 0}%</span>
</div>

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
  if (!term) return;
  const regex = new RegExp(term, 'gi');
  document.querySelectorAll('.value').forEach(el => {
    el.innerHTML = el.textContent.replace(regex, match => '<span class="highlight">' + match + '</span>');
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
            <pre style="display: inline-block; margin: 0; color: #fff;">${displayVal}</pre>
          </div>`;
        }
        return `<div class="header-item"><span class="key">${k}:</span> <span class="value">${displayVal}</span></div>`;
      }).join('')}
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
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 10px; }
h1 { color: #000; font-size: 20px; margin: 10px 0; border-bottom: 2px solid #000; padding-bottom: 5px; }
.nav { padding: 10px; border: 1px solid #ddd; margin: 10px 0; background: #f8f8f8; }
.nav a { color: #0000ee; margin-right: 15px; text-decoration: underline; }
pre { background: #f8f8f8; border: 1px solid #ddd; padding: 10px; overflow: auto; color: #000; }
</style>
</head>
<body>
<h1>REQUEST DETAIL: ${req.id}</h1>
<div class="nav">
<a href="/">← BACK TO ALL</a>
<a href="/stats">VIEW STATS</a>
<a href="#raw">RAW JSON</a>
</div>
${renderFullRequest(req, true)}
<h2 id="raw">RAW JSON DATA</h2>
<pre>${JSON.stringify(req, null, 2)}</pre>
</body>
</html>`;
}

function generateStatsPage() {
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
body { background: #fff; color: #000; font: 12px/1.4 monospace; padding: 10px; }
h1 { color: #000; font-size: 20px; margin: 10px 0; border-bottom: 2px solid #000; padding-bottom: 5px; }
h2 { color: #000; font-size: 16px; margin: 15px 0 10px 0; border-bottom: 1px solid #aaa; }
.nav { padding: 10px; border: 1px solid #ddd; margin: 10px 0; background: #f8f8f8; }
.nav a { color: #0000ee; margin-right: 15px; text-decoration: underline; }
.stats-box { border: 1px solid #ddd; padding: 10px; margin: 10px 0; background: #f8f8f8; }
.stat-line { margin: 2px 0; }
.key { color: #0ff; display: inline-block; width: 150px; }
.value { color: #fff; }
pre { color: #000; }
.chart { background: #f8f8f8; padding: 10px; border: 1px solid #ddd; margin: 10px 0; }
.big-number { font-size: 24px; color: #000; font-weight: bold; }
</style>
</head>
<body>

<h1>HEADER ANALYZER - STATISTICS</h1>

<div class="nav">
<a href="/">← BACK TO REQUESTS</a>
<a href="#summary">SUMMARY</a>
<a href="#countries">COUNTRIES</a>
<a href="#bots">BOTS</a>
<a href="#hourly">HOURLY</a>
</div>

<h2 id="summary">SUMMARY STATISTICS</h2>
<div class="stats-box">
<pre>
┌──────────────────────────────────────────┐
│          TOTAL REQUESTS: <span class="big-number">${String(total).padStart(4)}</span>           │
├──────────────────────────────────────────┤
│  Unique IPs: ${String(uniqueIPs.size).padStart(4)}                        │
│  Bot Traffic: ${String(botCount).padStart(4)} (${String(botRate).padStart(3)}%)                 │
│  Human Traffic: ${String(humanCount).padStart(4)} (${String(100-botRate).padStart(3)}%)              │
└──────────────────────────────────────────┘
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

<div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #333; color: #666;">
Generated: ${new Date().toISOString()} | ${total} requests analyzed
</div>

</body>
</html>`;
}

function generateBotsPage() {
  // Filter only bot requests
  const botRequests = requestHistory.filter(r => r.bot.isBot);
  const total = botRequests.length;
  const uniqueIPs = new Set(botRequests.map(r => r.network.ip));

  // Bot type distribution
  const botTypes = {};
  botRequests.forEach(r => {
    botTypes[r.bot.type] = (botTypes[r.bot.type] || 0) + 1;
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Header Analyzer - BOTS ONLY</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #000; color: #0f0; font: 10px/1.3 monospace; padding: 5px; }
h1 { color: #800; font-size: 20px; margin: 10px 0; border-bottom: 2px solid #800; padding-bottom: 5px; }
h2 { color: #0ff; font-size: 12px; margin: 8px 0 4px 0; border-bottom: 1px solid #0ff; }
h3 { color: #f0f; font-size: 11px; margin: 6px 0 3px 0; }
h4 { color: #ff0; font-size: 10px; margin: 4px 0 2px 0; }
.nav { background: #fff0f0; padding: 10px; border: 1px solid #800; margin: 10px 0; }
.nav a { color: #0ff; margin-right: 10px; }
.stats { color: #ff0; margin: 5px 0; padding: 5px; border: 1px solid #ff0; }
.stats span { display: inline-block; margin-right: 15px; }
.request-full { margin: 10px 0; padding: 10px; border: 2px solid #800; background: #fff0f0; }
.request-full.current { border-color: #0f0; background: #001100; }
.key { color: #0ff; display: inline-block; min-width: 120px; }
.value { color: #fff; word-wrap: break-word; word-break: break-all; }
.sub { margin-left: 10px; padding-left: 10px; border-left: 1px solid #333; }
.header-item, .cookie-item, .query-item { margin: 1px 0; font-size: 9px; }
.detail-link { color: #f0f; text-decoration: none; float: right; }
.detail-link:hover { color: #fff; text-decoration: underline; }
#search { padding: 3px; background: #111; border: 1px solid #f00; color: #0f0; width: 300px; }
.highlight { background: #330; }
.bot-type { display: inline-block; padding: 2px 5px; margin: 2px; background: #fdd; border: 1px solid #800; color: #800; }
</style>
</head>
<body>

<h1>BOT TRAFFIC ONLY - ${total} BOT REQUESTS</h1>

<div class="nav">
<a href="/">← BACK TO ALL</a>
<a href="#stats">BOT STATS</a>
<a href="#bots">BOT REQUESTS</a>
<a href="/stats">📊 FULL STATISTICS</a>
<input type="text" id="search" placeholder="Search in bots..." onkeyup="searchPage(this.value)">
</div>

<h2 id="stats">▼ BOT STATISTICS</h2>
<div class="stats">
<span>TOTAL BOTS: ${total}</span>
<span>UNIQUE BOT IPs: ${uniqueIPs.size}</span>
${Object.entries(botTypes).map(([type, count]) =>
  `<span class="bot-type">${type}: ${count}</span>`
).join('')}
</div>

<h2 id="bots">ALL BOT REQUESTS (${total} BOTS)</h2>
${total === 0 ? '<div style="padding: 20px; color: #666;">No bot requests yet</div>' :
  botRequests.map((req, i) => `
<div class="request-full" id="${req.id}">
  <h3>
    #${i + 1} | ${req.timestamp} | BOT: ${req.bot.type} | ${req.network.ip}
    <a href="/request/${req.id}" class="detail-link">VIEW DETAIL</a>
  </h3>
  ${renderFullRequest(req, false)}
</div>
`).join('')}

<script>
function searchPage(term) {
  if (!term) return;
  const regex = new RegExp(term, 'gi');
  document.querySelectorAll('.value').forEach(el => {
    el.innerHTML = el.textContent.replace(regex, match => '<span class="highlight">' + match + '</span>');
  });
}
</script>

</body>
</html>`;

  return html;
}