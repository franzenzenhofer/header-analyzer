// Main page generator (<50 lines)
import { renderHTMLStart, renderHTMLEnd } from '../components/html-head.js';
import { renderNavigation } from '../components/navigation.js';
import { renderBotLabel } from '../components/bot-label.js';
import { renderJS78Detection } from '../js-detection-78-features.js';
import { renderBotAnalysis } from '../renderers/bot-renderer.js';
import { renderFullRequest } from '../renderers/request-renderer.js';
import { CONSTANTS } from '../config/constants.js';

export function generateMainPage(currentRequest, requestHistory) {
  return renderHTMLStart('Header Analyzer - FULL DATA') +
    '<h1>HEADER ANALYZER - CURRENT REQUEST ANALYSIS</h1>' +
    renderNavigation(requestHistory.length) +
    renderCurrentRequestSummary(currentRequest) +
    renderBotAnalysis(currentRequest) +
    renderFullRequest(currentRequest, true) +
    renderJS78Detection(currentRequest.id, currentRequest.jsData) +
    renderHTMLEnd();
}

function renderCurrentRequestSummary(req) {
  return `
    <h2><a href="${CONSTANTS.ROUTES.REQUEST}${req.id}">REQUEST ID: ${req.id}</a></h2>
    <div>
      <span>${req.timestamp}</span>
      <span>${req.network.ip}</span>
      ${renderBotLabel(req.bot)}
      <strong><a href="${CONSTANTS.ROUTES.REQUEST}${req.id}">[ VIEW FULL DETAILS ]</a></strong>
    </div>`;
}