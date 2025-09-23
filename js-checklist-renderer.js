// JS Feature Detection Live Checklist Renderer (<50 lines)
export function renderJSChecklist(requestId) {
  return `
  <div id="js-checklist" style="border: 2px solid #0645ad; padding: 15px; margin: 20px 0; background: #f8f9fa;">
    <h3 style="color: #000; font-size: 20px; margin: 0 0 10px 0;">⚡ JavaScript Feature Detection - LIVE</h3>
    <div id="js-status" style="padding: 10px; background: #fff; border: 1px solid #a2a9b1;">
      <div style="color: #000;">🔄 Detecting JavaScript features...</div>
    </div>
    <div id="js-features" style="display: none; margin-top: 10px;">
      <div id="js-summary" style="padding: 10px; background: #fff; margin-bottom: 10px;"></div>
      <details style="margin-top: 10px;">
        <summary style="cursor: pointer; color: #0645ad; text-decoration: underline;">View All Features</summary>
        <div id="js-details" style="padding: 10px; background: #fff; margin-top: 5px;"></div>
      </details>
    </div>
  </div>

  <script type="module">
  import { detectAllFeatures } from '/js-detector.js';

  const reqId = '${requestId}';
  const features = detectAllFeatures();

  // Save results to server
  fetch('/api/update-js/' + reqId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features)
  }).then(() => console.log('JS features saved'));

  // Update UI with results
  const status = document.getElementById('js-status');
  const featuresDiv = document.getElementById('js-features');
  const summary = document.getElementById('js-summary');
  const details = document.getElementById('js-details');

  // Display summary
  const stats = features.supportStats;
  summary.innerHTML = \`
    <div><strong>✅ JS Engine:</strong> \${features.jsEngine?.name || 'Unknown'} (\${features.jsEngine?.type || 'Unknown'})</div>
    <div><strong>✅ Support Level:</strong> \${stats?.supportPercentage || 0}% - \${stats?.compatibility || 'Unknown'}</div>
    <div><strong>✅ Features:</strong> \${stats?.supported || 0}/\${stats?.total || 0} supported</div>
  \`;

  // Display feature checklist
  let checklistHTML = '<div style="columns: 2; gap: 20px;">';
  for (const [category, tests] of Object.entries(features.features)) {
    checklistHTML += '<div style="break-inside: avoid; margin-bottom: 10px;">';
    checklistHTML += \`<strong style="color: #000;">\${category}:</strong><br>\`;
    for (const [feature, status] of Object.entries(tests)) {
      const icon = status === 'supported' ? '✅' : '❌';
      checklistHTML += \`<span style="color: #000;">\${icon} \${feature}</span><br>\`;
    }
    checklistHTML += '</div>';
  }
  details.innerHTML = checklistHTML + '</div>';

  status.style.display = 'none';
  featuresDiv.style.display = 'block';
  </script>`;
}