const { spawn } = require('child_process');
const path = require('path');
const { waitForServer, BASE_URL } = require('./helpers');

/**
 * Unified 4-Tier E2E Test Suite Runner
 * 
 * Executes:
 * - Tier 1: Feature Coverage (e2e/tier1.test.js)
 * - Tier 2: Boundary & Corner Cases (e2e/tier2.test.js)
 * - Tier 3: Cross-Feature Interactions (e2e/tier3.test.js)
 * - Tier 4: Real-World User Scenario (e2e/tier4.test.js)
 * 
 * Auto-starts development server if not already running.
 * 
 * Usage:
 *   node e2e/runner.js             # Runs all 4 tiers
 *   node e2e/runner.js --tier 1    # Runs Tier 1 only
 *   node e2e/runner.js --tier 2    # Runs Tier 2 only
 *   node e2e/runner.js --tier 3    # Runs Tier 3 only
 *   node e2e/runner.js --tier 4    # Runs Tier 4 only
 */

const TIERS = [
  { id: 1, name: 'Tier 1: Feature Coverage', file: 'tier1.test.js' },
  { id: 2, name: 'Tier 2: Boundary & Corner Cases', file: 'tier2.test.js' },
  { id: 3, name: 'Tier 3: Cross-Feature Interactions', file: 'tier3.test.js' },
  { id: 4, name: 'Tier 4: Real-World User Scenario', file: 'tier4.test.js' },
];

async function runTestFile(tier) {
  const filePath = path.resolve(__dirname, tier.file);
  console.log(`\n${'='.repeat(70)}`);
  console.log(`RUNNING: ${tier.name} (${tier.file})`);
  console.log(`${'='.repeat(70)}\n`);

  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--test', filePath], {
      stdio: 'inherit',
      env: { ...process.env, BASE_URL },
    });

    child.on('close', (code) => {
      resolve({
        id: tier.id,
        name: tier.name,
        file: tier.file,
        exitCode: code,
        passed: code === 0,
      });
    });
  });
}

(async () => {
  console.log('='.repeat(70));
  console.log('PORTFOLIO REDESIGN - 4-TIER E2E TEST SUITE');
  console.log(`Target URL: ${BASE_URL}`);
  console.log('='.repeat(70));

  // Parse command line arguments for specific tier
  const args = process.argv.slice(2);
  let selectedTiers = TIERS;

  const tierArgIdx = args.indexOf('--tier');
  if (tierArgIdx !== -1 && args[tierArgIdx + 1]) {
    const tierNum = parseInt(args[tierArgIdx + 1], 10);
    selectedTiers = TIERS.filter((t) => t.id === tierNum);
    if (selectedTiers.length === 0) {
      console.error(`[ERROR] Invalid tier number: ${tierNum}. Valid options: 1, 2, 3, 4.`);
      process.exit(1);
    }
  }

  // Pre-flight server check
  console.log('\nChecking target server connectivity...');
  let serverReady = await waitForServer(BASE_URL, 10000);
  let devProcess = null;

  if (!serverReady) {
    console.log(`Server not detected at ${BASE_URL}. Auto-starting Next.js dev server...`);
    devProcess = spawn('npm', ['run', 'dev'], {
      shell: true,
      stdio: 'pipe',
      cwd: path.resolve(__dirname, '..'),
      env: { ...process.env, PORT: '3000' },
    });

    devProcess.stderr.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('Error')) console.error(`[DevServer Error] ${msg.trim()}`);
    });

    console.log('Waiting for dev server to initialize...');
    serverReady = await waitForServer(BASE_URL, 35000);
    if (!serverReady) {
      console.error(`\n[FATAL] Failed to auto-start dev server at ${BASE_URL}.`);
      if (devProcess) {
        devProcess.kill();
      }
      process.exit(1);
    }
  }
  console.log('Server is online and responding.\n');

  const suiteResults = [];

  try {
    for (const tier of selectedTiers) {
      const result = await runTestFile(tier);
      suiteResults.push(result);
    }
  } finally {
    if (devProcess) {
      console.log('\nStopping auto-started dev server...');
      devProcess.kill('SIGTERM');
      // On Windows spawn with shell creates process tree; ensure port is clean
      try {
        require('child_process').execSync('powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -Force -ErrorAction SilentlyContinue"');
      } catch (_) {}
    }
  }

  // Summary Report
  console.log('\n' + '='.repeat(70));
  console.log('E2E TEST SUITE EXECUTION SUMMARY');
  console.log('='.repeat(70));

  console.table(
    suiteResults.map((r) => ({
      Tier: r.name,
      File: r.file,
      Status: r.passed ? 'PASS' : 'FAIL',
      ExitCode: r.exitCode,
    }))
  );

  const allPassed = suiteResults.every((r) => r.passed);

  if (allPassed) {
    console.log('\n✅ ALL E2E TIERS PASSED: 100% test success across all criteria.');
    process.exitCode = 0;
    process.exit(0);
  } else {
    console.error('\n❌ E2E TEST SUITE FAILED: One or more tiers encountered assertion failures.');
    process.exitCode = 1;
    process.exit(1);
  }
})();
