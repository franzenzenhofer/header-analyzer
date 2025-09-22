// Simple main.ts - just show all data
interface RequestData {
  [key: string]: any;
  threatScore?: {
    score: number;
    level: string;
  };
}

let allRequestData: RequestData[] = [];

async function init(): Promise<void> {
  await captureCurrentRequest();
  setInterval(captureRequest, 2000);
}

async function captureCurrentRequest(): Promise<void> {
  try {
    const response = await fetch('/api/capture');
    const data = await response.json() as RequestData;
    displayCurrent(data);
  } catch (error) {
    console.error('Failed:', error);
  }
}

async function captureRequest(): Promise<void> {
  try {
    const response = await fetch('/api/capture');
    const data = await response.json() as RequestData;
    allRequestData.unshift(data);
    if (allRequestData.length > 100) {
      allRequestData = allRequestData.slice(0, 100);
    }
    addToHistory(data);
    updateStats();
  } catch (error) {
    console.error('Failed:', error);
  }
}

function displayCurrent(data: RequestData): void {
  const el = document.getElementById('current-data');
  if (el) el.textContent = JSON.stringify(data, null, 2);
}

function addToHistory(data: RequestData): void {
  const el = document.getElementById('history-data');
  if (!el) return;
  const pre = document.createElement('pre');
  pre.textContent = JSON.stringify(data, null, 2);
  el.insertBefore(pre, el.firstChild);
}

function updateStats(): void {
  const total = document.getElementById('stat-total');
  const ips = document.getElementById('stat-ips');
  const bots = document.getElementById('stat-bots');

  if (total) total.textContent = allRequestData.length.toString();
  if (ips) {
    const unique = new Set(allRequestData.map(r => r['network']?.['ip'] || r['ip'] || 'Unknown'));
    ips.textContent = unique.size.toString();
  }
  if (bots) {
    const botCount = allRequestData.filter(r => r['botInfo']?.['isBot'] === true).length;
    bots.textContent = botCount.toString();
  }
}

document.addEventListener('DOMContentLoaded', init);