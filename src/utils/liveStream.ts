export function addToLiveStream(data: any): void {
  const container = document.getElementById('live-entries');
  if (!container) return;

  const entry = document.createElement('div');
  entry.className = 'live-entry fade-in';
  entry.innerHTML = createFullDataHTML(data);

  container.insertBefore(entry, container.firstChild);

  while (container.children.length > 5) {
    container.removeChild(container.lastChild!);
  }
}

function createFullDataHTML(data: any): string {
  const threatColor = data.threatScore?.level === 'HIGH' ? '#ff0000' :
                     data.threatScore?.level === 'MEDIUM' ? '#ffaa00' : '#00ff00';

  return `
    <div style="border: 1px solid ${threatColor}; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.5rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <strong>${data.method} ${data.path}</strong>
        <span>BOT: ${data.botInfo?.type || 'Unknown'} | THREAT: ${data.threatScore?.score || 0}</span>
      </div>
      <pre style="background: #000; color: #00ff00; padding: 1rem; border-radius: 0.5rem;
                  overflow-x: auto; font-family: monospace; font-size: 0.75rem;">
${JSON.stringify(data, null, 2)}
      </pre>
    </div>
  `;
}