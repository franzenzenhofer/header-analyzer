// Shared bot label component (<50 lines)
import { CONSTANTS } from '../config/constants.js';

export function getBotLabel(bot) {
  if (bot.isBot) {
    return {
      text: CONSTANTS.LABELS.BOT,
      class: CONSTANTS.CLASSES.BOT
    };
  }
  if (bot.suspiciousScore >= CONSTANTS.PROBABLE_BOT_THRESHOLD) {
    return {
      text: CONSTANTS.LABELS.BOT,
      class: CONSTANTS.CLASSES.BOT
    };
  }
  if (bot.suspiciousScore >= CONSTANTS.SUSPICIOUS_THRESHOLD) {
    return {
      text: CONSTANTS.LABELS.MAYBE_BOT,
      class: CONSTANTS.CLASSES.MAYBE_BOT
    };
  }
  return {
    text: CONSTANTS.LABELS.HUMAN,
    class: CONSTANTS.CLASSES.HUMAN
  };
}

export function renderBotLabel(bot) {
  const label = getBotLabel(bot);
  return `<span class="${label.class}">${label.text}</span>`;
}

export function renderBotLabelFromRequest(request) {
  return renderBotLabel(request.bot);
}