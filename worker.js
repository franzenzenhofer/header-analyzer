// Main Cloudflare Worker entry point (<50 lines)
import { captureRequest } from './capture-request.js';
import { generateMainPage } from './pages/main-page-gen.js';
import { generateHistoryPage } from './pages/history-page-gen.js';
import { generateStatsPage } from './pages/stats-page-gen.js';
import { generateBotsPage } from './pages/bots-page-gen.js';
import { generateDownloadPage } from './pages/download-page-gen.js';
import { generateComprehensiveDetail } from './pages/comprehensive-detail.js';
import { CONSTANTS } from './config/constants.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle JS data API endpoint
    if (path.startsWith(CONSTANTS.ROUTES.API_JS)) {
      const id = path.split('/').pop();
      const jsData = await request.json();
      await env.HEADER_HISTORY.put(`js_${id}`, JSON.stringify(jsData));
      return json({ success: true });
    }

    const history = await loadHistory(env);

    // Request detail page
    if (path.startsWith(CONSTANTS.ROUTES.REQUEST)) {
      const id = path.split('/')[2];
      const req = history.find(r => r.id === id);
      if (req) {
        req.jsData = await env.HEADER_HISTORY.get(`js_${id}`, { type: 'json' });
        return html(generateComprehensiveDetail(req));
      }
    }

    // Static pages
    if (path === CONSTANTS.ROUTES.STATS) return html(generateStatsPage(history));
    if (path === CONSTANTS.ROUTES.BOTS)
      return html(generateBotsPage(history, getPage(url)));
    if (path === CONSTANTS.ROUTES.HISTORY)
      return html(generateHistoryPage(history, getPage(url), url.searchParams.get('filter') || ''));
    if (path === CONSTANTS.ROUTES.DOWNLOAD)
      return html(generateDownloadPage(history, captureRequest(request, env)));

    // Home page - capture and save current request
    const current = captureRequest(request, env);
    current.jsData = await env.HEADER_HISTORY.get(`js_${current.id}`, { type: 'json' });
    history.unshift(current);
    if (history.length > CONSTANTS.MAX_HISTORY) history.length = CONSTANTS.MAX_HISTORY;
    await env.HEADER_HISTORY.put('history', JSON.stringify(history));
    return html(generateMainPage(current, history));
  }
};

async function loadHistory(env) { try { return await env.HEADER_HISTORY.get('history', { type: 'json' }) || []; } catch { return []; } }
function getPage(url) { return parseInt(url.searchParams.get('page') || '1'); }
function html(c) { return new Response(c, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } }); }
function json(d) { return new Response(JSON.stringify(d), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }); }