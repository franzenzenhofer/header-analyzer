// Comprehensive Bot Detection System
// Bot Detection Specialist Tool

export const BOT_DATABASE = {
  // AI COMPANIES
  'OpenAI': {
    operator: 'OpenAI',
    category: 'AI',
    patterns: [
      { regex: /GPTBot\/\d+\.\d+/i, name: 'GPTBot', purpose: 'Training', version: true },
      { regex: /ChatGPT-User\/\d+\.\d+/i, name: 'ChatGPT-User', purpose: 'User Browse', version: true },
      { regex: /OAI-SearchBot/i, name: 'OAI-SearchBot', purpose: 'Search Index' },
      { regex: /openai/i, name: 'OpenAI Generic', purpose: 'General' }
    ]
  },
  'Anthropic': {
    operator: 'Anthropic',
    category: 'AI',
    patterns: [
      { regex: /ClaudeBot\/\d+\.\d+/i, name: 'ClaudeBot', purpose: 'Citations', version: true },
      { regex: /claude-web\/\d+\.\d+/i, name: 'Claude-Web', purpose: 'Web Crawl', version: true },
      { regex: /Claude-User/i, name: 'Claude-User', purpose: 'User Browse' },
      { regex: /anthropic-ai/i, name: 'Anthropic-AI', purpose: 'Training' },
      { regex: /anthropic|claude/i, name: 'Anthropic Generic', purpose: 'General' }
    ]
  },
  'Google': {
    operator: 'Google',
    category: 'Search/AI',
    patterns: [
      { regex: /Googlebot\/\d+\.\d+/i, name: 'Googlebot', purpose: 'Search Index', version: true },
      { regex: /Googlebot-Image/i, name: 'Googlebot-Image', purpose: 'Image Index' },
      { regex: /Googlebot-Video/i, name: 'Googlebot-Video', purpose: 'Video Index' },
      { regex: /Googlebot-News/i, name: 'Googlebot-News', purpose: 'News Index' },
      { regex: /Google-Extended/i, name: 'Google-Extended', purpose: 'Gemini AI' },
      { regex: /Gemini-Ai/i, name: 'Gemini-AI', purpose: 'AI Training' },
      { regex: /Gemini-Deep-Research/i, name: 'Gemini-Deep-Research', purpose: 'Deep Analysis' },
      { regex: /AdsBot-Google/i, name: 'AdsBot-Google', purpose: 'Ad Quality' },
      { regex: /Mediapartners-Google/i, name: 'Mediapartners', purpose: 'AdSense' },
      { regex: /APIs-Google/i, name: 'APIs-Google', purpose: 'API Services' },
      { regex: /Chrome-Lighthouse/i, name: 'Chrome-Lighthouse', purpose: 'Performance' },
      { regex: /PageSpeed/i, name: 'PageSpeed', purpose: 'Performance' }
    ]
  },
  'Microsoft': {
    operator: 'Microsoft',
    category: 'Search/AI',
    patterns: [
      { regex: /bingbot\/\d+\.\d+/i, name: 'BingBot', purpose: 'Search Index', version: true },
      { regex: /BingPreview/i, name: 'BingPreview', purpose: 'Link Preview' },
      { regex: /msnbot/i, name: 'MSNBot', purpose: 'MSN Index' },
      { regex: /AdIdxBot/i, name: 'AdIdxBot', purpose: 'Ads Index' },
      { regex: /Copilot/i, name: 'Copilot', purpose: 'AI Assistant' }
    ]
  },
  'Perplexity': {
    operator: 'Perplexity',
    category: 'AI',
    patterns: [
      { regex: /PerplexityBot\/\d+\.\d+/i, name: 'PerplexityBot', purpose: 'Index Build', version: true },
      { regex: /Perplexity-User\/\d+\.\d+/i, name: 'Perplexity-User', purpose: 'User Click', version: true }
    ]
  },
  'Mistral': {
    operator: 'Mistral',
    category: 'AI',
    patterns: [
      { regex: /MistralAI-User\/\d+\.\d+/i, name: 'MistralAI-User', purpose: 'Le Chat', version: true },
      { regex: /Le\s?Chat/i, name: 'Le Chat', purpose: 'Chat Bot' }
    ]
  },
  'Meta': {
    operator: 'Meta',
    category: 'Social',
    patterns: [
      { regex: /facebookexternalhit/i, name: 'FacebookExternalHit', purpose: 'Link Preview' },
      { regex: /facebookcatalog/i, name: 'FacebookCatalog', purpose: 'Product Catalog' },
      { regex: /WhatsApp/i, name: 'WhatsApp', purpose: 'Link Preview' },
      { regex: /Instagram/i, name: 'Instagram', purpose: 'Link Preview' }
    ]
  },
  'Social Media': {
    operator: 'Various',
    category: 'Social',
    patterns: [
      { regex: /Twitterbot/i, name: 'TwitterBot', purpose: 'Link Preview' },
      { regex: /LinkedInBot/i, name: 'LinkedInBot', purpose: 'Link Preview' },
      { regex: /Slackbot/i, name: 'SlackBot', purpose: 'Link Preview' },
      { regex: /TelegramBot/i, name: 'TelegramBot', purpose: 'Link Preview' },
      { regex: /DiscordBot/i, name: 'DiscordBot', purpose: 'Link Preview' },
      { regex: /Pinterest/i, name: 'Pinterest', purpose: 'Pin Preview' },
      { regex: /redditbot/i, name: 'RedditBot', purpose: 'Link Preview' }
    ]
  },
  'SEO Tools': {
    operator: 'Various',
    category: 'SEO',
    patterns: [
      { regex: /AhrefsBot/i, name: 'AhrefsBot', purpose: 'SEO Analysis' },
      { regex: /SemrushBot/i, name: 'SemrushBot', purpose: 'SEO Analysis' },
      { regex: /MJ12bot/i, name: 'Majestic', purpose: 'SEO Analysis' },
      { regex: /DotBot/i, name: 'Moz DotBot', purpose: 'SEO Analysis' },
      { regex: /ScreamingFrog/i, name: 'ScreamingFrog', purpose: 'SEO Crawl' },
      { regex: /DataForSeo/i, name: 'DataForSEO', purpose: 'SEO Data' },
      { regex: /serpstatbot/i, name: 'Serpstat', purpose: 'SEO Analysis' }
    ]
  },
  'Monitoring': {
    operator: 'Various',
    category: 'Monitoring',
    patterns: [
      { regex: /UptimeRobot/i, name: 'UptimeRobot', purpose: 'Uptime Check' },
      { regex: /Pingdom/i, name: 'Pingdom', purpose: 'Performance' },
      { regex: /StatusCake/i, name: 'StatusCake', purpose: 'Monitoring' },
      { regex: /Site24x7/i, name: 'Site24x7', purpose: 'Monitoring' },
      { regex: /GTmetrix/i, name: 'GTmetrix', purpose: 'Performance' },
      { regex: /WebPageTest/i, name: 'WebPageTest', purpose: 'Performance' }
    ]
  },
  'Developer Tools': {
    operator: 'Various',
    category: 'Developer',
    patterns: [
      { regex: /curl\/\d+/i, name: 'curl', purpose: 'HTTP Client', version: true },
      { regex: /wget\/\d+/i, name: 'wget', purpose: 'HTTP Client', version: true },
      { regex: /HTTPie/i, name: 'HTTPie', purpose: 'HTTP Client' },
      { regex: /Postman/i, name: 'Postman', purpose: 'API Testing' },
      { regex: /Insomnia/i, name: 'Insomnia', purpose: 'API Testing' },
      { regex: /Thunder Client/i, name: 'Thunder Client', purpose: 'API Testing' },
      { regex: /python-requests/i, name: 'Python Requests', purpose: 'Python HTTP' },
      { regex: /python-urllib/i, name: 'Python urllib', purpose: 'Python HTTP' },
      { regex: /Go-http-client/i, name: 'Go HTTP', purpose: 'Go HTTP' },
      { regex: /Java\/\d+/i, name: 'Java', purpose: 'Java HTTP', version: true },
      { regex: /Ruby/i, name: 'Ruby', purpose: 'Ruby HTTP' },
      { regex: /PHP\/\d+/i, name: 'PHP', purpose: 'PHP HTTP', version: true },
      { regex: /Node-Fetch/i, name: 'Node-Fetch', purpose: 'Node.js HTTP' },
      { regex: /axios/i, name: 'Axios', purpose: 'JS HTTP' }
    ]
  },
  'Search Engines': {
    operator: 'Various',
    category: 'Search',
    patterns: [
      { regex: /DuckDuckBot/i, name: 'DuckDuckBot', purpose: 'Search Index' },
      { regex: /YandexBot/i, name: 'YandexBot', purpose: 'Search Index' },
      { regex: /Baiduspider/i, name: 'BaiduSpider', purpose: 'Search Index' },
      { regex: /Qwantify/i, name: 'Qwant', purpose: 'Search Index' },
      { regex: /SeznamBot/i, name: 'SeznamBot', purpose: 'Search Index' },
      { regex: /archive\.org_bot/i, name: 'Internet Archive', purpose: 'Archiving' },
      { regex: /ia_archiver/i, name: 'Alexa', purpose: 'Web Analytics' }
    ]
  },
  'AI Scrapers': {
    operator: 'Various',
    category: 'AI',
    patterns: [
      { regex: /CCBot/i, name: 'CCBot', purpose: 'Common Crawl' },
      { regex: /Amazonbot/i, name: 'AmazonBot', purpose: 'Alexa AI' },
      { regex: /Applebot/i, name: 'AppleBot', purpose: 'Siri/Search' },
      { regex: /Bytespider/i, name: 'ByteSpider', purpose: 'ByteDance AI' },
      { regex: /YouBot/i, name: 'YouBot', purpose: 'You.com AI' },
      { regex: /DuckAssistBot/i, name: 'DuckAssistBot', purpose: 'DuckDuckGo AI' }
    ]
  }
};

