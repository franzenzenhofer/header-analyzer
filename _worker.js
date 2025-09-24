var A={bots:[{id:"googlebot-desktop",operator:"Google",botName:"Googlebot Desktop",type:"Search Engine",patterns:["compatible; Googlebot/2.1","Googlebot/2.1"],url:"https://www.google.com/bot.html",detectionReason:"Google's main search crawler for desktop content indexing"},{id:"googlebot-smartphone",operator:"Google",botName:"Googlebot Smartphone",type:"Search Engine",patterns:["Android","Mobile Safari","compatible; Googlebot/2.1"],url:"https://www.google.com/bot.html",detectionReason:"Google's mobile search crawler for smartphone content"},{id:"googlebot-image",operator:"Google",botName:"Googlebot-Image",type:"Search Engine",patterns:["Googlebot-Image/","compatible; Googlebot-Image"],url:"https://www.google.com/bot.html",detectionReason:"Google Images crawler for image search indexing"},{id:"googlebot-video",operator:"Google",botName:"Googlebot-Video",type:"Search Engine",patterns:["Googlebot-Video/"],url:"https://www.google.com/bot.html",detectionReason:"Google Video crawler for video search results"},{id:"googlebot-news",operator:"Google",botName:"Googlebot-News",type:"Search Engine",patterns:["Googlebot-News"],url:"https://www.google.com/bot.html",detectionReason:"Google News crawler for news content aggregation"},{id:"google-inspection-tool",operator:"Google",botName:"Google-InspectionTool",type:"Search Testing",patterns:["Google-InspectionTool/","compatible; Google-InspectionTool"],url:"https://www.google.com/bot.html",detectionReason:"Search Console URL inspection tool for testing site accessibility"},{id:"googleother",operator:"Google",botName:"GoogleOther",type:"Generic Crawler",patterns:["GoogleOther","compatible; GoogleOther"],url:"https://www.google.com/bot.html",detectionReason:"Generic Google crawler for miscellaneous crawling tasks"},{id:"google-extended",operator:"Google",botName:"Google-Extended",type:"AI Training",patterns:["Google-Extended/","compatible; Google-Extended"],url:"https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers",detectionReason:"AI training crawler for Google's Bard and generative AI models"},{id:"storebot-google",operator:"Google",botName:"Storebot-Google",type:"Shopping",patterns:["Storebot-Google/"],url:"https://www.google.com/bot.html",detectionReason:"Google Shopping crawler for product information and pricing"},{id:"adsbot-google",operator:"Google",botName:"AdsBot-Google",type:"Ads Quality",patterns:["AdsBot-Google/","AdsBot-Google-Mobile"],url:"https://www.google.com/bot.html",detectionReason:"Google Ads quality checker for landing page validation"},{id:"openai-gptbot",operator:"OpenAI",botName:"GPTBot",type:"AI Training",patterns:["GPTBot/","compatible; GPTBot"],url:"https://openai.com/gptbot",detectionReason:"AI training crawler for OpenAI's GPT language models"},{id:"openai-searchbot",operator:"OpenAI",botName:"OAI-SearchBot",type:"AI Search",patterns:["OAI-SearchBot/","compatible; OAI-SearchBot"],url:"https://openai.com/searchbot",detectionReason:"AI search crawler for OpenAI's ChatGPT search functionality"},{id:"openai-chatgpt-user",operator:"OpenAI",botName:"ChatGPT-User",type:"AI Assistant",patterns:["ChatGPT-User/","ChatGPT/"],url:"https://openai.com",detectionReason:"ChatGPT web browsing tool for user-requested content retrieval"},{id:"anthropic-claude",operator:"Anthropic",botName:"ClaudeBot",type:"AI Training",patterns:["ClaudeBot/","compatible; ClaudeBot","claudebot@anthropic.com"],url:"claudebot@anthropic.com",detectionReason:"AI training crawler for Anthropic's Claude language models"},{id:"anthropic-claude-web",operator:"Anthropic",botName:"Claude-Web",type:"AI Assistant",patterns:["Claude-Web/","claude-web","Claude-User"],url:"https://anthropic.com",detectionReason:"Claude web browsing tool for user-requested content analysis"},{id:"perplexity-bot",operator:"Perplexity AI",botName:"PerplexityBot",type:"AI Search",patterns:["PerplexityBot/","compatible; PerplexityBot"],url:"https://perplexity.ai/bot",detectionReason:"AI search crawler for Perplexity's real-time information retrieval"},{id:"perplexity-user",operator:"Perplexity AI",botName:"Perplexity-User",type:"AI Assistant",patterns:["Perplexity-User/","compatible; Perplexity-User"],url:"https://perplexity.ai/bot",detectionReason:"Perplexity AI assistant for user-requested web content analysis"},{id:"bing-bot",operator:"Microsoft",botName:"Bingbot",type:"Search Engine",patterns:["bingbot/","msnbot/","BingPreview/","compatible; bingbot"],url:"https://www.bing.com/bingbot.htm",detectionReason:"Microsoft Bing search crawler for web content indexing"},{id:"duckduckgo",operator:"DuckDuckGo",botName:"DuckDuckBot",type:"Search Engine",patterns:["DuckDuckBot/","DuckDuckGo/","compatible; DuckDuckBot"],url:"https://duckduckgo.com/duckduckbot",detectionReason:"DuckDuckGo privacy-focused search crawler for web indexing"},{id:"meta-external",operator:"Meta",botName:"Meta-ExternalAgent",type:"AI Training",patterns:["Meta-ExternalAgent/","facebookexternalhit/","FacebookBot"],url:"https://developers.facebook.com/docs/sharing/webmasters/crawler",detectionReason:"AI training crawler for Meta's Llama and social media models"},{id:"amazon-bot",operator:"Amazon",botName:"Amazonbot",type:"AI/Commerce",patterns:["Amazonbot/","compatible; Amazonbot"],url:"https://developer.amazon.com/amazonbot",detectionReason:"AI training crawler for Amazon's Alexa and machine learning models"},{id:"bytedance",operator:"ByteDance",botName:"Bytespider",type:"AI Training",patterns:["Bytespider","ByteDance"],url:"https://bytedance.com",detectionReason:"AI training crawler for ByteDance's TikTok and recommendation algorithms"},{id:"apple-bot",operator:"Apple",botName:"Applebot",type:"Search Engine",patterns:["Applebot/","compatible; Applebot"],url:"https://support.apple.com/en-us/119829",detectionReason:"Apple Siri search crawler for web content and knowledge indexing"},{id:"apple-bot-extended",operator:"Apple",botName:"Applebot-Extended",type:"AI Training",patterns:["Applebot-Extended/"],url:"https://support.apple.com/en-us/119829",detectionReason:"AI training crawler for Apple's machine learning and AI models"},{id:"yandex",operator:"Yandex",botName:"YandexBot",type:"Search Engine",patterns:["YandexBot/","YandexImages/","YandexVideo/","YandexMedia/"],url:"https://yandex.com/support/webmaster/robot-workings/check-yandex-robots.html",detectionReason:"Yandex search crawler for Russian and CIS region web indexing"},{id:"baidu",operator:"Baidu",botName:"Baiduspider",type:"Search Engine",patterns:["Baiduspider/","Baiduspider-image","Baiduspider-video","Baiduspider-news"],url:"https://www.baidu.com/search/robots_english.html",detectionReason:"Baidu search crawler for Chinese web content and multimedia indexing"},{id:"semrush",operator:"SEMrush",botName:"SEMrushBot",type:"SEO Tool",patterns:["SemrushBot/","SemrushBot-SA","SemrushBot-BA","SemrushBot-BM"],url:"https://www.semrush.com/bot/",detectionReason:"SEO analysis tool for keyword research and competitive intelligence"},{id:"ahrefs",operator:"Ahrefs",botName:"AhrefsBot",type:"SEO Tool",patterns:["AhrefsBot/","AhrefsSiteAudit/"],url:"https://ahrefs.com/robot",detectionReason:"SEO analysis tool for backlink research and site auditing"},{id:"screaming-frog",operator:"Screaming Frog",botName:"Screaming Frog SEO Spider",type:"SEO Tool",patterns:["Screaming Frog SEO Spider"],url:"https://www.screamingfrog.co.uk/seo-spider/",detectionReason:"SEO analysis tool for technical site auditing and crawling"},{id:"slack",operator:"Slack",botName:"Slackbot",type:"Social/Preview",patterns:["Slackbot-LinkExpanding","Slackbot-ImgProxy","Slack-ImgProxy","Slackbot/"],url:"https://api.slack.com/robots",detectionReason:"Link preview generator for Slack team communication platform"},{id:"discord",operator:"Discord",botName:"Discordbot",type:"Social/Preview",patterns:["Discordbot/","Mozilla/5.0 (compatible; Discordbot"],url:"https://discord.com/developers/docs/resources/user#user-object",detectionReason:"Link preview generator for Discord gaming and community platform"},{id:"telegram",operator:"Telegram",botName:"TelegramBot",type:"Social/Preview",patterns:["TelegramBot","Telegram-Bot"],url:"https://core.telegram.org/bots",detectionReason:"Link preview generator for Telegram messaging platform"},{id:"whatsapp",operator:"WhatsApp",botName:"WhatsApp",type:"Social/Preview",patterns:["WhatsApp/","WhatsApp Bot","WhatsAppBot"],url:"https://developers.facebook.com/docs/whatsapp",detectionReason:"Link preview generator for WhatsApp messaging platform"},{id:"twitter",operator:"Twitter/X",botName:"Twitterbot",type:"Social/Preview",patterns:["Twitterbot/","X-Bot","compatible; Twitterbot"],url:"https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started",detectionReason:"Link preview generator for Twitter/X social media platform"},{id:"linkedin",operator:"LinkedIn",botName:"LinkedInBot",type:"Social/Preview",patterns:["LinkedInBot/","LinkedIn/"],url:"https://www.linkedin.com",detectionReason:"Link preview generator for LinkedIn professional networking platform"},{id:"pinterest",operator:"Pinterest",botName:"Pinterestbot",type:"Social/Preview",patterns:["Pinterest/","Pinterestbot/","compatible; Pinterestbot"],url:"https://help.pinterest.com/en/business/article/pinterest-crawler",detectionReason:"Link preview generator for Pinterest visual discovery platform"},{id:"curl",operator:"cURL",botName:"cURL",type:"Developer Tool",patterns:["curl/"],url:"https://curl.se/",detectionReason:"Command-line tool for transferring data and testing HTTP requests"},{id:"wget",operator:"GNU Wget",botName:"Wget",type:"Developer Tool",patterns:["Wget/"],url:"https://www.gnu.org/software/wget/",detectionReason:"Command-line tool for downloading files and mirroring websites"},{id:"python-requests",operator:"Python",botName:"Python-Requests",type:"Developer Tool",patterns:["python-requests/","Python-urllib/","python-httpx/"],url:"https://pypi.org/project/requests/",detectionReason:"Command-line tool for Python HTTP requests and web scraping"},{id:"postman",operator:"Postman",botName:"PostmanRuntime",type:"Developer Tool",patterns:["PostmanRuntime/"],url:"https://www.postman.com/",detectionReason:"Command-line tool for API testing and development workflows"},{id:"insomnia",operator:"Kong",botName:"Insomnia",type:"Developer Tool",patterns:["insomnia/"],url:"https://insomnia.rest/",detectionReason:"Command-line tool for REST API testing and GraphQL queries"},{id:"go-http",operator:"Go",botName:"Go-http-client",type:"Developer Tool",patterns:["Go-http-client/"],url:"https://golang.org/",detectionReason:"Command-line tool for Go programming language HTTP requests"},{id:"java",operator:"Java",botName:"Java HTTP Client",type:"Developer Tool",patterns:["Java/","Apache-HttpClient/","okhttp/"],url:"https://openjdk.java.net/",detectionReason:"Command-line tool for Java programming language HTTP operations"},{id:"node-fetch",operator:"Node.js",botName:"Node-Fetch",type:"Developer Tool",patterns:["node-fetch/","axios/"],url:"https://nodejs.org/",detectionReason:"Command-line tool for Node.js HTTP requests and web automation"},{id:"ruby",operator:"Ruby",botName:"Ruby HTTP Client",type:"Developer Tool",patterns:["Ruby","rest-client/"],url:"https://www.ruby-lang.org/",detectionReason:"Command-line tool for Ruby programming language HTTP requests"},{id:"mistral",operator:"Mistral AI",botName:"MistralAI",type:"AI Training",patterns:["MistralAI","Mistral-Bot"],url:"https://mistral.ai/",detectionReason:"AI training crawler for Mistral AI language models"},{id:"cohere",operator:"Cohere",botName:"Cohere-AI",type:"AI Training",patterns:["Cohere-Ai","CohereBot"],url:"https://cohere.ai/",detectionReason:"AI training crawler for Cohere language and embedding models"},{id:"huggingface",operator:"HuggingFace",botName:"HuggingFace-Bot",type:"AI Training",patterns:["HuggingFace-Bot","HuggingFaceBot"],url:"https://huggingface.co/",detectionReason:"AI training crawler for HuggingFace open-source machine learning models"},{id:"generic-bot",operator:"Unknown",botName:"Generic Bot",type:"Unknown Bot",patterns:["bot","spider","crawler","scraper","fetcher"],detectionReason:"Generic bot pattern for unidentified automated web crawlers"}]};function v(e,t={}){let o=(e["user-agent"]||"").toLowerCase();for(let i of A.bots)for(let s of i.patterns)if(o.includes(s.toLowerCase())){let p=i.type==="Developer Tool",g=p?60:0;return{isBot:!p,botName:i.botName,operator:i.operator,type:i.type,confidence:p?60:100,suspiciousScore:g,probableBot:p,ruleId:i.id,detectionReason:i.detectionReason,reasons:[i.detectionReason]}}let n=U(e,t,o);return{isBot:n.score>=70,botName:null,operator:null,type:n.score>=70?"Suspected Bot":null,confidence:n.score>=70?n.score:100-n.score,suspiciousScore:n.score,probableBot:n.score>=50&&n.score<70,reasons:n.reasons}}function U(e,t,a){let o=0,n=[];return e["accept-language"]||(o+=30,n.push("No Accept-Language")),e["accept-encoding"]||(o+=20,n.push("No Accept-Encoding")),e.cookie||(o+=15,n.push("No cookies")),a.length<50&&(o+=25,n.push("Short user agent")),a||(o+=40,n.push("No user agent")),t.isDataCenter&&(o+=20,n.push("Data center IP")),{score:Math.min(o,100),reasons:n}}function T(e,t){let a=new URL(e.url),o={};e.headers.forEach((s,p)=>o[p]=s);let n=e.cf||{},i={country:n.country||o["cf-ipcountry"],city:n.city,asn:n.asn,colo:n.colo};return{id:crypto.randomUUID(),timestamp:new Date().toISOString(),timestampMs:Date.now(),request:{method:e.method,url:e.url,path:a.pathname,host:a.host},headers:o,cookies:H(o.cookie),query:Object.fromEntries(a.searchParams),network:{ip:n.ip||o["cf-connecting-ip"]||o["x-forwarded-for"]||"unknown",country:i.country||"unknown",city:i.city||"unknown",asn:i.asn||"unknown"},geo:i,bot:v(o,n),cf:n}}function H(e){let t={};return e&&e.split(";").forEach(a=>{let[o,n]=a.trim().split("=");o&&(t[o]=n||"")}),t}function E(){return`
* { margin: 0; padding: 0; box-sizing: border-box; color: #000 !important; font-size: 16px !important; }
body { background: #fff; font: 16px/1.6 sans-serif; padding: 20px; }
h1, h2, h3, h4, h5, h6 { color: #000 !important; }
h1 { font-size: 32px !important; margin: 0 0 10px 0; border-bottom: 1px solid #a2a9b1; padding-bottom: 5px; }
h2 { font-size: 26px !important; margin: 20px 0 10px 0; border-bottom: 1px solid #a2a9b1; padding-bottom: 3px; }
h3 { font-size: 22px !important; margin: 15px 0 8px 0; }
h4 { font-size: 18px !important; margin: 10px 0 5px 0; font-weight: bold; }
a { color: #0645ad !important; text-decoration: underline !important; font-size: 16px !important; }
a:visited { color: #0b0080 !important; }
a:hover { text-decoration: underline !important; }
.nav { background: #fff; padding: 10px; border: 1px solid #a2a9b1; margin: 10px 0; }
.nav a { margin-right: 20px; color: #0645ad !important; }
div, span, p, td, th, li { color: #000 !important; font-size: 16px !important; }
.stats { background: #fff; margin: 10px 0; padding: 10px; border: 1px solid #a2a9b1; }
.request-full { margin: 10px 0; padding: 10px; border: 1px solid #a2a9b1; background: #fff; }
.request-full.current { border: 2px solid #a2a9b1; }
.key { display: inline-block; min-width: 120px; font-weight: bold; vertical-align: top; }
.value { word-wrap: break-word; overflow-wrap: break-word; display: inline-block; max-width: calc(100% - 130px); }
.sub { margin-left: 10px; padding-left: 10px; border-left: 1px solid #a2a9b1; }
.bot-label { background: #fff; border: 2px solid #000; padding: 2px 8px; font-weight: bold; }
.maybe-bot-label { background: #fff; border: 1px solid #000; padding: 2px 8px; }
.human-label { background: #fff; border: 1px solid #a2a9b1; padding: 2px 8px; }
pre { background: #f8f9fa; border: 1px solid #a2a9b1; padding: 10px; overflow-x: auto; font-family: monospace; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; }
th, td { border: 1px solid #a2a9b1; padding: 5px; text-align: left; }
th { background: #eaecf0; font-weight: bold; }
button { background: #fff; border: 1px solid #a2a9b1; padding: 5px 10px; cursor: pointer; font-size: 16px !important; }
input { background: #fff; border: 1px solid #a2a9b1; padding: 4px; font-size: 16px !important; }
#js-checklist { border: 1px solid #a2a9b1; padding: 15px; margin: 20px 0; background: #f8f9fa; }
@media (max-width: 600px) {
  body { padding: 10px; }
  h1 { font-size: 24px !important; }
  h2 { font-size: 20px !important; }
  h3 { font-size: 18px !important; }
  .nav a { margin-right: 10px; }
  .request-full { padding: 8px; margin: 8px 0; }
}`}function M(e="Header Analyzer",t=""){return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e}</title>
${t}
<style>${E()}</style>
</head>`}function l(e,t){return M(e,t)+"<body>"}function d(){return"</body></html>"}function c(e=0){return`<div class="nav">
  <a href="/">HOME</a>
  <a href="/history">HISTORY${e>0?` (${e})`:""}</a>
  <a href="/bots">BOTS</a>
  <a href="/stats">STATS</a>
  <a href="/download">DOWNLOAD</a>
