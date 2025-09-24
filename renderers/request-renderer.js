// Request Info Renderer (<50 lines)
export function renderFullRequest(req, isCurrent) {
  return `<div class="request-full ${isCurrent ? 'current' : ''}">
    ${renderRequestInfo(req)}${renderHeaders(req)}${renderNetwork(req)}${renderLocation(req)}
  </div>`;
}

export function renderRequestInfo(req) {
  return `<div class="sub">
    <h4>REQUEST INFO</h4>
    <div class="sub">
      <div><span class="key">ID:</span> <span class="value">${req.id}</span></div>
      <div><span class="key">TIME:</span> <span class="value">${req.timestamp}</span></div>
      <div><span class="key">METHOD:</span> <span class="value">${req.method}</span></div>
      <div><span class="key">URL:</span> <span class="value">${req.url}</span></div>
      <div><span class="key">PATH:</span> <span class="value">${req.path}</span></div>
    </div>
  </div>`;
}

export function renderHeaders(req) {
  const count = req.headers ? Object.keys(req.headers).length : 0;
  return `<h4>HEADERS (${count})</h4>
  <div class="sub">
    ${req.headers ? Object.entries(req.headers).map(([k,v]) =>
      `<div><span class="key">${k}:</span> <span class="value">${v}</span></div>`
    ).join('') : 'No headers'}
  </div>`;
}

export function renderNetwork(req) {
  return `<h4>NETWORK</h4>
  <div class="sub">
    <div><span class="key">IP:</span> <span class="value">${req.network?.ip || 'unknown'}</span></div>
    <div><span class="key">TLS:</span> <span class="value">${req.network?.tlsVersion || 'unknown'}</span></div>
    <div><span class="key">PROTOCOL:</span> <span class="value">${req.network?.protocol || 'unknown'}</span></div>
  </div>`;
}

export function renderLocation(req) {
  const geo = req.network || req.geo || {};
  return `<h4>LOCATION</h4>
  <div class="sub">
    <div><span class="key">COUNTRY:</span> <span class="value">${geo.country || 'unknown'}</span></div>
    <div><span class="key">CITY:</span> <span class="value">${geo.city || 'unknown'}</span></div>
    <div><span class="key">ASN:</span> <span class="value">${geo.asn || 'unknown'}</span></div>
  </div>`;
}