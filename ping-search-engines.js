#!/usr/bin/env node

import https from 'https';

const SITE_URL = 'https://header-analyzer.franzai.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Search engine ping endpoints
const PING_ENDPOINTS = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SitemapPinger/1.0)'
    }
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SitemapPinger/1.0)'
    }
  },
  {
    name: 'Google Indexing API',
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    method: 'POST',
    body: JSON.stringify({
      url: SITE_URL,
      type: 'URL_UPDATED'
    }),
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Header-Analyzer-Bot/1.0'
    }
  }
];

// Pages to ensure are indexed
const PAGES = [
  '/',
  '/bots',
  '/stats',
  '/download'
];

async function pingSearchEngine(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint.url);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: endpoint.method || 'GET',
      headers: endpoint.headers || {}
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ ${endpoint.name}: Status ${res.statusCode}`);
        resolve({ name: endpoint.name, status: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.error(`❌ ${endpoint.name}: ${error.message}`);
      resolve({ name: endpoint.name, error: error.message });
    });

    if (endpoint.body) {
      req.write(endpoint.body);
    }

    req.end();
  });
}

async function crawlWithUserAgent(userAgent, botName) {
  const pages = PAGES.map(page => `${SITE_URL}${page}`);

  console.log(`\n🤖 Crawling as ${botName}...`);

  for (const pageUrl of pages) {
    try {
      const url = new URL(pageUrl);
      const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'GET',
        headers: {
          'User-Agent': userAgent
        }
      };

      await new Promise((resolve) => {
        const req = https.request(options, (res) => {
          console.log(`  ✅ ${url.pathname}: Status ${res.statusCode}`);
          res.on('data', () => {}); // Consume data
          res.on('end', resolve);
        });
        req.on('error', (err) => {
          console.error(`  ❌ ${url.pathname}: ${err.message}`);
          resolve();
        });
        req.end();
      });

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ❌ Error crawling ${pageUrl}: ${error.message}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting search engine notification...\n');

  // First, ping search engines
  console.log('📡 Pinging search engines...');
  for (const endpoint of PING_ENDPOINTS) {
    await pingSearchEngine(endpoint);
  }

  // Simulate different bot crawls
  const botUserAgents = [
    { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', name: 'Googlebot' },
    { ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', name: 'BingBot' },
    { ua: 'GPTBot/1.2', name: 'OpenAI GPTBot' },
    { ua: 'Claude-Web/1.0', name: 'Claude Web Crawler' },
    { ua: 'PerplexityBot/1.0', name: 'Perplexity Bot' },
    { ua: 'Google-Extended', name: 'Google Gemini' }
  ];

  console.log('\n🔍 Simulating bot crawls...');
  for (const bot of botUserAgents) {
    await crawlWithUserAgent(bot.ua, bot.name);
  }

  console.log('\n✨ Search engine notification complete!');
  console.log('📊 Visit https://header-analyzer.franzai.com/bots to see bot activity');
}

main().catch(console.error);