// Complete JS detection with all 78 features (<50 lines)
import { CONSTANTS } from './config/constants.js';

export function renderJS78Detection(requestId, savedData) {
  if (savedData && Object.keys(savedData).length > 0) {
    return renderSavedJSData(savedData);
  }

  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
<h2>JAVASCRIPT DETECTION - 78 FEATURES</h2>
<div id="js-status">Testing browser features...</div>
<table><thead><tr><th>FEATURE</th><th>SUPPORTED</th></tr></thead>
<tbody id="js-features"></tbody></table>
</div>
${renderJS78Script(requestId)}`;
}

function renderSavedJSData(data) {
  const total = Object.keys(data).length;
  const supported = Object.values(data).filter(v => v).length;

  let rows = '';
  for (const [key, value] of Object.entries(data)) {
    rows += `<tr><td>${key}</td><td>${value ? '[YES]' : '[NO]'}</td></tr>`;
  }

  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
<h2>JAVASCRIPT DETECTION - ${total} FEATURES</h2>
<div>Detected: ${supported}/${total} features</div>
<table><thead><tr><th>FEATURE</th><th>SUPPORTED</th></tr></thead>
<tbody>${rows}</tbody></table>
</div>`;
}

function renderJS78Script(requestId) {
  return `<script>
(function(){
const f={};
// Core JS - 10
f['JSON']=typeof JSON!=='undefined';f['Promise']=typeof Promise!=='undefined';f['Symbol']=typeof Symbol!=='undefined';f['Proxy']=typeof Proxy!=='undefined';f['Reflect']=typeof Reflect!=='undefined';f['Map']=typeof Map!=='undefined';f['Set']=typeof Set!=='undefined';f['WeakMap']=typeof WeakMap!=='undefined';f['WeakSet']=typeof WeakSet!=='undefined';f['BigInt']=typeof BigInt!=='undefined';
// Array/Object - 8
f['Array.from']=typeof Array.from!=='undefined';f['Array.includes']=typeof Array.prototype.includes!=='undefined';f['Array.find']=typeof Array.prototype.find!=='undefined';f['Array.findIndex']=typeof Array.prototype.findIndex!=='undefined';f['Object.assign']=typeof Object.assign!=='undefined';f['Object.values']=typeof Object.values!=='undefined';f['Object.entries']=typeof Object.entries!=='undefined';f['Object.fromEntries']=typeof Object.fromEntries!=='undefined';
// String - 5
f['String.padStart']=typeof String.prototype.padStart!=='undefined';f['String.padEnd']=typeof String.prototype.padEnd!=='undefined';f['String.includes']=typeof String.prototype.includes!=='undefined';f['String.startsWith']=typeof String.prototype.startsWith!=='undefined';f['String.endsWith']=typeof String.prototype.endsWith!=='undefined';
// Browser APIs - 15
f['fetch']=typeof fetch!=='undefined';f['localStorage']=typeof localStorage!=='undefined';f['sessionStorage']=typeof sessionStorage!=='undefined';f['IndexedDB']=typeof indexedDB!=='undefined';f['Cookies']= navigator.cookieEnabled;f['ServiceWorker']='serviceWorker'in navigator;f['WebWorker']=typeof Worker!=='undefined';f['SharedWorker']=typeof SharedWorker!=='undefined';f['WebSocket']=typeof WebSocket!=='undefined';f['WebRTC']=typeof RTCPeerConnection!=='undefined';f['WebGL']=!!document.createElement('canvas').getContext('webgl');f['WebGL2']=!!document.createElement('canvas').getContext('webgl2');f['Canvas']=!!document.createElement('canvas').getContext;f['Audio']=!!document.createElement('audio').canPlayType;f['Video']=!!document.createElement('video').canPlayType;
// Media/Device - 10
f['MediaRecorder']=typeof MediaRecorder!=='undefined';f['Geolocation']='geolocation'in navigator;f['DeviceOrientation']='DeviceOrientationEvent'in window;f['DeviceMotion']='DeviceMotionEvent'in window;f['Vibration']='vibrate'in navigator;f['Battery']='getBattery'in navigator;f['Bluetooth']='bluetooth'in navigator;f['USB']='usb'in navigator;f['Notification']='Notification'in window;f['Clipboard']=navigator.clipboard!==undefined;
// DOM/Events - 10
f['MutationObserver']=typeof MutationObserver!=='undefined';f['IntersectionObserver']=typeof IntersectionObserver!=='undefined';f['ResizeObserver']=typeof ResizeObserver!=='undefined';f['PerformanceObserver']=typeof PerformanceObserver!=='undefined';f['CustomElements']=typeof customElements!=='undefined';f['ShadowDOM']=!!document.createElement('div').attachShadow;f['PointerEvents']=typeof PointerEvent!=='undefined';f['TouchEvents']='ontouchstart'in window;f['DragDrop']='ondragstart'in document.createElement('div');f['Fullscreen']='requestFullscreen'in document.documentElement;
// Network/Comm - 10
f['XMLHttpRequest']=typeof XMLHttpRequest!=='undefined';f['FormData']=typeof FormData!=='undefined';f['URLSearchParams']=typeof URLSearchParams!=='undefined';f['AbortController']=typeof AbortController!=='undefined';f['BroadcastChannel']=typeof BroadcastChannel!=='undefined';f['MessageChannel']=typeof MessageChannel!=='undefined';f['EventSource']=typeof EventSource!=='undefined';f['PushManager']='PushManager'in window;f['PaymentRequest']=typeof PaymentRequest!=='undefined';f['Share']=navigator.share!==undefined;
// Security/Crypto - 5
f['Crypto']=typeof crypto!=='undefined';f['SubtleCrypto']=typeof crypto!=='undefined'&&crypto.subtle!==undefined;f['CSP']='SecurityPolicyViolationEvent'in window;f['SRI']='integrity'in document.createElement('link');f['WebAuthn']='credentials'in navigator&&navigator.credentials.create;
// Performance - 5
f['Performance']=typeof performance!=='undefined';f['PerformanceNavigation']=typeof performance!=='undefined'&&performance.navigation!==undefined;f['PerformanceTiming']=typeof performance!=='undefined'&&performance.timing!==undefined;f['requestAnimationFrame']=typeof requestAnimationFrame!=='undefined';f['requestIdleCallback']=typeof requestIdleCallback!=='undefined';
// Display results
const t=document.getElementById('js-features');
let h='',c=0;for(let k in f){if(f[k])c++;h+='<tr><td>'+k+'</td><td>'+(f[k]?'[YES]':'[NO]')+'</td></tr>';}
t.innerHTML=h;document.getElementById('js-status').textContent='Detected: '+c+'/'+Object.keys(f).length+' features';
if('${requestId}'!=='null')fetch('${CONSTANTS.ROUTES.API_JS}${requestId}',{method:'POST',body:JSON.stringify(f)});
})();
</script>`;
}