import https from 'https';

const URL = 'https://header-analyzer.franzai.com';

async function runPostDeployTests() {
  console.log('🧪 Running post-deployment tests...\n');

  const tests = [
    testHomePage,
    testApiEndpoint,
    testBotDetection,
    testHeaderCapture,
    testResponseHeaders
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      await test();
      console.log(`✅ ${test.name} passed`);
      passed++;
    } catch (error) {
      console.error(`❌ ${test.name} failed:`, error.message);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.error('❌ Post-deployment tests failed!');
    process.exit(1);
  } else {
    console.log('✅ All post-deployment tests passed!');
  }
}

async function testHomePage() {
  const response = await fetch(URL);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  const html = await response.text();
  if (!html.includes('Request Header Analyzer')) {
    throw new Error('Missing expected content');
  }
}

async function testApiEndpoint() {
  const response = await fetch(`${URL}/api/current`);
  if (response.status !== 200) {
    throw new Error(`API returned ${response.status}`);
  }
  const data = await response.json();
  if (!data.headers || !data.userAgent) {
    throw new Error('Invalid API response structure');
  }
}

async function testBotDetection() {
  const response = await fetch(`${URL}/api/current`, {
    headers: { 'User-Agent': 'Googlebot/2.1' }
  });
  const data = await response.json();
  if (data.botType !== 'Google') {
    throw new Error(`Expected Google bot, got ${data.botType}`);
  }
}

async function testHeaderCapture() {
  const testHeader = 'test-' + Date.now();
  const response = await fetch(`${URL}/api/current`, {
    headers: { 'X-Test-Header': testHeader }
  });
  const data = await response.json();
  if (!data.headers['x-test-header']?.includes(testHeader)) {
    throw new Error('Custom header not captured');
  }
}

async function testResponseHeaders() {
  const response = await fetch(`${URL}/api/current`);
  if (response.headers.get('content-type') !== 'application/json') {
    throw new Error('Wrong content-type header');
  }
  if (!response.headers.get('access-control-allow-origin')) {
    throw new Error('Missing CORS headers');
  }
}

runPostDeployTests();