// Bot Analysis Renderer (<50 lines)
export function renderBotAnalysis(req) {
  const bot = req.bot;
  const hasSignature = req.headers['signature'] && req.headers['signature-agent'];

  return `
  <div style="border: 2px solid ${bot.isBot ? '#f00' : '#0f0'}; padding: 10px; margin: 10px 0; background: ${bot.isBot ? '#fff0f0' : '#f0fff0'};">
    <h3>🤖 BOT DETECTION RESULT</h3>
    <div style="padding: 10px; background: #f8f8f8;">
      <div><strong>STATUS:</strong> ${renderBotStatus(bot)}</div>
      <div><strong>CONFIDENCE:</strong> ${bot.confidence}%</div>
      ${bot.operator ? `<div><strong>OPERATOR:</strong> ${bot.operator}</div>` : ''}
      ${bot.botName ? `<div><strong>BOT NAME:</strong> ${bot.botName}</div>` : ''}
      ${hasSignature ? renderSignatureAlert() : ''}
    </div>
  </div>`;
}

function renderBotStatus(bot) {
  if (bot.isBot) return '<span style="background:#f00;color:#fff;padding:2px 5px;">CONFIRMED BOT</span>';
  if (bot.suspiciousScore >= 50) return '<span style="background:#ff0;color:#000;padding:2px 5px;">SUSPICIOUS</span>';
  return '<span style="background:#0f0;color:#fff;padding:2px 5px;">HUMAN</span>';
}

function renderSignatureAlert() {
  return `
  <div style="background:#ff0;padding:5px;margin:5px 0;border:2px solid #f00;">
    <strong>🔐 AI SIGNATURE DETECTED</strong>
  </div>`;
}