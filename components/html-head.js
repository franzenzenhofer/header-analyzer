// Shared HTML head component (<50 lines)
import { getSharedCSS } from '../shared-css.js';

export function renderHTMLHead(title = 'Header Analyzer', additionalMeta = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${additionalMeta}
<style>${getSharedCSS()}</style>
</head>`;
}

export function renderHTMLStart(title, additionalMeta) {
  return renderHTMLHead(title, additionalMeta) + '<body>';
}

export function renderHTMLEnd() {
  return '</body></html>';
}

export function wrapInHTML(title, content, additionalMeta = '') {
  return renderHTMLHead(title, additionalMeta) +
         '<body>' +
         content +
         '</body></html>';
}