// BEHAVIORAL BOT DETECTION PATTERNS
export const SUSPICIOUS_PATTERNS = {
  // Request patterns
  noAcceptLanguage: { score: 20, reason: 'Missing Accept-Language header' },
  noAcceptEncoding: { score: 15, reason: 'Missing Accept-Encoding header' },
  noCookies: { score: 10, reason: 'No cookies sent' },
  noReferer: { score: 5, reason: 'Direct access without referer' },
  unusualAccept: { score: 25, reason: 'Unusual Accept header' },

  // User agent patterns
  emptyUserAgent: { score: 50, reason: 'Empty user agent' },
  shortUserAgent: { score: 30, reason: 'Suspiciously short user agent' },
  genericUserAgent: { score: 35, reason: 'Generic user agent' },
  oldBrowser: { score: 25, reason: 'Very old browser version' },

  // Network patterns
  dataCenter: { score: 40, reason: 'Request from data center IP' },
  proxy: { score: 30, reason: 'Proxy detected' },
  vpn: { score: 20, reason: 'VPN detected' },
  tor: { score: 45, reason: 'Tor network detected' },

  // Behavioral patterns
  rapidRequests: { score: 35, reason: 'Rapid sequential requests' },
  identicalHeaders: { score: 25, reason: 'Identical headers across requests' },
  noJavaScript: { score: 15, reason: 'JavaScript not executed' },
  perfectTiming: { score: 30, reason: 'Perfect timing intervals' },

  // Technical indicators
  headlessChrome: { score: 40, reason: 'Headless Chrome detected' },
  automationTools: { score: 45, reason: 'Automation tool detected' },
  missingHeaders: { score: 20, reason: 'Missing standard browser headers' },
  headerOrder: { score: 25, reason: 'Non-standard header order' }
};

