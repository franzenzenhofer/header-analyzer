// Stats page generator (<50 lines)
import { renderHTMLStart, renderHTMLEnd } from '../components/html-head.js';
import { renderNavigation } from '../components/navigation.js';
import { CONSTANTS } from '../config/constants.js';

export function generateStatsPage(requestHistory) {
  const stats = calculateStats(requestHistory);

  return renderHTMLStart('Statistics - Header Analyzer') +
    '<h1>STATISTICS</h1>' +
    renderNavigation() +
    renderStatsTable(stats) +
    renderHTMLEnd();
}

function calculateStats(requestHistory) {
  const total = requestHistory.length;
  const bots = requestHistory.filter(r => r.bot.isBot).length;
  const maybeBots = requestHistory.filter(r =>
    !r.bot.isBot && r.bot.suspiciousScore >= CONSTANTS.SUSPICIOUS_THRESHOLD
  ).length;
  const humans = total - bots - maybeBots;
  const uniqueIPs = new Set(requestHistory.map(r => r.network.ip)).size;

  return {
    total,
    bots,
    humans,
    maybeBots,
    uniqueIPs,
    botPercent: total > 0 ? Math.round((bots / total) * 100) : 0,
    humanPercent: total > 0 ? Math.round((humans / total) * 100) : 0
  };
}

function renderStatsTable(stats) {
  return `
    <div class="stats">
      <h2>Overview</h2>
      <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Total Requests</td><td>${stats.total}</td></tr>
        <tr><td>Bots</td><td>${stats.bots} (${stats.botPercent}%)</td></tr>
        <tr><td>Humans</td><td>${stats.humans} (${stats.humanPercent}%)</td></tr>
        <tr><td>Maybe Bots</td><td>${stats.maybeBots}</td></tr>
        <tr><td>Unique IPs</td><td>${stats.uniqueIPs}</td></tr>
      </table>
    </div>`;
}