</div>`}var r={ITEMS_PER_PAGE:50,MAX_HISTORY:500,SUSPICIOUS_THRESHOLD:50,PROBABLE_BOT_THRESHOLD:70,LABELS:{BOT:"BOT",MAYBE_BOT:"MAYBE BOT",HUMAN:"HUMAN",SUSPICIOUS:"SUSPICIOUS"},CLASSES:{BOT:"bot-label",MAYBE_BOT:"maybe-bot-label",HUMAN:"human-label",REQUEST:"request-full",NAV:"nav",SUB:"sub"},ROUTES:{HOME:"/",HISTORY:"/history",BOTS:"/bots",STATS:"/stats",DOWNLOAD:"/download",REQUEST:"/request/",API_JS:"/api/update-js/"},BOT_CATEGORIES:{AI:"AI",SEARCH:"Search",SOCIAL:"Social",SEO:"SEO",MONITORING:"Monitoring",DEVELOPER:"Developer"}};function G(e){return e.isBot?{text:r.LABELS.BOT,class:r.CLASSES.BOT}:e.suspiciousScore>=r.PROBABLE_BOT_THRESHOLD?{text:r.LABELS.BOT,class:r.CLASSES.BOT}:e.suspiciousScore>=r.SUSPICIOUS_THRESHOLD?{text:r.LABELS.MAYBE_BOT,class:r.CLASSES.MAYBE_BOT}:{text:r.LABELS.HUMAN,class:r.CLASSES.HUMAN}}function u(e){let t=G(e);return`<span class="${t.class}">${t.text}</span>`}function h(e,t){return t&&Object.keys(t).length>0?j(t):`<div class="${r.CLASSES.REQUEST}">
<h2>JAVASCRIPT DETECTION - 78 FEATURES</h2>
<div id="js-status">Testing browser features...</div>
<table><thead><tr><th>FEATURE</th><th>SUPPORTED</th></tr></thead>
<tbody id="js-features"></tbody></table>
</div>
${Y(e)}`}function j(e){let t=Object.keys(e).length,a=Object.values(e).filter(n=>n).length,o="";for(let[n,i]of Object.entries(e))o+=`<tr><td>${n}</td><td>${i?"[YES]":"[NO]"}</td></tr>`;return`<div class="${r.CLASSES.REQUEST}">
<h2>JAVASCRIPT DETECTION - ${t} FEATURES</h2>
<div>Detected: ${a}/${t} features</div>
<table><thead><tr><th>FEATURE</th><th>SUPPORTED</th></tr></thead>
<tbody>${o}</tbody></table>
</div>`}function Y(e){return`<script>
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
if('${e}'!=='null')fetch('${r.ROUTES.API_JS}${e}',{method:'POST',body:JSON.stringify(f)});
})();
<\/script>`}function f(e){let t=e.bot,a=e.headers.signature&&e.headers["signature-agent"];return`
  <div class="${r.CLASSES.REQUEST}">
    <h3>BOT DETECTION RESULT</h3>
    <div class="${r.CLASSES.SUB}">
      <div><strong>STATUS:</strong> ${u(t)}</div>
      <div><strong>CONFIDENCE:</strong> ${t.confidence}%</div>
      ${t.operator?`<div><strong>OPERATOR:</strong> ${t.operator}</div>`:""}
      ${t.botName?`<div><strong>BOT NAME:</strong> ${t.botName}</div>`:""}
      ${t.type?`<div><strong>TYPE:</strong> ${t.type}</div>`:""}
      ${a?J():""}
      ${_(t)}
    </div>
  </div>`}function _(e){return!e.isBot&&!e.probableBot?e.suspiciousScore===0?"<div><strong>WHY HUMAN:</strong> All expected browser headers present, normal behavior</div>":e.suspiciousScore<30?"<div><strong>WHY HUMAN:</strong> Mostly normal browser behavior</div>":`<div><strong>MINOR ISSUES:</strong>
        <ul>${e.reasons?e.reasons.map(t=>`<li>${t}</li>`).join(""):""}</ul>
        <div>But overall appears to be a regular browser</div>
      </div>`:!e.reasons||e.reasons.length===0?"":`<div><strong>WHY ${e.isBot?"BOT":"MAYBE BOT"}:</strong>
    <ul>${e.reasons.map(t=>`<li>${t}</li>`).join("")}</ul>
  </div>`}function J(){return`<div class="${r.CLASSES.BOT}"><strong>AI SIGNATURE DETECTED</strong></div>`}function b(e,t){return`<div class="request-full ${t?"current":""}">
    ${z(e)}${F(e)}${W(e)}${Q(e)}
  </div>`}function z(e){return`<div class="sub">
    <h4>REQUEST INFO</h4>
    <div class="sub">
      <div><span class="key">ID:</span> <span class="value">${e.id}</span></div>
      <div><span class="key">TIME:</span> <span class="value">${e.timestamp}</span></div>
      <div><span class="key">METHOD:</span> <span class="value">${e.method}</span></div>
      <div><span class="key">URL:</span> <span class="value">${e.url}</span></div>
      <div><span class="key">PATH:</span> <span class="value">${e.path}</span></div>
    </div>
  </div>`}function F(e){return`<h4>HEADERS (${e.headers?Object.keys(e.headers).length:0})</h4>
  <div class="sub">
    ${e.headers?Object.entries(e.headers).map(([a,o])=>`<div><span class="key">${a}:</span> <span class="value">${o}</span></div>`).join(""):"No headers"}
  </div>`}function W(e){return`<h4>NETWORK</h4>
  <div class="sub">
    <div><span class="key">IP:</span> <span class="value">${e.network?.ip||"unknown"}</span></div>
    <div><span class="key">TLS:</span> <span class="value">${e.network?.tlsVersion||"unknown"}</span></div>
    <div><span class="key">PROTOCOL:</span> <span class="value">${e.network?.protocol||"unknown"}</span></div>
  </div>`}function Q(e){let t=e.network||e.geo||{};return`<h4>LOCATION</h4>
  <div class="sub">
    <div><span class="key">COUNTRY:</span> <span class="value">${t.country||"unknown"}</span></div>
    <div><span class="key">CITY:</span> <span class="value">${t.city||"unknown"}</span></div>
    <div><span class="key">ASN:</span> <span class="value">${t.asn||"unknown"}</span></div>
  </div>`}function y(e,t){return l("Header Analyzer - FULL DATA")+"<h1>HEADER ANALYZER - CURRENT REQUEST ANALYSIS</h1>"+c(t.length)+V(e)+f(e)+b(e,!0)+h(e.id,e.jsData)+d()}function V(e){return`
    <h2><a href="${r.ROUTES.REQUEST}${e.id}">REQUEST ID: ${e.id}</a></h2>
    <div>
      <span>${e.timestamp}</span>
      <span>${e.network.ip}</span>
      ${u(e.bot)}
      <strong><a href="${r.ROUTES.REQUEST}${e.id}">[ VIEW FULL DETAILS ]</a></strong>
    </div>`}function x(e){let t=e.headers["user-agent"]||"No User Agent",a=X(e,t),o=K(e.timestamp),n=e.geo?`${e.geo.city||"?"}, ${e.geo.country||"?"}`:"";return`<div class="${r.CLASSES.REQUEST}">
    <div>
      <a href="${r.ROUTES.REQUEST}${e.id}"><strong>${a}</strong></a>
      ${u(e.bot)}
    </div>
    <div>
      <strong>${o}</strong> | IP: ${e.network.ip}${n?` | ${n}`:""}
    </div>
    <div style="font-size: 14px !important; color: #666 !important;">
      ${t.slice(0,100)}${t.length>100?"...":""}
    </div>
  </div>`}function X(e,t){if(e.bot.isBot&&e.bot.operator)return`${e.bot.operator} ${e.bot.botName||"Bot"}`;if(e.bot.probableBot&&e.bot.operator)return`${e.bot.operator} (Maybe Bot)`;let a=t.includes("Chrome")?"Chrome":t.includes("Firefox")?"Firefox":t.includes("Safari")?"Safari":"Browser",o=t.includes("Windows")?"Windows":t.includes("Mac")?"macOS":t.includes("Linux")?"Linux":"OS";return`${a} on ${o}`}function K(e){let t=new Date(e),o=Math.floor((new Date-t)/6e4);return o<1?"Just now":o<60?`${o} min ago`:o<1440?`${Math.floor(o/60)} hours ago`:t.toLocaleDateString()+" "+t.toLocaleTimeString()}function Z(e,t=1){let a=e,o=Math.ceil(a/r.ITEMS_PER_PAGE),n=Math.min(Math.max(1,t),o||1),i=(n-1)*r.ITEMS_PER_PAGE,s=i+r.ITEMS_PER_PAGE;return{total:a,totalPages:o,currentPage:n,startIndex:i,endIndex:s,hasPrev:n>1,hasNext:n<o}}function w(e,t,a="items"){if(e.totalPages<=1)return"";let o=[];return o.push('<div class="nav">'),e.hasPrev&&o.push(`<a href="${t}?page=${e.currentPage-1}">\u2190 PREV</a>`),o.push(`<span>Page ${e.currentPage} of ${e.totalPages} (${e.total} ${a})</span>`),e.hasNext&&o.push(`<a href="${t}?page=${e.currentPage+1}">NEXT \u2192</a>`),o.push("</div>"),o.join("")}function O(e,t=1){let a=Z(e.length,t);return{items:e.slice(a.startIndex,a.endIndex),pagination:a}}function S(e,t=1,a="",o,n){let i=n?e.filter(n):a?e.filter(L=>JSON.stringify(L).toLowerCase().includes(a.toLowerCase())):e,{items:s,pagination:p}=O(i,t),g=n?r.ROUTES.BOTS:r.ROUTES.HISTORY;return l(o)+`<h1>${o} - ${p.total} ITEMS</h1>`+c()+q(a,!n)+w(p,g,"items")+ee(s)+w(p,g,"items")+d()}function q(e,t){return t?`<div class="nav">
    <form method="GET" action="${r.ROUTES.HISTORY}" style="display:inline;">
      <input name="filter" value="${e}" placeholder="Search...">
      <button type="submit">SEARCH</button>
    </form>
  </div>`:""}function ee(e){return e.length===0?'<div class="request-full">No items found</div>':e.map(t=>x(t)).join("")}function R(e,t=1,a=""){return S(e,t,a,"REQUEST HISTORY",null)}function I(e){let t=te(e);return l("Statistics - Header Analyzer")+"<h1>STATISTICS</h1>"+c()+oe(t)+d()}function te(e){let t=e.length,a=e.filter(s=>s.bot.isBot).length,o=e.filter(s=>!s.bot.isBot&&s.bot.suspiciousScore>=r.SUSPICIOUS_THRESHOLD).length,n=t-a-o,i=new Set(e.map(s=>s.network.ip)).size;return{total:t,bots:a,humans:n,maybeBots:o,uniqueIPs:i,botPercent:t>0?Math.round(a/t*100):0,humanPercent:t>0?Math.round(n/t*100):0}}function oe(e){return`
    <div class="stats">
      <h2>Overview</h2>
      <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Total Requests</td><td>${e.total}</td></tr>
        <tr><td>Bots</td><td>${e.bots} (${e.botPercent}%)</td></tr>
        <tr><td>Humans</td><td>${e.humans} (${e.humanPercent}%)</td></tr>
        <tr><td>Maybe Bots</td><td>${e.maybeBots}</td></tr>
        <tr><td>Unique IPs</td><td>${e.uniqueIPs}</td></tr>
      </table>
    </div>`}function N(e,t=1){return S(e,t,"","BOT DETECTION",a=>a.bot.isBot||a.bot.probableBot||a.bot.suspiciousScore>=r.SUSPICIOUS_THRESHOLD)}function B(e,t){let a=re(e);return l("Download Data - Header Analyzer")+"<h1>DOWNLOAD DATA</h1>"+c()+ne(a,t)+d()}function re(e){return{total:e.length,bots:e.filter(t=>t.bot.isBot).length,humans:e.filter(t=>!t.bot.isBot&&t.bot.suspiciousScore<r.SUSPICIOUS_THRESHOLD).length}}function ne(e,t){return`
    <div class="stats">
      <h2>Available Data</h2>
      <p>Total Requests: ${e.total}</p>
      <p>Bots: ${e.bots}</p>
      <p>Humans: ${e.humans}</p>

      <h3>Download Options</h3>
      <ul>
        <li><a href="${r.ROUTES.DOWNLOAD}/json" download>Download as JSON</a></li>
        <li><a href="${r.ROUTES.DOWNLOAD}/csv" download>Download as CSV</a></li>
        <li><a href="${r.ROUTES.DOWNLOAD}/zip" download>Download as ZIP</a></li>
      </ul>

      <h3>Data Preview</h3>
      <pre>${JSON.stringify({currentRequest:t.id,totalRequests:e.total,latestTimestamp:t.timestamp},null,2)}</pre>
    </div>`}function P(){return`<div class="${r.CLASSES.REQUEST}">
    <h2>JAVASCRIPT DETECTION</h2>
    <div><strong>Status:</strong> NO JS SUPPORTED</div>
    <div>JavaScript was not executed for this request</div>
    <ul>
      <li>Likely a bot, crawler, or API client</li>
      <li>JavaScript disabled in browser</li>
      <li>Server-side request (curl, wget, etc)</li>
    </ul>
  </div>`}function $(e){let t=e.headers["user-agent"]||"None",a=e.headers.referer||e.headers.referrer||"Direct";return`<div class="${r.CLASSES.REQUEST}">
