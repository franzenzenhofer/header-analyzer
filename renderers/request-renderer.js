// Request Info Renderer (<50 lines)
export function renderRequestInfo(req) {
  return `
  <div class="sub">
    <h4>REQUEST INFO</h4>
    <div class="sub">
      <div><span class="key">ID:</span> <span class="value">${req.id}</span></div>
      <div><span class="key">TIME:</span> <span class="value">${req.timestamp}</span></div>
      <div><span class="key">METHOD:</span> <span class="value">${req.request.method}</span></div>
      <div><span class="key">URL:</span> <span class="value">${req.request.url}</span></div>
      <div><span class="key">PATH:</span> <span class="value">${req.request.path}</span></div>
    </div>
  </div>`;
}

export function renderHeaders(req) {
  return `
  <h4>HEADERS (${req.headerCount})</h4>
  <div class="sub">
    ${Object.entries(req.headers).map(([k,v]) =>
      `<div><span class="key">${k}:</span> <span class="value">${v}</span></div>`
    ).join('')}
  </div>`;
}

export function renderNetwork(req) {
  return `
  <h4>NETWORK</h4>
  <div class="sub">
    <div><span class="key">IP:</span> <span class="value">${req.network.ip}</span></div>
    <div><span class="key">TLS:</span> <span class="value">${req.network.tlsVersion || 'unknown'}</span></div>
    <div><span class="key">PROTOCOL:</span> <span class="value">${req.network.protocol || 'unknown'}</span></div>
  </div>`;
}

export function renderLocation(req) {
  return `
  <h4>LOCATION</h4>
  <div class="sub">
    <div><span class="key">COUNTRY:</span> <span class="value">${req.geo.country || 'unknown'}</span></div>
    <div><span class="key">CITY:</span> <span class="value">${req.geo.city || 'unknown'}</span></div>
    <div><span class="key">ASN:</span> <span class="value">${req.geo.asn || 'unknown'}</span></div>
    <div><span class="key">ORG:</span> <span class="value">${req.geo.asOrganization || 'unknown'}</span></div>
  </div>`;
}