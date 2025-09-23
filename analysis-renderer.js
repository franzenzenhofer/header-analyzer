// DRY Analysis Renderer - Main Module (<50 lines)
import { renderBotAnalysis } from './renderers/bot-renderer.js';
import { renderJSAnalysis } from './renderers/js-renderer.js';
import {
  renderRequestInfo,
  renderHeaders,
  renderNetwork,
  renderLocation
} from './renderers/request-renderer.js';

export function renderFullRequest(req, isCurrent) {
  return `
  <div class="sub">
    ${renderRequestInfo(req)}
    ${renderHeaders(req)}
    ${renderNetwork(req)}
    ${renderLocation(req)}
    ${renderBotAnalysis(req)}
  </div>`;
}

export { renderBotAnalysis, renderJSAnalysis };