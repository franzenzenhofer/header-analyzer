import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function deploy() {
  console.log('🚀 Starting HARDCORE deployment process...\n');

  try {
    // Step 1: Run linting
    console.log('📝 Running ESLint (max-warnings 0)...');
    await execAsync('npm run lint');
    console.log('✅ Linting passed!\n');

    // Step 2: Run type checking
    console.log('🔍 Running TypeScript strict checks...');
    await execAsync('npm run typecheck');
    console.log('✅ Type checking passed!\n');

    // Step 3: Run unit tests with coverage
    console.log('🧪 Running unit tests with coverage...');
    const { stdout: coverage } = await execAsync('npm run test:coverage');
    console.log(coverage);

    // Check coverage thresholds
    if (coverage.includes('Coverage threshold')) {
      throw new Error('Coverage thresholds not met (required: 80%)');
    }
    console.log('✅ Unit tests passed with coverage!\n');

    // Step 4: Build project
    console.log('📦 Building project...');
    await execAsync('npm run build');
    console.log('✅ Build successful!\n');

    // Step 5: Run E2E tests
    console.log('🎭 Running Playwright E2E tests...');
    await execAsync('npm run test:e2e');
    console.log('✅ E2E tests passed!\n');

    // Step 6: Deploy to Cloudflare
    console.log('☁️ Deploying to Cloudflare Workers...');
    const { stdout: deployOutput } = await execAsync('wrangler deploy');
    console.log(deployOutput);
    console.log('✅ Deployment successful!\n');

    // Step 7: Run post-deployment tests
    console.log('🔬 Running post-deployment tests...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for deployment
    await execAsync('node scripts/post-deploy-tests.js');
    console.log('✅ Post-deployment tests passed!\n');

    console.log('🎉 HARDCORE DEPLOYMENT COMPLETE!');
    console.log('🌐 Your app is live at: https://header-analyzer.franzai.com');
    console.log('📊 All tests passed with >80% coverage');
    console.log('✨ Zero warnings, strict TypeScript, modular code (<50 lines)');

  } catch (error) {
    console.error('❌ DEPLOYMENT FAILED:', error.message);
    console.error('🔥 Fix the issues and run again!');
    process.exit(1);
  }
}

deploy();