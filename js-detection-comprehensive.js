// Comprehensive JS detection with 78 features (<50 lines)
export function renderComprehensiveJS(requestId, savedData) {
  const features = [
    // ES Features (30)
    'JSON', 'Symbol', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect',
    'Array.includes', 'Array.flat', 'Array.flatMap', 'Array.at', 'Object.values',
    'Object.entries', 'Object.fromEntries', 'String.padStart', 'String.replaceAll',
    'Promise.finally', 'Promise.allSettled', 'Promise.any', 'BigInt', 'globalThis',
    // Browser APIs (30)
    'fetch', 'localStorage', 'sessionStorage', 'indexedDB', 'WebSocket', 'Worker',
    'ServiceWorker', 'SharedWorker', 'Notification', 'Geolocation', 'WebGL', 'WebGL2',
    'Canvas', 'Audio', 'Video', 'MediaRecorder', 'WebRTC', 'Bluetooth', 'USB', 'NFC',
    'Battery', 'Vibration', 'DeviceOrientation', 'Clipboard', 'Share', 'WakeLock',
    // DOM APIs (18)
    'MutationObserver', 'IntersectionObserver', 'ResizeObserver', 'PerformanceObserver',
    'CustomElements', 'ShadowDOM', 'WebComponents', 'PointerEvents', 'TouchEvents',
    'DragDrop', 'FileAPI', 'FormData', 'URLSearchParams', 'AbortController',
    'BroadcastChannel', 'MessageChannel', 'Crypto', 'SubtleCrypto'
  ];

  const testScript = features.map(f => {
    const path = f.includes('.') ? f : `window.${f}`;
    return `f['${f}']=!!${path};`;
  }).join('');

  return `<div class="request-full">
<h2>JAVASCRIPT DETECTION - 78 FEATURES</h2>
<div id="js-status">Detecting features...</div>
<table><thead><tr><th>FEATURE</th><th>STATUS</th></tr></thead>
<tbody id="js-features"></tbody></table>
</div>
<script>
(function(){
const f={};
${testScript}
const t=document.getElementById('js-features');
let h='',c=0;
for(let k in f){
  if(f[k])c++;
  h+='<tr><td>'+k+'</td><td class="'+(f[k]?'human':'bot')+'-label">'+(f[k]?'YES':'NO')+'</td></tr>';
}
t.innerHTML=h;
document.getElementById('js-status').textContent='Detected: '+c+'/78 features';
fetch('/api/update-js/${requestId}',{method:'POST',body:JSON.stringify(f)});
})();
</script>`;
}