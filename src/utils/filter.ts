import type { HeaderEntry, FilterOptions } from '../types';

export function filterEntries(
  entries: HeaderEntry[],
  options: FilterOptions
): HeaderEntry[] {
  let filtered = [...entries];

  if (options.userAgent) {
    const searchTerm = options.userAgent.toLowerCase();
    filtered = filtered.filter(e =>
      e.userAgent.toLowerCase().includes(searchTerm)
    );
  }

  if (options.botType) {
    filtered = filtered.filter(e =>
      e.botType === options.botType
    );
  }

  if (options.dateFrom) {
    filtered = filtered.filter(e =>
      e.timestamp >= options.dateFrom!
    );
  }

  if (options.dateTo) {
    filtered = filtered.filter(e =>
      e.timestamp <= options.dateTo!
    );
  }

  return filtered;
}

export function getBotTypes(entries: HeaderEntry[]): string[] {
  const types = new Set<string>();
  entries.forEach(e => {
    if (e.botType) types.add(e.botType);
  });
  return Array.from(types).sort();
}