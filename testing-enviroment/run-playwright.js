// Import required modules
const { execSync } = require('child_process');
const minimist = require('minimist');
const os = require('os');

// Define which parameters are native to Playwright (like --project)
const nativeOptions = ['project', 'browser', 'headless'];

// Parse command-line arguments using minimist
const args = minimist(process.argv.slice(2));

// Ensure testPath is provided, or set a default
const testPath = args.testPath || null;
if (testPath === null) {
    console.error(`No test name provided`);
    process.exit(1);
}

// Separate arguments into environment variables and native Playwright options
const envVars = {};
const nativeArgs = [];

Object.keys(args).forEach((key) => {
  if (key === '_') return; // Ignore positional arguments
  if (nativeOptions.includes(key)) {
    nativeArgs.push(`--${key}=${args[key]}`);
  } else if (key !== 'testPath') {
    // Treat all other options as environment variables
    envVars[key.toUpperCase()] = args[key];
  }
});

// Construct native arguments string for Playwright
const nativeArgsString = nativeArgs.join(' ');

if (os.platform() === 'win32') {
  // For Windows PowerShell, set environment variables and run the command in a single line
  const envVarCommands = Object.keys(envVars)
    .map((key) => `$env:${key}='${envVars[key]}'`)
    .join('; ');
  const command = `powershell -Command "${envVarCommands}; npx playwright test ${testPath} ${nativeArgsString}"`;

  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(`Failed to execute test: ${error.message}`);
    process.exit(1);
  }
} else {
  // For Linux/macOS, use standard env var syntax in a single command
  const envVarsString = Object.keys(envVars)
    .map((key) => `${key}="${envVars[key]}"`)
    .join(' ');
  const command = `${envVarsString} npx playwright test ${testPath} ${nativeArgsString}`;

  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(`Failed to execute test: ${error.message}`);
    process.exit(1);
  }
}
