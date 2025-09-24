// Detail page generator (<50 lines)
import { getSharedCSS } from '../shared-css.js';
import { renderFullRequest } from '../renderers/request-renderer.js';
import { renderBotAnalysis } from '../renderers/bot-renderer.js';
import { renderFixedJSDetection } from '../js-detection-fixed.js';

export function generateDetailPage(request) {
  const botLabel = request.bot.isBot ?
    '<span class="bot-label">BOT</span>' :
    request.bot.suspiciousScore >= 50 ?
    '<span class="maybe-bot-label">MAYBE BOT</span>' :
    '<span class="human-label">HUMAN</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Request ${request.id} - Header Analyzer</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>REQUEST DETAILS</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY</a>
  <a href="/bots">BOTS</a>
</div>

<h2>REQUEST ID: ${request.id}</h2>
<div>
  <span>${request.timestamp}</span>
  <span>${request.network.ip}</span>
  ${botLabel}
</div>

${request.jsData ? renderFixedJSDetection(request.id, request.jsData) : ''}
${renderBotAnalysis(request)}
${renderFullRequest(request, true)}

<h3>Raw JSON Data</h3>
<pre>${JSON.stringify(request, null, 2)}</pre>

</body>
</html>`;
}