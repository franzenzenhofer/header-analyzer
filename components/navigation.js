// Single navigation component for ALL pages (<50 lines)
export function renderNavigation(requestCount = 0) {
  return `<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY${requestCount > 0 ? ` (${requestCount})` : ''}</a>
  <a href="/bots">BOTS</a>
  <a href="/stats">STATS</a>
  <a href="/download">DOWNLOAD</a>
</div>`;
}