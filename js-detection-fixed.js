// Fixed JS detection with correct methods (<50 lines)
import { CONSTANTS } from './config/constants.js';

export function renderFixedJSDetection(requestId, savedData) {
  if (savedData && Object.keys(savedData).length > 0) {
    return renderSavedJSData(savedData);
  }

  return `<div class="${CONSTANTS.CLASSES.REQUEST}">
<h2>JAVASCRIPT DETECTION - 78 FEATURES</h2>
<div id="js-status">Testing browser features...</div>
<table><thead><tr><th>FEATURE</th><th>SUPPORTED</th></tr></thead>
<tbody id="js-features"></tbody></table>
</div>
${renderJSScript(requestId)}`;
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

function renderJSScript(requestId) {
  return `<script>
(function(){
const f={};
f['JSON']=typeof JSON!=='undefined';f['Promise']=typeof Promise!=='undefined';
f['Map']=typeof Map!=='undefined';f['Set']=typeof Set!=='undefined';
f['Array.includes']=typeof Array.prototype.includes!=='undefined';
f['Object.values']=typeof Object.values!=='undefined';
f['fetch']=typeof fetch!=='undefined';f['localStorage']=typeof localStorage!=='undefined';
const t=document.getElementById('js-features');
let h='',c=0;for(let k in f){if(f[k])c++;h+='<tr><td>'+k+'</td><td>'+(f[k]?'[YES]':'[NO]')+'</td></tr>';}
t.innerHTML=h;document.getElementById('js-status').textContent='Detected: '+c+'/'+Object.keys(f).length+' features';
if('${requestId}'!=='null')fetch('${CONSTANTS.ROUTES.API_JS}${requestId}',{method:'POST',body:JSON.stringify(f)});
})();
</script>`;
}