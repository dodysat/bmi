#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    log(`Error executing command: ${command}`, "red");
    process.exit(1);
  }
}

function checkCleanWorkingDirectory() {
  const status = execSync("git status --porcelain", { encoding: "utf8" });
  if (status.trim()) {
    log(
      "❌ Working directory is not clean. Please commit or stash your changes.",
      "red"
    );
    log("Current changes:", "yellow");
    console.log(status);
    process.exit(1);
  }
  log("✅ Working directory is clean", "green");
}

function runTests() {
  log("🧪 Running tests...", "blue");
  exec("npm test");
  log("✅ Tests passed", "green");
}

function build() {
  log("🔨 Building package...", "blue");
  exec("npm run build");
  log("✅ Build completed", "green");
}

function getVersionType() {
  const args = process.argv.slice(2);
  const versionType = args[0];

  if (!versionType || !["patch", "minor", "major"].includes(versionType)) {
    log("❌ Please specify version type: patch, minor, or major", "red");
    log("Usage: node scripts/release.js <patch|minor|major>", "yellow");
    process.exit(1);
  }

  return versionType;
}

function bumpVersion(versionType) {
  log(`📦 Bumping version (${versionType})...`, "blue");
  
  // Check if we're in a git repository
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch (error) {
    log('❌ Not in a git repository. Please run this script from a git repository.', 'red');
    process.exit(1);
  }
  
  // Check if the current version already exists on npm
  const currentPackageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const currentVersion = currentPackageJson.version;
  
  try {
    execSync(`npm view @dodysat/bmi@${currentVersion} version`, { stdio: 'ignore' });
    log(`⚠️  Version ${currentVersion} already exists on npm. Bumping version...`, "yellow");
  } catch (error) {
    log(`ℹ️  Version ${currentVersion} is not yet published on npm.`, "blue");
  }
  
  exec(`npm version ${versionType} --no-git-tag-version`);

  // Read the new version from package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const newVersion = packageJson.version;

  log(`✅ Version bumped to ${newVersion}`, "green");
  return newVersion;
}

function commitAndTag(version) {
  log("📝 Committing changes...", "blue");
  exec("git add .");
  exec(`git commit -m "chore: release version ${version}"`);

  log("🏷️  Creating git tag...", "blue");
  exec(`git tag -a v${version} -m "Release version ${version}"`);

  log("🚀 Pushing to remote...", "blue");
  exec("git push origin main");
  exec("git push --tags");

  log("✅ Changes pushed to remote", "green");
}

function main() {
  log("🚀 Starting release process...", "magenta");

  const versionType = getVersionType();

  // Check if working directory is clean
  checkCleanWorkingDirectory();

  // Run tests
  runTests();

  // Build the package
  build();

  // Bump version
  const newVersion = bumpVersion(versionType);

  // Commit and tag
  commitAndTag(newVersion);

  log("🎉 Release process completed!", "green");
  log(`📦 Version ${newVersion} is ready for publishing`, "cyan");
  log(
    "🔗 The GitHub Action will automatically publish to npm when the tag is pushed",
    "cyan"
  );
}

if (require.main === module) {
  main();
}
