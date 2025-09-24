// Empty JS detection component (<50 lines)
import { CONSTANTS } from '../config/constants.js';

export function renderEmptyJSDetection() {
  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
    <h2>JAVASCRIPT DETECTION</h2>
    <div><strong>Status:</strong> NO JS SUPPORTED</div>
    <div>JavaScript was not executed for this request</div>
    <ul>
      <li>Likely a bot, crawler, or API client</li>
      <li>JavaScript disabled in browser</li>
      <li>Server-side request (curl, wget, etc)</li>
    </ul>
  </div>`;
}