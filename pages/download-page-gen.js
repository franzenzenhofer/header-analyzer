// Download page generator (<50 lines)
import { renderHTMLStart, renderHTMLEnd } from '../components/html-head.js';
import { renderNavigation } from '../components/navigation.js';
import { CONSTANTS } from '../config/constants.js';

export function generateDownloadPage(requestHistory, currentRequest) {
  const stats = calculateDownloadStats(requestHistory);

  return renderHTMLStart('Download Data - Header Analyzer') +
    '<h1>DOWNLOAD DATA</h1>' +
    renderNavigation() +
    renderDownloadContent(stats, currentRequest) +
    renderHTMLEnd();
}

function calculateDownloadStats(requestHistory) {
  return {
    total: requestHistory.length,
    bots: requestHistory.filter(r => r.bot.isBot).length,
    humans: requestHistory.filter(r =>
      !r.bot.isBot && r.bot.suspiciousScore < CONSTANTS.SUSPICIOUS_THRESHOLD
    ).length
  };
}

function renderDownloadContent(stats, currentRequest) {
  return `
    <div class="stats">
      <h2>Available Data</h2>
      <p>Total Requests: ${stats.total}</p>
      <p>Bots: ${stats.bots}</p>
      <p>Humans: ${stats.humans}</p>

      <h3>Download Options</h3>
      <ul>
        <li><a href="${CONSTANTS.ROUTES.DOWNLOAD}/json" download>Download as JSON</a></li>
        <li><a href="${CONSTANTS.ROUTES.DOWNLOAD}/csv" download>Download as CSV</a></li>
        <li><a href="${CONSTANTS.ROUTES.DOWNLOAD}/zip" download>Download as ZIP</a></li>
      </ul>

      <h3>Data Preview</h3>
      <pre>${JSON.stringify({
        currentRequest: currentRequest.id,
        totalRequests: stats.total,
        latestTimestamp: currentRequest.timestamp
      }, null, 2)}</pre>
    </div>`;
}