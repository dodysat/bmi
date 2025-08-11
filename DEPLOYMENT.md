# Deployment Guide

This guide explains how to deploy the BMI calculator library to npm with automatic version management.

## Prerequisites

1. **NPM Account**: You need an npm account with access to publish packages
2. **GitHub Repository**: The code should be in a GitHub repository
3. **NPM Token**: You need an NPM authentication token

## Setup

### 1. NPM Authentication

First, you need to authenticate with npm:

```bash
npm login
```

Or if you prefer to use a token:

```bash
npm token create
```

### 2. GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secret:
   - `NPM_TOKEN`: Your npm authentication token

### 3. Initial Setup

If this is the first time publishing:

```bash
# Make sure you're logged in to npm
npm whoami

# Check if the package name is available
npm view @dodysat/bmi
```

## Publishing Process

### Automatic Publishing (Recommended)

The library is set up for automatic publishing via GitHub Actions. Here's how it works:

1. **Create a new version**:
   ```bash
   # For patch releases (bug fixes)
   npm run release:patch
   
   # For minor releases (new features)
   npm run release:minor
   
   # For major releases (breaking changes)
   npm run release:major
   ```

2. **What happens automatically**:
   - Tests are run
   - Package is built
   - Version is bumped
   - Changes are committed and tagged
   - Tag is pushed to GitHub
   - GitHub Action triggers
   - Package is published to npm
   - GitHub release is created

### Manual Publishing

If you prefer to publish manually:

```bash
# Build and test
npm run build
npm test

# Publish
npm publish --access public
```

## Version Management

### Semantic Versioning

The library follows [semantic versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Version Commands

```bash
# Bump patch version
npm run version:patch

# Bump minor version
npm run version:minor

# Bump major version
npm run version:major
```

## Release Script

The `scripts/release.js` script automates the entire release process:

```bash
# Release a patch version
node scripts/release.js patch

# Release a minor version
node scripts/release.js minor

# Release a major version
node scripts/release.js major
```

### What the Release Script Does

1. ✅ Checks if working directory is clean
2. ✅ Runs all tests
3. ✅ Builds the package
4. ✅ Bumps version in package.json
5. ✅ Commits changes
6. ✅ Creates git tag
7. ✅ Pushes to remote repository
8. ✅ Triggers GitHub Action for npm publishing

## GitHub Actions

The repository includes two GitHub Actions workflows:

### 1. CI Workflow (`.github/workflows/ci.yml`)

- Runs on every push and pull request
- Tests against multiple Node.js versions (16, 18, 20)
- Builds the package
- Uploads coverage reports

### 2. Publish Workflow (`.github/workflows/publish.yml`)

- Runs when a version tag is pushed (v*)
- Sets up Node.js environment
- Installs dependencies
- Runs tests
- Builds package
- Publishes to npm
- Creates GitHub release

## Troubleshooting

### Common Issues

1. **Authentication Error**:
   ```bash
   npm login
   # or check your NPM_TOKEN
   ```

2. **Package Name Conflict**:
   - Check if the package name is available
   - Consider using a different scope or name

3. **Build Failures**:
   ```bash
   npm run build
   npm test
   ```

4. **Git Issues**:
   ```bash
   git status
   git add .
   git commit -m "Your commit message"
   ```

### Checking Package Status

```bash
# Check if package exists
npm view @dodysat/bmi

# Check package info
npm info @dodysat/bmi

# Check your npm account
npm whoami
```

## Best Practices

1. **Always test before releasing**:
   ```bash
   npm test
   npm run build
   ```

2. **Use semantic versioning**:
   - Patch for bug fixes
   - Minor for new features
   - Major for breaking changes

3. **Write good commit messages**:
   - Use conventional commit format
   - Be descriptive about changes

4. **Update documentation**:
   - Update README.md if needed
   - Add migration guides for breaking changes

5. **Monitor releases**:
   - Check npm for successful publishing
   - Verify GitHub releases are created
   - Test the published package

## Rollback

If you need to rollback a release:

1. **Unpublish from npm** (within 72 hours):
   ```bash
   npm unpublish @dodysat/bmi@1.0.1
   ```

2. **Delete git tag**:
   ```bash
   git tag -d v1.0.1
   git push origin :refs/tags/v1.0.1
   ```

3. **Revert version in package.json**:
   ```bash
   npm version 1.0.0 --no-git-tag-version
   ```

## Support

If you encounter issues with deployment:

1. Check the GitHub Actions logs
2. Verify npm authentication
3. Ensure all secrets are properly configured
4. Check for any build or test failures