<h2>DETECTIVE ANALYSIS</h2>
<h3>Referrer Analysis</h3>
<div class="${r.CLASSES.SUB}">
  <div><strong>Source:</strong> ${ae(a)}</div>
  <div><strong>Full Referrer:</strong> ${a}</div>
</div>
<h3>Bot Detection Summary</h3>
<div class="${r.CLASSES.SUB}">
  <div><strong>Bot Probability:</strong> ${e.bot.suspiciousScore}%</div>
  <div><strong>Confidence:</strong> ${e.bot.confidence}%</div>
  ${e.bot.isBot?`<div><strong>Identified as:</strong> ${e.bot.operator||"Unknown"} ${e.bot.botName||""}</div>`:""}
  ${e.bot.probableBot?"<div><strong>Status:</strong> Probable Bot</div>":""}
</div>
${ie(e.bot)}
<h3>User Agent</h3>
<div class="${r.CLASSES.SUB}">
  <div style="word-wrap: break-word;">${t}</div>
</div>
</div>`}function ae(e){return e.includes("google")?"Google Search":e.includes("bing")?"Bing Search":e.includes("anthropic")?"Anthropic AI":e.includes("openai")?"OpenAI":e.includes("perplexity")?"Perplexity AI":e==="Direct"?"Direct Visit":"External Site"}function ie(e){return!e.reasons||e.reasons.length===0?"":`<h3>Suspicious Indicators</h3>
<div class="${r.CLASSES.SUB}">
  ${e.reasons.map(t=>`<div>- ${t}</div>`).join("")}
