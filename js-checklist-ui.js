// JS Checklist UI Component (<50 lines)
export function renderChecklistUI() {
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
  </div>`;
}

export function updateChecklistUI(features) {
  const summary = document.getElementById('js-summary');
  const details = document.getElementById('js-details');
  const stats = features.supportStats;

  summary.innerHTML = `
    <div><strong>✅ JS Engine:</strong> ${features.jsEngine?.name || 'Unknown'}</div>
    <div><strong>✅ Support:</strong> ${stats?.supportPercentage || 0}%</div>
    <div><strong>✅ Features:</strong> ${stats?.supported || 0}/${stats?.total || 0}</div>
  `;

  let html = '<div style="columns: 2; gap: 20px;">';
  for (const [category, tests] of Object.entries(features.features)) {
    html += `<div style="break-inside: avoid; margin-bottom: 10px;">`;
    html += `<strong style="color: #000;">${category}:</strong><br>`;
    for (const [feature, status] of Object.entries(tests)) {
      const icon = status === 'supported' ? '✅' : '❌';
      html += `<span style="color: #000;">${icon} ${feature}</span><br>`;
    }
    html += '</div>';
  }
  details.innerHTML = html + '</div>';

  document.getElementById('js-status').style.display = 'none';
  document.getElementById('js-features').style.display = 'block';
}