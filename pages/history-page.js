// History page (<50 lines)
import { getSharedCSS } from '../shared-css.js';

export function renderHistoryPage(history) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Request History</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>REQUEST HISTORY</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/bots">BOTS</a>
  <a href="/stats">STATS</a>
</div>
<h2>${history.length} requests total</h2>
<table>
  <tr>
    <th>Time</th>
    <th>IP</th>
    <th>Type</th>
    <th>Path</th>
    <th>Link</th>
  </tr>
  ${history.map(req => {
    const label = req.bot.isBot ? 'BOT' :
                  req.bot.suspiciousScore >= 50 ? 'MAYBE' : 'HUMAN';
    return `
  <tr>
    <td>${req.timestamp}</td>
    <td>${req.network.ip}</td>
    <td>${label}</td>
    <td>${req.path}</td>
    <td><a href="/request/${req.id}">View</a></td>
  </tr>`;
  }).join('')}
</table>
</body>
</html>`;
}