// Bots page generator (<50 lines)
import { generateListPage } from './unified-list.js';
import { CONSTANTS } from '../config/constants.js';

export function generateBotsPage(requestHistory, page = 1) {
  return generateListPage(
    requestHistory,
    page,
    '', // No text filter for bots page
    'BOT DETECTION',
    r => r.bot.isBot || r.bot.probableBot ||
         r.bot.suspiciousScore >= CONSTANTS.SUSPICIOUS_THRESHOLD
  );
}