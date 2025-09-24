// History page generator (<50 lines)
import { generateListPage } from './unified-list.js';

export function generateHistoryPage(requestHistory, page = 1, filter = '') {
  return generateListPage(
    requestHistory,
    page,
    filter,
    'REQUEST HISTORY',
    null // No filter function, uses text search
  );
}