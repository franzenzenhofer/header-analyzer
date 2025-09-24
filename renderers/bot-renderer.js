// Bot Analysis Renderer - Wikipedia style (<50 lines)
import { renderBotLabel } from '../components/bot-label.js';
import { CONSTANTS } from '../config/constants.js';

export function renderBotAnalysis(req) {
  const bot = req.bot;
  const hasSignature = req.headers['signature'] && req.headers['signature-agent'];

  return `
  <div class="${CONSTANTS.CLASSES.REQUEST}">
    <h3>BOT DETECTION RESULT</h3>
    <div class="${CONSTANTS.CLASSES.SUB}">
      <div><strong>STATUS:</strong> ${renderBotLabel(bot)}</div>
      <div><strong>CONFIDENCE:</strong> ${bot.confidence}%</div>
      ${bot.operator ? `<div><strong>OPERATOR:</strong> ${bot.operator}</div>` : ''}
      ${bot.botName ? `<div><strong>BOT NAME:</strong> ${bot.botName}</div>` : ''}
      ${bot.type ? `<div><strong>TYPE:</strong> ${bot.type}</div>` : ''}
      ${hasSignature ? renderSignatureAlert() : ''}
      ${renderDetectionReasons(bot)}
    </div>
  </div>`;
}

function renderDetectionReasons(bot) {
  // For humans, show why we think they're human
  if (!bot.isBot && !bot.probableBot) {
    if (bot.suspiciousScore === 0) {
      return `<div><strong>WHY HUMAN:</strong> All expected browser headers present, normal behavior</div>`;
    } else if (bot.suspiciousScore < 30) {
      return `<div><strong>WHY HUMAN:</strong> Mostly normal browser behavior</div>`;
    } else {
      return `<div><strong>MINOR ISSUES:</strong>
        <ul>${bot.reasons ? bot.reasons.map(r => `<li>${r}</li>`).join('') : ''}</ul>
        <div>But overall appears to be a regular browser</div>
      </div>`;
    }
  }

  // For bots, show why we detected them
  if (!bot.reasons || bot.reasons.length === 0) return '';
  return `<div><strong>WHY ${bot.isBot ? 'BOT' : 'MAYBE BOT'}:</strong>
    <ul>${bot.reasons.map(r => `<li>${r}</li>`).join('')}</ul>
  </div>`;
}


function renderSignatureAlert() {
  return `<div class="${CONSTANTS.CLASSES.BOT}"><strong>AI SIGNATURE DETECTED</strong></div>`;
}