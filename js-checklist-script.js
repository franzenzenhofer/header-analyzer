// JS Checklist Script Logic (<50 lines)
export function renderChecklistScript(requestId) {
  return `
  <script type="module">
  import { detectAllFeatures } from '/js-detector.js';
  import { updateChecklistUI } from '/js-checklist-ui.js';

  const reqId = '${requestId}';
  const features = detectAllFeatures();

  // Save results to server
  fetch('/api/update-js/' + reqId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features)
  }).then(() => console.log('JS features saved for request: ' + reqId));

  // Update UI
  updateChecklistUI(features);
  </script>`;
}