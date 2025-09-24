// Detective analysis renderer (<50 lines)
import { CONSTANTS } from '../config/constants.js';

export function renderDetectiveAnalysis(req) {
  const ua = req.headers['user-agent'] || 'None';
  const referer = req.headers['referer'] || req.headers['referrer'] || 'Direct';

  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
<h2>DETECTIVE ANALYSIS</h2>
<h3>Referrer Analysis</h3>
<div class="${CONSTANTS.CLASSES.SUB}">
  <div><strong>Source:</strong> ${analyzeReferrer(referer)}</div>
  <div><strong>Full Referrer:</strong> ${referer}</div>
</div>
<h3>Bot Detection Summary</h3>
<div class="${CONSTANTS.CLASSES.SUB}">
  <div><strong>Bot Probability:</strong> ${req.bot.suspiciousScore}%</div>
  <div><strong>Confidence:</strong> ${req.bot.confidence}%</div>
  ${req.bot.isBot ? `<div><strong>Identified as:</strong> ${req.bot.operator || 'Unknown'} ${req.bot.botName || ''}</div>` : ''}
  ${req.bot.probableBot ? '<div><strong>Status:</strong> Probable Bot</div>' : ''}
</div>
${renderSuspiciousReasons(req.bot)}
<h3>User Agent</h3>
<div class="${CONSTANTS.CLASSES.SUB}">
  <div style="word-wrap: break-word;">${ua}</div>
</div>
</div>`;
}

function analyzeReferrer(referer) {
  if (referer.includes('google')) return 'Google Search';
  if (referer.includes('bing')) return 'Bing Search';
  if (referer.includes('anthropic')) return 'Anthropic AI';
  if (referer.includes('openai')) return 'OpenAI';
  if (referer.includes('perplexity')) return 'Perplexity AI';
  return referer === 'Direct' ? 'Direct Visit' : 'External Site';
}

function renderSuspiciousReasons(bot) {
  if (!bot.reasons || bot.reasons.length === 0) {
    return '';
  }
  return `<h3>Suspicious Indicators</h3>
<div class="${CONSTANTS.CLASSES.SUB}">
  ${bot.reasons.map(r => `<div>- ${r}</div>`).join('')}
</div>`;
}