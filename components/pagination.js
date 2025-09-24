// Shared pagination component (<50 lines)
import { CONSTANTS } from '../config/constants.js';

export function calculatePagination(totalItems, currentPage = 1) {
  const total = totalItems;
  const totalPages = Math.ceil(total / CONSTANTS.ITEMS_PER_PAGE);
  const page = Math.min(Math.max(1, currentPage), totalPages || 1);
  const startIndex = (page - 1) * CONSTANTS.ITEMS_PER_PAGE;
  const endIndex = startIndex + CONSTANTS.ITEMS_PER_PAGE;

  return {
    total,
    totalPages,
    currentPage: page,
    startIndex,
    endIndex,
    hasPrev: page > 1,
    hasNext: page < totalPages
  };
}

export function renderPagination(pagination, baseUrl, itemLabel = 'items') {
  if (pagination.totalPages <= 1) return '';

  const parts = [];
  parts.push('<div class="nav">');

  if (pagination.hasPrev) {
    parts.push(`<a href="${baseUrl}?page=${pagination.currentPage - 1}">← PREV</a>`);
  }

  parts.push(`<span>Page ${pagination.currentPage} of ${pagination.totalPages} (${pagination.total} ${itemLabel})</span>`);

  if (pagination.hasNext) {
    parts.push(`<a href="${baseUrl}?page=${pagination.currentPage + 1}">NEXT →</a>`);
  }

  parts.push('</div>');
  return parts.join('');
}

export function paginateItems(items, page = 1) {
  const pagination = calculatePagination(items.length, page);
  const paginatedItems = items.slice(pagination.startIndex, pagination.endIndex);
  return { items: paginatedItems, pagination };
}