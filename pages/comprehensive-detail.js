// Comprehensive detail page with ALL analysis (<50 lines)
import { renderHTMLStart, renderHTMLEnd } from '../components/html-head.js';
import { renderNavigation } from '../components/navigation.js';
import { renderBotLabel } from '../components/bot-label.js';
import { renderBotAnalysis } from '../renderers/bot-renderer.js';
import { renderJS78Detection } from '../js-detection-78-features.js';
import { renderEmptyJSDetection } from '../components/js-empty.js';
import { renderDetectiveAnalysis } from '../renderers/detective-renderer.js';
import { renderFullRequest } from '../renderers/request-renderer.js';
import { CONSTANTS } from '../config/constants.js';

export function generateComprehensiveDetail(request) {
  return renderHTMLStart(`Request ${request.id} - FULL ANALYSIS`) +
    '<h1>REQUEST DETAILS - COMPREHENSIVE ANALYSIS</h1>' +
    renderNavigation() +
    renderRequestHeader(request) +
    renderBotAnalysis(request) +
    renderFullRequest(request, true) +
    renderJSSection(request) +
    renderDetectiveAnalysis(request) +
    renderRawJSON(request) +
    renderHTMLEnd();
}

function renderRequestHeader(req) {
  return `
    <h2>REQUEST ID: ${req.id}</h2>
    <div>
      <span>${req.timestamp}</span>
      <span>${req.network.ip}</span>
      ${renderBotLabel(req.bot)}
    </div>`;
}

function renderJSSection(req) {
  return (req.jsData && Object.keys(req.jsData).length > 0) ?
    renderJS78Detection(req.id, req.jsData) :
    renderEmptyJSDetection();
}

function renderRawJSON(req) {
  return `<h3>Raw JSON Data</h3><pre>${JSON.stringify(req, null, 2)}</pre>`;
}