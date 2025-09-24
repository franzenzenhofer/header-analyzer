// Unified list page generator (<50 lines)
import { renderHTMLStart, renderHTMLEnd } from '../components/html-head.js';
import { renderNavigation } from '../components/navigation.js';
import { renderListItem } from '../components/list-item.js';
import { paginateItems, renderPagination } from '../components/pagination.js';
import { CONSTANTS } from '../config/constants.js';

export function generateListPage(requestHistory, page = 1, filter = '', title, filterFunc) {
  const filtered = filterFunc ?
    requestHistory.filter(filterFunc) :
    filter ?
      requestHistory.filter(r =>
        JSON.stringify(r).toLowerCase().includes(filter.toLowerCase())
      ) : requestHistory;

  const { items, pagination } = paginateItems(filtered, page);
  const baseUrl = filterFunc ? CONSTANTS.ROUTES.BOTS : CONSTANTS.ROUTES.HISTORY;

  return renderHTMLStart(title) +
    `<h1>${title} - ${pagination.total} ITEMS</h1>` +
    renderNavigation() +
    renderFilterIfNeeded(filter, !filterFunc) +
    renderPagination(pagination, baseUrl, 'items') +
    renderItemList(items) +
    renderPagination(pagination, baseUrl, 'items') +
    renderHTMLEnd();
}

function renderFilterIfNeeded(filter, showFilter) {
  if (!showFilter) return '';
  return `<div class="nav">
    <form method="GET" action="${CONSTANTS.ROUTES.HISTORY}" style="display:inline;">
      <input name="filter" value="${filter}" placeholder="Search...">
      <button type="submit">SEARCH</button>
    </form>
  </div>`;
}

function renderItemList(items) {
  if (items.length === 0) {
    return '<div class="request-full">No items found</div>';
  }
  return items.map(item => renderListItem(item)).join('');
}