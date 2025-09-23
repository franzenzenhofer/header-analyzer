# CLAUDE.md - Header Analyzer Project

## PROJECT MISSION
Capture and display EVERY piece of HTTP request data with ZERO truncation or hiding. Full transparency, full data, full static HTML.

## CORE PRINCIPLES
1. **MAX 50 LINES** - NO FILE CAN BE BIGGER THAN 50 LINES!!! EVER!!!
2. **TEST FIRST** - Write tests before code - ALWAYS
3. **HARDCORE LINT** - Zero warnings, strictest rules
4. **STRICT TS** - Every strict flag enabled
5. **DRY CODE** - Super modular, reusable functions
6. **NO TRUNCATION** - Show everything, always
7. **FULL LINKS** - Everything clickable and inspectable
8. **DEPLOY CHECKS** - npm run deploy MUST run ALL checks

## DEPLOYMENT - MANDATORY CHECKS
```bash
# npm run deploy MUST run:
# 1. ./check-file-sizes.sh - NO file over 50 lines
# 2. npm test - ALL tests must pass
# 3. npm run lint - ZERO warnings
# 4. npm run typecheck - STRICT mode
# 5. ONLY THEN: wrangler deploy

npm run deploy  # This runs ALL checks first

# NEVER use this directly
wrangler deploy  # BLOCKED! Use npm run deploy
```

## ARCHITECTURE
```
_worker.js (348 lines)
├── captureData() - Extract ALL request data
├── renderFullRequest() - Display EVERYTHING
├── generateDetailPage() - Individual request pages
└── Main HTML - 50 full requests, no truncation
```

## DATA CAPTURED
- **Headers**: ALL headers, no filtering
- **Network**: IP, TLS, protocols, RTT
- **Geographic**: Country, city, ASN, lat/long
- **Bot Detection**: 27+ types with confidence
- **Security**: Referer, origin, fetch metadata
- **Cookies**: Full parsing
- **Query**: All parameters
- **CloudFlare**: Raw CF object

## TESTING REQUIREMENTS
```bash
npm test          # Unit tests - MUST PASS
npm run lint      # Zero warnings - ENFORCED
npm run typecheck # Strict mode - REQUIRED
npm run e2e       # Full E2E - MANDATORY
```

## PERFORMANCE TARGETS
- Response: <100ms
- HTML size: <100KB
- Memory: <10MB
- Uptime: 99.9%

## UI RULES
- Black background (#000)
- Green text (#0f0)
- 10px monospace font
- No cards, no padding waste
- Maximum data density
- Sticky navigation
- Border hierarchy

## BOT TYPES DETECTED
```
Google, Bing, Facebook, Twitter, Slack,
LinkedIn, WhatsApp, Telegram, Discord,
Anthropic, Claude, OpenAI, GPT, ChatGPT,
curl, wget, Postman, Insomnia,
Python, Ruby, Java, Go,
Generic bot, crawler, spider, scraper
```

## URLS
- **Main**: https://header-analyzer.franzai.com
- **Detail**: https://header-analyzer.franzai.com/request/{id}
- **Stats**: https://header-analyzer.franzai.com/stats (TODO)

## CRITICAL RULES
1. Show ALL data - no exceptions
2. Every request in FULL on main page
3. Detail pages with raw JSON
4. No client-side JavaScript
5. Pure static HTML generation
6. In-memory storage only
7. 50 request history limit
8. Edge computing on Cloudflare

## COMMON ISSUES
- **Data truncated**: Check renderFullRequest()
- **Missing headers**: Check captureData()
- **Deploy fails**: Use npm run deploy
- **Tests fail**: Fix before deploying

## MAINTENANCE
```bash
# Check live site
curl https://header-analyzer.franzai.com | grep "HEADER ANALYZER"

# Test bot detection
curl -H "User-Agent: Googlebot" https://header-analyzer.franzai.com

# Monitor requests
watch 'curl -s https://header-analyzer.franzai.com | grep "TOTAL:"'
```

**REMEMBER: NO TRUNCATION. SHOW EVERYTHING. FULL DATA ALWAYS.**