</div>`}function k(e){return l(`Request ${e.id} - FULL ANALYSIS`)+"<h1>REQUEST DETAILS - COMPREHENSIVE ANALYSIS</h1>"+c()+se(e)+f(e)+b(e,!0)+pe(e)+$(e)+le(e)+d()}function se(e){return`
    <h2>REQUEST ID: ${e.id}</h2>
    <div>
      <span>${e.timestamp}</span>
      <span>${e.network.ip}</span>
      ${u(e.bot)}
    </div>`}function pe(e){return e.jsData&&Object.keys(e.jsData).length>0?h(e.id,e.jsData):P()}function le(e){return`<h3>Raw JSON Data</h3><pre>${JSON.stringify(e,null,2)}</pre>`}var Pt={async fetch(e,t){let a=new URL(e.url),o=a.pathname;if(o.startsWith(r.ROUTES.API_JS)){let s=o.split("/").pop(),p=await e.json();return await t.HEADER_HISTORY.put(`js_${s}`,JSON.stringify(p)),ce({success:!0})}let n=await de(t);if(o.startsWith(r.ROUTES.REQUEST)){let s=o.split("/")[2],p=n.find(g=>g.id===s);if(p)return p.jsData=await t.HEADER_HISTORY.get(`js_${s}`,{type:"json"}),m(k(p))}if(o===r.ROUTES.STATS)return m(I(n));if(o===r.ROUTES.BOTS)return m(N(n,D(a)));if(o===r.ROUTES.HISTORY)return m(R(n,D(a),a.searchParams.get("filter")||""));if(o===r.ROUTES.DOWNLOAD)return m(B(n,T(e,t)));let i=T(e,t);return i.jsData=await t.HEADER_HISTORY.get(`js_${i.id}`,{type:"json"}),n.unshift(i),n.length>r.MAX_HISTORY&&(n.length=r.MAX_HISTORY),await t.HEADER_HISTORY.put("history",JSON.stringify(n)),m(y(i,n))}};async function de(e){try{return await e.HEADER_HISTORY.get("history",{type:"json"})||[]}catch{return[]}}function D(e){return parseInt(e.searchParams.get("page")||"1")}function m(e){return new Response(e,{headers:{"Content-Type":"text/html;charset=UTF-8"}})}function ce(e){return new Response(JSON.stringify(e),{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})}export{Pt as default};
