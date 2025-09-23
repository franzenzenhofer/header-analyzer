#!/usr/bin/env node

// MASSIVE BOT ATTRACTION SCRIPT
// Attracts all types of bots to the header-analyzer site

import https from 'https';
import http from 'http';
import { writeFileSync } from 'fs';

const SITE_URL = 'https://header-analyzer.franzai.com';
const PAGES = ['/', '/bots', '/stats', '/download'];

// Generate sitemap.xml
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(page => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  writeFileSync('sitemap.xml', sitemap);
  console.log('✅ Sitemap generated');
  return sitemap;
}

// Generate robots.txt
function generateRobotsTxt() {
  const robots = `# Welcome Bots! Please crawl everything!
User-agent: *
Allow: /
Crawl-delay: 0

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: claude-web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  writeFileSync('robots.txt', robots);
  console.log('✅ Robots.txt generated');
  return robots;
}

// Submit to search engines
async function submitToSearchEngines() {
  const submissions = [
    // Google
    {
      name: 'Google',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
    },
    // Bing
    {
      name: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
    },
    // Yandex
    {
      name: 'Yandex',
      url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITE_URL + '/sitemap.xml')}`
    },
    // IndexNow (Bing, Yandex, Seznam)
    {
      name: 'IndexNow',
      url: 'https://api.indexnow.org/indexnow',
      method: 'POST',
      body: JSON.stringify({
        host: 'header-analyzer.franzai.com',
        key: 'header-analyzer-key',
        keyLocation: `${SITE_URL}/indexnow-key.txt`,
        urlList: PAGES.map(p => SITE_URL + p)
      })
    }
  ];

  for (const submission of submissions) {
    await pingUrl(submission);
  }
}

// Ping a URL
async function pingUrl(config) {
  return new Promise((resolve) => {
    const url = new URL(config.url);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: config.method || 'GET',
      headers: config.headers || { 'User-Agent': 'HeaderAnalyzer-BotAttractor/1.0' }
    };

    const req = https.request(options, (res) => {
      console.log(`📡 ${config.name}: Status ${res.statusCode}`);
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', (err) => {
      console.error(`❌ ${config.name}: ${err.message}`);
      resolve();
    });

    if (config.body) {
      req.setHeader('Content-Type', 'application/json');
      req.write(config.body);
    }

    req.end();
  });
}

