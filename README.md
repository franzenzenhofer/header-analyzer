# Header Analyzer - Complete Request Intelligence

🔍 **Live at:** https://header-analyzer.franzai.com

A hardcore HTTP request analyzer that captures and displays EVERYTHING about incoming requests with zero data hiding. Built as a Cloudflare Worker for edge performance.

## Features

### COMPLETE DATA CAPTURE
- **ALL Headers** - Every single HTTP header, no truncation
- **Network Info** - IPs, protocols, TLS versions, cipher suites
- **Geographic Data** - Country, city, region, ASN, timezone, lat/long
- **Bot Detection** - 27+ bot types with confidence scoring
- **Security Analysis** - Referers, origins, fetch metadata
- **Cookies** - Full cookie parsing and display
- **Query Parameters** - Complete URL parameter extraction
- **CloudFlare Data** - Raw CF object with all metadata

### NO DATA HIDING
- **50 Full Requests** - All displayed on main page, no pagination
- **Zero Truncation** - Every byte of data shown
- **Detail Pages** - Each request has dedicated page with raw JSON
- **Search in Page** - Real-time highlighting
- **Static HTML** - No JavaScript state management issues

### PERFORMANCE
- **Edge Computing** - Runs on Cloudflare's global network
- **Sub-100ms Response** - Lightning fast static HTML generation
- **No Database** - In-memory storage for speed
- **Minimal CSS** - 10px monospace, maximum density

## Architecture

```
┌─────────────────────┐
│  Incoming Request   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Cloudflare Worker  │
│   _worker.js        │
│  - Capture ALL data │
│  - Store in memory  │
│  - Generate HTML    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Static HTML       │
│  - Main page        │
│  - Detail pages     │
│  - Statistics       │
└─────────────────────┘
```

## Request Data Structure

```javascript
{
  id: UUID,
  timestamp: ISO-8601,
  timestampMs: Unix timestamp,

  request: {
    method, url, path, search, hash,
    host, hostname, port, protocol
  },

  headers: { ALL headers },
  cookies: { parsed cookies },
  query: { query parameters },

  network: {
    ip, ips: { connecting, forwarded, real, proxy },
    protocol, tlsVersion, tlsCipher, tcpRtt
  },

  geo: {
    country, city, region, timezone,
    latitude, longitude, asn, asOrganization
  },

  bot: {
    isBot, type, userAgent
  },

  security: {
    referer, origin, sec-fetch-*
  },

  cf: { raw CloudFlare object }
}
```

## Bot Detection

Detects 27+ bot types including:
- Search engines (Google, Bing)
- Social media (Facebook, Twitter, LinkedIn)
- AI agents (Claude, GPT, Anthropic)
- Developer tools (curl, wget, Postman)
- Crawlers and spiders
- Programming language clients

## Development

### Setup
```bash
npm install
npm run dev      # Local development
npm run build    # Build for production
npm run deploy   # Deploy to Cloudflare
```

### Configuration
```toml
# wrangler.toml
name = "header-analyzer"
main = "_worker.js"
compatibility_date = "2025-01-22"

[[routes]]
pattern = "header-analyzer.franzai.com/*"
zone_name = "franzai.com"
```

### Testing
```bash
npm test         # Unit tests
npm run lint     # ESLint (max-warnings 0)
npm run typecheck # TypeScript strict
```

## API Endpoints

- `/` - Main page with all data
- `/request/{id}` - Individual request detail page
- `/stats` - Statistics page (coming soon)

## Performance Metrics

- **Response Time**: <100ms
- **HTML Size**: ~50KB for 50 requests
- **Memory Usage**: <10MB for 50 requests
- **Global Coverage**: 200+ edge locations

## Security

- No data persistence beyond session
- No external dependencies
- No JavaScript execution required
- Read-only display
- No user input processing

## Browser Support

Works on everything - pure HTML/CSS:
- All modern browsers
- Text browsers (lynx, w3m)
- Mobile browsers
- Screen readers
- Bots and crawlers

## License

MIT - Use freely for any purpose

## Credits

Built with:
- Cloudflare Workers
- Pure HTML/CSS
- Zero JavaScript frameworks
- Maximum performance focus

---

**NO TRUNCATION. NO HIDING. EVERYTHING VISIBLE.**