// DATA CENTER IP RANGES (simplified)
export const DATACENTER_RANGES = [
  { range: '104.16.0.0/12', provider: 'Cloudflare' },
  { range: '172.64.0.0/13', provider: 'Cloudflare' },
  { range: '52.0.0.0/8', provider: 'AWS' },
  { range: '54.0.0.0/8', provider: 'AWS' },
  { range: '13.0.0.0/8', provider: 'Azure' },
  { range: '40.0.0.0/8', provider: 'Azure' },
  { range: '35.0.0.0/8', provider: 'Google Cloud' },
  { range: '34.0.0.0/8', provider: 'Google Cloud' },
  { range: '104.196.0.0/14', provider: 'Google Cloud' },
  { range: '159.65.0.0/16', provider: 'DigitalOcean' },
  { range: '167.172.0.0/16', provider: 'DigitalOcean' },
  { range: '192.241.128.0/17', provider: 'DigitalOcean' },
  { range: '172.104.0.0/15', provider: 'Linode' },
  { range: '139.162.0.0/16', provider: 'Linode' },
  { range: '185.0.0.0/8', provider: 'Various EU Hosting' },
  { range: '195.0.0.0/8', provider: 'Various EU Hosting' },
  { range: '91.0.0.0/8', provider: 'Various EU Hosting' }
];

