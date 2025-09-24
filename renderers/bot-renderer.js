// Bot Analysis Renderer - Wikipedia style (<50 lines)
export function renderBotAnalysis(req) {
  const bot = req.bot;
  const hasSignature = req.headers['signature'] && req.headers['signature-agent'];

  return `
  <div class="request-full">
    <h3>BOT DETECTION RESULT</h3>
    <div class="sub">
      <div><strong>STATUS:</strong> ${renderBotStatus(bot)}</div>
      <div><strong>CONFIDENCE:</strong> ${bot.confidence}%</div>
      ${bot.operator ? `<div><strong>OPERATOR:</strong> ${bot.operator}</div>` : ''}
      ${bot.botName ? `<div><strong>BOT NAME:</strong> ${bot.botName}</div>` : ''}
      ${hasSignature ? renderSignatureAlert() : ''}
    </div>
  </div>`;
}

function renderBotStatus(bot) {
  if (bot.isBot) return '<span class="bot-label">CONFIRMED BOT</span>';
  if (bot.suspiciousScore >= 50) return '<span class="maybe-bot-label">SUSPICIOUS</span>';
  return '<span class="human-label">HUMAN</span>';
}

function renderSignatureAlert() {
  return '<div class="bot-label"><strong>AI SIGNATURE DETECTED</strong></div>';
}