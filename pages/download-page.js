// Download page (<50 lines)
import { getSharedCSS } from '../shared-css.js';

export function renderDownloadPage(requestHistory) {
  const jsonData = JSON.stringify(requestHistory, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Download Data</title>
<style>${getSharedCSS()}</style>
</head>
<body>
<h1>DOWNLOAD REQUEST DATA</h1>
<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY</a>
  <a href="/stats">STATS</a>
</div>
<h2>Download Options</h2>
<p>Total requests: ${requestHistory.length}</p>
<button onclick="downloadJSON()">Download JSON</button>
<pre>${jsonData}</pre>
<script>
function downloadJSON() {
  const data = ${JSON.stringify(requestHistory)};
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'header-data.json';
  a.click();
}
</script>
</body>
</html>`;
}