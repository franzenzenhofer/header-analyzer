// Stats page renderer (<50 lines)
import { getSharedCSS } from '../shared-css.js';

export function renderStatsPage(stats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Header Analyzer - Statistics</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>STATISTICS</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY</a>
  <a href="/bots">BOTS</a>
</div>
<div class="stats">
  <h2>Overview</h2>
  <table>
    <tr><th>Metric</th><th>Value</th></tr>
    <tr><td>Total Requests</td><td>${stats.total}</td></tr>
    <tr><td>Bots</td><td>${stats.bots}</td></tr>
    <tr><td>Humans</td><td>${stats.humans}</td></tr>
    <tr><td>Maybe Bots</td><td>${stats.maybeBots}</td></tr>
  </table>
</div>
</body>
</html>`;
}

export function calculateStats(requestHistory) {
  const total = requestHistory.length;
  const bots = requestHistory.filter(r => r.bot.isBot).length;
  const maybeBots = requestHistory.filter(r =>
    !r.bot.isBot && r.bot.suspiciousScore >= 50
  ).length;
  const humans = total - bots - maybeBots;

  return {
    total,
    bots,
    humans,
    maybeBots
  };
}