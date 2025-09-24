// Detail page (<50 lines)
import { getSharedCSS } from '../shared-css.js';
import { renderFullRequest } from '../renderers/request-renderer.js';

export function renderDetailPage(request) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Request ${request.id}</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>REQUEST DETAILS</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY</a>
  <a href="/bots">BOTS</a>
  <a href="/stats">STATS</a>
</div>
<h2>ID: ${request.id}</h2>
<p>Time: ${request.timestamp}</p>
<p>IP: ${request.network.ip}</p>
<p>Bot: ${request.bot.isBot ? 'YES' : 'NO'}</p>
${renderFullRequest(request, false)}
<h3>Raw JSON</h3>
<pre>${JSON.stringify(request, null, 2)}</pre>
</body>
</html>`;
}