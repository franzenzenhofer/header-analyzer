// JS Feature Detection Checklist Renderer (<50 lines)
import { renderChecklistUI } from './js-checklist-ui.js';
import { renderChecklistScript } from './js-checklist-script.js';

export function renderJSChecklist(requestId) {
  return renderChecklistUI() + renderChecklistScript(requestId);
}