// Advanced bot detection function
export function detectBot(request, headers, cf) {
  const userAgent = headers['user-agent'] || '';
  const results = {
    isBot: false,
    confidence: 0,
    operator: null,
    category: null,
    botName: null,
    purpose: null,
    suspiciousScore: 0,
    suspiciousReasons: [],
    probableBot: false,
    detectionMethod: []
  };

  // 1. Check known bot patterns
  for (const [operatorName, operatorData] of Object.entries(BOT_DATABASE)) {
    for (const pattern of operatorData.patterns) {
      if (pattern.regex.test(userAgent)) {
        results.isBot = true;
        results.confidence = 100;
        results.operator = operatorName;
        results.category = operatorData.category;
        results.botName = pattern.name;
        results.purpose = pattern.purpose;
        results.detectionMethod.push('Known Bot Pattern');

        // Extract version if applicable
        if (pattern.version) {
          const versionMatch = userAgent.match(/\d+\.\d+/);
          if (versionMatch) {
            results.version = versionMatch[0];
          }
        }
        return results;
      }
    }
  }

  // 2. Behavioral analysis for hidden bots
  let suspiciousScore = 0;
  const reasons = [];

  // Check headers
  if (!headers['accept-language']) {
    suspiciousScore += SUSPICIOUS_PATTERNS.noAcceptLanguage.score;
    reasons.push(SUSPICIOUS_PATTERNS.noAcceptLanguage.reason);
  }

  if (!headers['accept-encoding']) {
    suspiciousScore += SUSPICIOUS_PATTERNS.noAcceptEncoding.score;
    reasons.push(SUSPICIOUS_PATTERNS.noAcceptEncoding.reason);
  }

  if (!headers['cookie']) {
    suspiciousScore += SUSPICIOUS_PATTERNS.noCookies.score;
    reasons.push(SUSPICIOUS_PATTERNS.noCookies.reason);
  }

  if (!headers['referer'] && !headers['sec-fetch-site']) {
    suspiciousScore += SUSPICIOUS_PATTERNS.noReferer.score;
    reasons.push(SUSPICIOUS_PATTERNS.noReferer.reason);
  }

  // Check user agent
  if (!userAgent) {
    suspiciousScore += SUSPICIOUS_PATTERNS.emptyUserAgent.score;
    reasons.push(SUSPICIOUS_PATTERNS.emptyUserAgent.reason);
  } else if (userAgent.length < 20) {
    suspiciousScore += SUSPICIOUS_PATTERNS.shortUserAgent.score;
    reasons.push(SUSPICIOUS_PATTERNS.shortUserAgent.reason);
  }

  // Check for generic patterns
  if (/^(Mozilla|Opera|Safari)$/i.test(userAgent)) {
    suspiciousScore += SUSPICIOUS_PATTERNS.genericUserAgent.score;
    reasons.push(SUSPICIOUS_PATTERNS.genericUserAgent.reason);
  }

  // Check for headless browsers
  if (/HeadlessChrome|PhantomJS|Puppeteer|Playwright/i.test(userAgent)) {
    suspiciousScore += SUSPICIOUS_PATTERNS.headlessChrome.score;
    reasons.push(SUSPICIOUS_PATTERNS.headlessChrome.reason);
  }

  // Check for automation tools
  if (/Selenium|WebDriver|scrapy|beautifulsoup/i.test(userAgent)) {
    suspiciousScore += SUSPICIOUS_PATTERNS.automationTools.score;
    reasons.push(SUSPICIOUS_PATTERNS.automationTools.reason);
  }

  // Check Accept header
  const accept = headers['accept'] || '';
  if (accept === '*/*' || accept === '' || !accept.includes('text/html')) {
    suspiciousScore += SUSPICIOUS_PATTERNS.unusualAccept.score;
    reasons.push(SUSPICIOUS_PATTERNS.unusualAccept.reason);
  }

  // Check for missing browser headers
  const browserHeaders = ['sec-ch-ua', 'sec-fetch-dest', 'sec-fetch-mode', 'sec-fetch-site'];
  const missingBrowserHeaders = browserHeaders.filter(h => !headers[h]);
  if (missingBrowserHeaders.length >= 3 && userAgent.includes('Chrome')) {
    suspiciousScore += SUSPICIOUS_PATTERNS.missingHeaders.score;
    reasons.push('Missing Chrome security headers');
  }

  // IP-based detection using CF data
  if (cf) {
    // Check if from data center
    if (cf.asOrganization && /amazon|google|microsoft|digitalocean|linode|ovh|hetzner/i.test(cf.asOrganization)) {
      suspiciousScore += SUSPICIOUS_PATTERNS.dataCenter.score;
      reasons.push(`Data center IP (${cf.asOrganization})`);
    }

    // Check bot score from Cloudflare
    if (cf.botManagement?.score && cf.botManagement.score < 30) {
      suspiciousScore += 50 - cf.botManagement.score;
      reasons.push(`CF Bot Score: ${cf.botManagement.score}`);
    }
  }

  // Determine if probable bot
  results.suspiciousScore = suspiciousScore;
  results.suspiciousReasons = reasons;

  if (suspiciousScore >= 80) {
    results.probableBot = true;
    results.confidence = 90;
    results.category = 'Suspicious';
    results.botName = 'Hidden Bot';
    results.purpose = 'Unknown/Scraping';
    results.detectionMethod.push('Behavioral Analysis');
  } else if (suspiciousScore >= 50) {
    results.probableBot = true;
    results.confidence = 70;
    results.category = 'Suspicious';
    results.botName = 'Probable Bot';
    results.purpose = 'Unknown';
    results.detectionMethod.push('Behavioral Analysis');
  } else if (suspiciousScore >= 30) {
    results.confidence = 50;
    results.category = 'Uncertain';
    results.botName = 'Maybe Bot';
    results.detectionMethod.push('Partial Indicators');
  } else {
    results.confidence = 20;
    results.category = 'Human';
    results.botName = 'Likely Human';
    results.detectionMethod.push('Standard Browser');
  }

  return results;
}

