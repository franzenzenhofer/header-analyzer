// Main page renderer (<50 lines)
import { getSharedCSS } from '../shared-css.js';
import { renderJSChecklist } from '../js-checklist-renderer.js';
import { renderBotAnalysis } from '../renderers/bot-renderer.js';
import { renderFullRequest } from '../renderers/request-renderer.js';

export function renderMainPage(currentRequest, requestHistory) {
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
<h1>HEADER ANALYZER - CURRENT REQUEST</h1>
<div class="nav">
  <a href="/history">VIEW HISTORY (${requestHistory.length} requests)</a>
  <a href="/bots">BOTS ONLY</a>
  <a href="/stats">STATS</a>
  <a href="/download">DOWNLOAD</a>
</div>

<h2>REQUEST ID: ${currentRequest.id}</h2>
<div style="display: flex; gap: 10px; margin: 10px 0; align-items: center;">
  <span>${currentRequest.timestamp}</span>
  <span style="font-weight: bold;">${currentRequest.network.ip}</span>
  ${botLabel}
  <a href="/request/${currentRequest.id}" style="margin-left: auto;">View Details</a>
</div>

${renderJSChecklist(currentRequest.id)}
${renderBotAnalysis(currentRequest)}
${renderFullRequest(currentRequest, true)}

</body>
</html>`;
}