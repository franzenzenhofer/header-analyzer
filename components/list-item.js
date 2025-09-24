// Shared list item renderer with rich details (<50 lines)
import { renderBotLabel } from './bot-label.js';
import { CONSTANTS } from '../config/constants.js';

export function renderListItem(req) {
  const ua = req.headers['user-agent'] || 'No User Agent';
  const headline = getHeadline(req, ua);
  const readableTime = formatReadableTime(req.timestamp);
  const location = req.geo ? `${req.geo.city || '?'}, ${req.geo.country || '?'}` : '';

  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
    <div>
      <a href="${CONSTANTS.ROUTES.REQUEST}${req.id}"><strong>${headline}</strong></a>
      ${renderBotLabel(req.bot)}
    </div>
    <div>
      <strong>${readableTime}</strong> | IP: ${req.network.ip}${location ? ` | ${location}` : ''}
    </div>
    <div style="font-size: 14px !important; color: #666 !important;">
      ${ua.slice(0, 100)}${ua.length > 100 ? '...' : ''}
    </div>
  </div>`;
}

function getHeadline(req, ua) {
  if (req.bot.isBot && req.bot.operator)
    return `${req.bot.operator} ${req.bot.botName || 'Bot'}`;
  if (req.bot.probableBot && req.bot.operator)
    return `${req.bot.operator} (Maybe Bot)`;

  const browser = ua.includes('Chrome') ? 'Chrome' :
    ua.includes('Firefox') ? 'Firefox' :
    ua.includes('Safari') ? 'Safari' : 'Browser';
  const os = ua.includes('Windows') ? 'Windows' :
    ua.includes('Mac') ? 'macOS' :
    ua.includes('Linux') ? 'Linux' : 'OS';
  return `${browser} on ${os}`;
}

function formatReadableTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const mins = Math.floor((now - date) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)} hours ago`;
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}