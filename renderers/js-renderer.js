// JavaScript Analysis Renderer (<50 lines)
export function renderJSAnalysis(jsData) {
  if (!jsData) return renderPending();

  const features = jsData.features;
  const stats = jsData.supportStats;

  return `
  <div style="border: 2px solid #00f; padding: 10px; margin: 10px 0; background: #f0f0ff;">
    <h3>⚡ JAVASCRIPT CAPABILITIES</h3>
    ${renderEngineInfo(jsData)}
    ${renderFeatureStats(stats)}
    ${renderESVersions(features.jsVersion)}
    ${renderKeyFeatures(features)}
  </div>`;
}

function renderPending() {
  return '<div style="padding: 10px; background: #fffacd;">⏳ JavaScript analysis pending...</div>';
}

function renderEngineInfo(jsData) {
  return `
  <div style="padding: 10px; background: #fff;">
    <div><strong>JS ENGINE:</strong> ${jsData.jsEngine?.name || 'Unknown'}</div>
    <div><strong>BROWSER:</strong> ${jsData.jsEngine?.type || 'Unknown'}</div>
  </div>`;
}

function renderFeatureStats(stats) {
  if (!stats) return '';
  const color = stats.supportPercentage >= 90 ? '#0f0' : stats.supportPercentage >= 70 ? '#ff0' : '#f00';
  return `
  <div style="padding: 10px; background: #f8f8f8;">
    <div><strong>SUPPORT:</strong> <span style="background:${color};padding:2px 5px;">${stats.supportPercentage}%</span></div>
    <div><strong>FEATURES:</strong> ${stats.supported}/${stats.total} supported</div>
    <div><strong>GRADE:</strong> ${stats.compatibility}</div>
  </div>`;
}

function renderESVersions(versions) {
  if (!versions) return '';
  const supported = Object.entries(versions)
    .filter(([_, status]) => status === 'supported')
    .map(([ver]) => ver);
  return `<div style="padding:5px;"><strong>ES:</strong> ${supported.join(', ') || 'ES5'}</div>`;
}

function renderKeyFeatures(features) {
  return `<div style="padding:5px;font-size:14px;">📊 Full feature report available</div>`;
}