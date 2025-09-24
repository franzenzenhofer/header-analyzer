// Bots page (<50 lines)
import { getSharedCSS } from '../shared-css.js';

export function renderBotsPage(bots) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bot Requests</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>BOT REQUESTS</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY</a>
  <a href="/stats">STATS</a>
</div>
<h2>Found ${bots.length} bot requests</h2>
<table>
  <tr>
    <th>Time</th>
    <th>IP</th>
    <th>Bot Type</th>
    <th>User Agent</th>
    <th>Link</th>
  </tr>
  ${bots.map(bot => `
  <tr>
    <td>${bot.timestamp}</td>
    <td>${bot.network.ip}</td>
    <td>${bot.bot.type}</td>
    <td>${bot.headers['user-agent'] || 'none'}</td>
    <td><a href="/request/${bot.id}">View</a></td>
  </tr>
  `).join('')}
</table>
</body>
</html>`;
}