// Simulate bot visits
async function simulateBotVisits() {
  const bots = [
    // OpenAI Bots
    { ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot', name: 'GPTBot' },
    { ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/2.0; +https://openai.com/bot', name: 'ChatGPT-User' },
    { ua: 'OAI-SearchBot', name: 'OAI-SearchBot' },

    // Anthropic Bots
    { ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', name: 'ClaudeBot' },
    { ua: 'claude-web/1.0', name: 'Claude-Web' },
    { ua: 'anthropic-ai', name: 'Anthropic-AI' },
    { ua: 'Claude-User/1.0', name: 'Claude-User' },

    // Google Bots
    { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', name: 'Googlebot' },
    { ua: 'Google-Extended', name: 'Google-Extended' },
    { ua: 'Gemini-Ai', name: 'Gemini-AI' },
    { ua: 'Gemini-Deep-Research', name: 'Gemini-Deep-Research' },
    { ua: 'AdsBot-Google (+http://www.google.com/adsbot.html)', name: 'AdsBot-Google' },
    { ua: 'Mediapartners-Google', name: 'Mediapartners' },

    // Microsoft Bots
    { ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', name: 'BingBot' },
    { ua: 'Mozilla/5.0 (compatible; BingPreview/1.0)', name: 'BingPreview' },
    { ua: 'msnbot/2.0', name: 'MSNBot' },

    // Perplexity
    { ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai)', name: 'PerplexityBot' },
    { ua: 'Perplexity-User/1.0', name: 'Perplexity-User' },

    // Mistral
    { ua: 'MistralAI-User/1.0', name: 'MistralAI' },
    { ua: 'Le Chat/1.0', name: 'Le Chat' },

    // Social Media
    { ua: 'facebookexternalhit/1.1', name: 'Facebook' },
    { ua: 'Twitterbot/1.0', name: 'Twitter' },
    { ua: 'LinkedInBot/1.0', name: 'LinkedIn' },
    { ua: 'WhatsApp/2.0', name: 'WhatsApp' },
    { ua: 'TelegramBot', name: 'Telegram' },
    { ua: 'Slackbot-LinkExpanding 1.0', name: 'Slack' },
    { ua: 'Discordbot/2.0', name: 'Discord' },

    // SEO Tools
    { ua: 'Mozilla/5.0 (compatible; AhrefsBot/7.0)', name: 'Ahrefs' },
    { ua: 'Mozilla/5.0 (compatible; SemrushBot/7.0)', name: 'Semrush' },
    { ua: 'Mozilla/5.0 (compatible; MJ12bot/1.0)', name: 'Majestic' },
    { ua: 'Mozilla/5.0 (compatible; DotBot/1.2)', name: 'Moz' },
    { ua: 'Screaming Frog SEO Spider/18.0', name: 'ScreamingFrog' },

    // Monitoring
    { ua: 'UptimeRobot/2.0', name: 'UptimeRobot' },
    { ua: 'Pingdom.com_bot_version_1.4', name: 'Pingdom' },
    { ua: 'StatusCake', name: 'StatusCake' },
    { ua: 'Site24x7', name: 'Site24x7' },
    { ua: 'GTmetrix', name: 'GTmetrix' },

    // Developer Tools
    { ua: 'curl/8.0.1', name: 'curl' },
    { ua: 'wget/1.21.3', name: 'wget' },
    { ua: 'PostmanRuntime/7.32.3', name: 'Postman' },
    { ua: 'insomnia/2023.5.8', name: 'Insomnia' },
    { ua: 'python-requests/2.31.0', name: 'Python Requests' },
    { ua: 'Go-http-client/2.0', name: 'Go HTTP' },
    { ua: 'Java/17.0.8', name: 'Java' },
    { ua: 'Ruby', name: 'Ruby' },
    { ua: 'Node-Fetch/3.0', name: 'Node-Fetch' },
    { ua: 'axios/1.5.0', name: 'Axios' },

    // Search Engines
    { ua: 'DuckDuckBot/1.0', name: 'DuckDuckGo' },
    { ua: 'YandexBot/3.0', name: 'Yandex' },
    { ua: 'Baiduspider/2.0', name: 'Baidu' },
    { ua: 'Qwantify/1.0', name: 'Qwant' },
    { ua: 'SeznamBot/3.2', name: 'Seznam' },
    { ua: 'ia_archiver', name: 'Internet Archive' },

    // AI Scrapers
    { ua: 'CCBot/2.0', name: 'Common Crawl' },
    { ua: 'Amazonbot/0.1', name: 'Amazon' },
    { ua: 'AppleBot/0.1', name: 'Apple' },
    { ua: 'Bytespider', name: 'ByteDance' },
    { ua: 'YouBot/1.0', name: 'You.com' },
    { ua: 'DuckAssistBot/1.0', name: 'DuckAssist' },

    // Hidden Bot Patterns (suspicious)
    { ua: 'Mozilla/5.0', name: 'Generic Mozilla' },
    { ua: '', name: 'Empty User Agent' },
    { ua: 'Python/3.11', name: 'Python Script' },
    { ua: 'Java/11', name: 'Java App' },
    { ua: 'Go-http-client', name: 'Go Client' }
  ];

  console.log('\n🤖 Starting massive bot simulation...\n');

  for (const bot of bots) {
    console.log(`🔄 Simulating ${bot.name}...`);
    for (const page of PAGES) {
      await visitPage(SITE_URL + page, bot.ua);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    }
  }
}

// Visit a page with specific user agent
async function visitPage(pageUrl, userAgent) {
  return new Promise((resolve) => {
    const url = new URL(pageUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`  ✅ ${url.pathname}: ${res.statusCode}`);
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', (err) => {
      console.error(`  ❌ Error: ${err.message}`);
      resolve();
    });

    req.end();
  });
}

// Create bot-attracting content
async function createBotAttractingContent() {
  console.log('\n📝 Creating bot-attracting content...\n');

  // Keywords that attract bots
  const attractiveContent = `
AI Bot Detection Test Page
OpenAI GPTBot Test
Anthropic Claude Test
Google Gemini Test
Perplexity AI Test
ChatGPT Web Crawler Test
Bot Detection Analysis
User Agent Testing
Web Scraping Detection
Hidden Bot Identification
Behavioral Bot Analysis
AI Crawler Detection
Search Engine Bot Test
Social Media Bot Test
SEO Bot Analysis
Monitoring Bot Detection
Developer Tool Detection
Automation Detection
Headless Browser Detection
Proxy Detection
VPN Detection
Data Center IP Detection
Bot Score Analysis
Suspicious Pattern Detection
Machine Learning Bot Detection
AI Training Data Collection
Web Intelligence Gathering
Crawler Behavior Analysis
Spider Detection System
Robot Identification Platform
  `;

  console.log('Content keywords generated to attract bots');
  return attractiveContent;
}

// Main execution
async function main() {
  console.log('🚀 MASSIVE BOT ATTRACTION CAMPAIGN STARTING\n');
  console.log('Target: ' + SITE_URL);
  console.log('=' .repeat(50) + '\n');

  // Step 1: Generate files
  generateSitemap();
  generateRobotsTxt();

  // Step 2: Submit to search engines
  console.log('\n📡 Submitting to search engines...\n');
  await submitToSearchEngines();

  // Step 3: Create attracting content
  await createBotAttractingContent();

  // Step 4: Simulate bot visits
  await simulateBotVisits();

  console.log('\n' + '='.repeat(50));
  console.log('✨ BOT ATTRACTION CAMPAIGN COMPLETE!');
  console.log('🎯 Check ' + SITE_URL + '/bots for results');
  console.log('📊 Monitor bot activity in real-time');
  console.log('🔍 Look for hidden bots with suspicious scores');
}

// Run the campaign
main().catch(console.error);