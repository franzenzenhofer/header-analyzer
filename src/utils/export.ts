export function exportData(data: any[]): void {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `headers-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV(data: any[]): void {
  const headers = ['Timestamp', 'IP', 'Method', 'Path', 'Bot Type', 'Country'];
  const rows = data.map(d => [
    new Date(d.timestamp).toISOString(),
    d.ip,
    d.method,
    d.path,
    d.botType,
    d.cf?.country || 'Unknown'
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(r => r.map(v => `"${v}"`).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `headers-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}