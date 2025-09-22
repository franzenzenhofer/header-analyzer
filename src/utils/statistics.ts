import type { HeaderEntry, Statistics } from '../types';

export function calculateStatistics(entries: HeaderEntry[]): Statistics {
  const uniqueIPs = new Set(entries.map(e => e.ip));
  const botTypes: Record<string, number> = {};
  const userAgentCounts: Record<string, number> = {};
  const hourCounts: Record<string, number> = {};

  entries.forEach(entry => {
    if (entry.botType) {
      botTypes[entry.botType] = (botTypes[entry.botType] || 0) + 1;
    }

    userAgentCounts[entry.userAgent] = (userAgentCounts[entry.userAgent] || 0) + 1;

    const hour = new Date(entry.timestamp).toISOString().slice(0, 13);
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  const topUserAgents = Object.entries(userAgentCounts)
    .map(([agent, count]) => ({ agent, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const requestsPerHour = Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour, count }))
    .sort((a, b) => a.hour.localeCompare(b.hour))
    .slice(-24);

  return {
    totalRequests: entries.length,
    uniqueIPs: uniqueIPs.size,
    botTypes,
    topUserAgents,
    requestsPerHour
  };
}