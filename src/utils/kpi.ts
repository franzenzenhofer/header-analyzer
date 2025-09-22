export function updateKPIs(data: any[]): void {
  const total = data.length;
  const ips = data.map(r => r.network?.ip || r.ip || 'Unknown');
  const uniqueIPs = new Set(ips.filter(ip => ip !== 'Unknown')).size;
  const bots = data.filter(r => r.botInfo?.isBot === true).length;
  const botPercent = total > 0 ? Math.round((bots / total) * 100) : 0;

  const el = (id: string): HTMLElement | null => document.getElementById(id);

  if (el('total-requests')) el('total-requests')!.textContent = total.toString();
  if (el('unique-visitors')) el('unique-visitors')!.textContent = uniqueIPs.toString();
  if (el('bot-percentage')) el('bot-percentage')!.textContent = `${botPercent}%`;
}