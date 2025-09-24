// Main page generator (<50 lines)
import { getSharedCSS } from '../shared-css.js';
import { renderComprehensiveJS } from '../js-detection-comprehensive.js';
import { renderBotAnalysis } from '../renderers/bot-renderer.js';
import { renderFullRequest } from '../renderers/request-renderer.js';

export function generateMainPage(currentRequest, requestHistory) {
  const botLabel = currentRequest.bot.isBot ?
    '<span class="bot-label">BOT</span>' :
    currentRequest.bot.suspiciousScore >= 50 ?
    '<span class="maybe-bot-label">MAYBE BOT</span>' :
    '<span class="human-label">HUMAN</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Header Analyzer - FULL DATA</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>HEADER ANALYZER - CURRENT REQUEST ANALYSIS</h1>
<div class="nav">
  <a href="/history">VIEW HISTORY (${requestHistory.length} requests)</a>
  <a href="/bots">BOTS ONLY</a>
  <a href="/stats">STATS</a>
  <a href="/download">DOWNLOAD</a>
</div>

<h2><a href="/request/${currentRequest.id}">REQUEST ID: ${currentRequest.id}</a></h2>
<div>
  <span>${currentRequest.timestamp}</span>
  <span>${currentRequest.network.ip}</span>
  ${botLabel}
</div>

${renderComprehensiveJS(currentRequest.id, currentRequest.jsData)}
${renderBotAnalysis(currentRequest)}
${renderFullRequest(currentRequest, true)}

</body>
</html>`;
}