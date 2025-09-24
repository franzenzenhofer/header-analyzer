// Unified bot detection engine (<50 lines)
import botRules from './bot-rules.json';

export function detectBot(headers, cf = {}) {
  const ua = headers['user-agent'] || '';
  const uaLower = ua.toLowerCase();

  // Check against all bot rules
  for (const rule of botRules.bots) {
    for (const pattern of rule.patterns) {
      if (uaLower.includes(pattern.toLowerCase())) {
        // Developer tools are maybe bots, not certain bots
        const isDeveloperTool = rule.type === 'Developer Tool';
        const suspiciousScore = isDeveloperTool ? 60 : 0;

        return {
          isBot: !isDeveloperTool,
          botName: rule.botName,
          operator: rule.operator,
          type: rule.type,
          confidence: isDeveloperTool ? 60 : 100,
          suspiciousScore: suspiciousScore,
          probableBot: isDeveloperTool,
          ruleId: rule.id,
          detectionReason: rule.detectionReason,
          reasons: [rule.detectionReason]
        };
      }
    }
  }

  // Check for suspicious patterns
  const suspicious = calculateSuspiciousScore(headers, cf, uaLower);

  return {
    isBot: suspicious.score >= 70,
    botName: null,
    operator: null,
    type: suspicious.score >= 70 ? 'Suspected Bot' : null,
    confidence: suspicious.score >= 70 ? suspicious.score : 100 - suspicious.score,
    suspiciousScore: suspicious.score,
    probableBot: suspicious.score >= 50 && suspicious.score < 70,
    reasons: suspicious.reasons
  };
}

function calculateSuspiciousScore(headers, cf, uaLower) {
  let score = 0;
  const reasons = [];

  if (!headers['accept-language']) { score += 30; reasons.push('No Accept-Language'); }
  if (!headers['accept-encoding']) { score += 20; reasons.push('No Accept-Encoding'); }
  if (!headers['cookie']) { score += 15; reasons.push('No cookies'); }
  if (uaLower.length < 50) { score += 25; reasons.push('Short user agent'); }
  if (!uaLower) { score += 40; reasons.push('No user agent'); }
  if (cf.isDataCenter) { score += 20; reasons.push('Data center IP'); }

  return { score: Math.min(score, 100), reasons };
}