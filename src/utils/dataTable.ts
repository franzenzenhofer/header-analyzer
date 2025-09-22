export function updateTable(data: any): void {
  const tbody = document.getElementById('table-body') as HTMLTableSectionElement;
  if (!tbody) return;

  const row = tbody.insertRow(0);
  row.innerHTML = createRowHTML(data);

  // Store for details
  (window as any)[`request_${data.requestId}`] = data;

  while (tbody.rows.length > 100) {
    tbody.deleteRow(tbody.rows.length - 1);
  }
}

function createRowHTML(data: any): string {
  return `
    <td>${new Date(data.timestamp).toLocaleTimeString()}</td>
    <td>${data.ip}</td>
    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">
      ${data.userAgent}
    </td>
    <td>
      <span style="padding: 0.25rem 0.5rem; background: var(--accent);
                   border-radius: 0.25rem; font-size: 0.75rem;">
        ${data.botType}
      </span>
    </td>
    <td>${data.method}</td>
    <td>200</td>
    <td><button onclick="showDetails('${data.requestId}')">Details</button></td>
  `;
}