// Generate bot statistics
export function generateBotStats(requestHistory) {
  const stats = {
    total: requestHistory.length,
    byOperator: {},
    byCategory: {},
    byPurpose: {},
    suspiciousBots: 0,
    hiddenBots: 0,
    humanTraffic: 0,
    topBots: [],
    recentActivity: []
  };

  requestHistory.forEach(req => {
    const bot = req.bot;

    if (bot.isBot || bot.probableBot) {
      // By operator
      if (bot.operator) {
        stats.byOperator[bot.operator] = (stats.byOperator[bot.operator] || 0) + 1;
      }

      // By category
      if (bot.category) {
        stats.byCategory[bot.category] = (stats.byCategory[bot.category] || 0) + 1;
      }

      // By purpose
      if (bot.purpose) {
        stats.byPurpose[bot.purpose] = (stats.byPurpose[bot.purpose] || 0) + 1;
      }

      // Count suspicious
      if (bot.suspiciousScore >= 50) {
        stats.suspiciousBots++;
      }

      // Count hidden
      if (bot.probableBot && !bot.isBot) {
        stats.hiddenBots++;
      }
    } else {
      stats.humanTraffic++;
    }
  });

  // Calculate top bots
  stats.topBots = Object.entries(stats.byOperator)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  return stats;
}