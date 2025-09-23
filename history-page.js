// DRY History Page Generator with Pagination & Filtering
import { renderFullRequest } from './analysis-renderer.js';

export function generateHistoryPage(requestHistory, page = 1, filter = '') {
  const ITEMS_PER_PAGE = 50;

  // Apply filter if provided
  let filteredRequests = requestHistory;
  if (filter) {
    const filterLower = filter.toLowerCase();
    filteredRequests = requestHistory.filter(req => {
      const searchText = JSON.stringify(req).toLowerCase();
      return searchText.includes(filterLower);
    });
  }

  const totalRequests = filteredRequests.length;
  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageRequests = filteredRequests.slice(startIndex, endIndex);

  // Generate pagination links
  const paginationLinks = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    paginationLinks.push(i);
  }
  if (totalPages > 5) {
    if (currentPage > 3) paginationLinks.push('...');
    if (currentPage > 3 && currentPage < totalPages - 2) {
      paginationLinks.push(currentPage);
    }
    if (currentPage < totalPages - 2) paginationLinks.push('...');
    paginationLinks.push(totalPages);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>History Page ${currentPage} - Header Analyzer</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #fff; color: #000; font: 16px/1.5 monospace; padding: 10px; }
h1 { font-size: 24px; margin: 10px 0; border-bottom: 2px solid #000; padding-bottom: 5px; }
h2 { font-size: 20px; margin: 15px 0 8px 0; }
h3 { font-size: 18px; margin: 10px 0 5px 0; }
.nav { background: #f8f8f8; padding: 10px; border: 1px solid #ddd; margin: 10px 0; }
.nav a { color: #0000ee; margin-right: 15px; font-size: 16px; text-decoration: underline; }
.filter-box { margin: 15px 0; padding: 10px; background: #f0f0f0; border: 1px solid #999; }
.filter-box input { padding: 8px; font-size: 16px; width: 300px; border: 1px solid #666; }
.request-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; background: #fafafa; }
.request-item.bot { background: #fff0f0; border-color: #f00; }
.pagination { margin: 20px 0; text-align: center; }
.pagination a, .pagination span { padding: 8px 12px; margin: 0 5px; font-size: 16px; }
.pagination a { background: #fff; border: 1px solid #000; text-decoration: none; color: #0000ee; }
.pagination span { background: #000; color: #fff; }
.stats-bar { background: #e0e0e0; padding: 10px; margin: 10px 0; font-size: 16px; }
</style>
</head>
<body>

<h1>REQUEST HISTORY${filter ? ' (FILTERED)' : ''}</h1>

<div class="nav">
  <a href="/">← BACK TO CURRENT</a>
  <a href="/bots">BOTS ONLY</a>
  <a href="/stats">STATS</a>
  <a href="/download">DOWNLOAD</a>
</div>

<div class="filter-box">
  <form method="get" action="/history">
    <input type="text" name="filter" value="${filter}" placeholder="Filter requests (IP, bot name, URL, etc.)" />
    <button type="submit" style="padding: 8px 15px; font-size: 16px;">FILTER</button>
    ${filter ? '<a href="/history" style="margin-left: 10px;">CLEAR FILTER</a>' : ''}
  </form>
</div>

<div class="stats-bar">
  Showing ${startIndex + 1}-${Math.min(endIndex, totalRequests)} of ${totalRequests} requests
  ${filter ? `(filtered from ${requestHistory.length} total)` : ''}
  | Page ${currentPage} of ${totalPages}
</div>

${pageRequests.map((req, i) => `
<div class="request-item ${req.bot.isBot ? 'bot' : ''}">
  <h3>
    #${startIndex + i + 1} | ${req.timestamp} |
    ${req.bot.isBot ?
      `<span style="background:#f00;color:#fff;padding:2px 5px;">BOT: ${req.bot.botName || req.bot.type}</span>` :
      '<span style="background:#0f0;color:#000;padding:2px 5px;">HUMAN</span>'}
    | ${req.network.ip}
    | ${req.geo.city || 'Unknown'}, ${req.geo.country || 'Unknown'}
  </h3>
  <div style="margin-top: 10px;">
    <a href="/request/${req.id}" style="color: #0000ee; font-size: 16px;">VIEW FULL DETAILS →</a>
  </div>
</div>
`).join('')}

${totalPages > 1 ? `
<div class="pagination">
  ${currentPage > 1 ? `<a href="/history?page=${currentPage - 1}${filter ? '&filter=' + encodeURIComponent(filter) : ''}">← PREV</a>` : ''}
  ${paginationLinks.map(p => {
    if (p === '...') return '<span>...</span>';
    if (p === currentPage) return `<span>${p}</span>`;
    return `<a href="/history?page=${p}${filter ? '&filter=' + encodeURIComponent(filter) : ''}">${p}</a>`;
  }).join('')}
  ${currentPage < totalPages ? `<a href="/history?page=${currentPage + 1}${filter ? '&filter=' + encodeURIComponent(filter) : ''}">NEXT →</a>` : ''}
</div>
` : ''}

</body>
</html>`;
}