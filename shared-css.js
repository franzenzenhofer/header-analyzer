// Shared Wikipedia-style CSS (<50 lines)
export function getSharedCSS() {
  return `
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
}`;
}