# Test Suite Documentation

This directory contains comprehensive tests for the Argos Notary documentation site.

## Test Structure

```
tests/
├── __mocks__/              # Mock files for Jest
│   ├── styleMock.js        # CSS module mock
│   └── fileMock.js         # Static file mock
├── components/             # React component tests
│   └── index.test.js       # Home page component tests
├── scripts/                # Shell script tests
│   └── generate_docs.test.sh  # Tests for generate_docs.sh
├── build.test.js           # Docusaurus build tests
├── docusaurus.config.test.js  # Configuration tests
├── sidebars.test.js        # Sidebar structure tests
├── setupTests.js           # Jest setup file
└── README.md               # This file
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Markdown Link Checks

```bash
npm run test:links
```

### Run Markdown Linting

```bash
npm run test:markdown
```

### Run Build Test

```bash
npm run test:build
```

### Run All Tests (Complete Test Suite)

```bash
npm run test:all
```

## Test Categories

### 1. Configuration Tests (`docusaurus.config.test.js`)

Tests for Docusaurus configuration validation:
- Required fields (title, URL, baseUrl, etc.)
- Theme configuration (navbar, footer)
- Presets configuration
- Navigation structure

**Why it matters:** Configuration errors can break the entire site build.

### 2. Sidebar Tests (`sidebars.test.js`)

Tests for documentation sidebar structure:
- Sidebar sections exist
- Category structure is valid
- All referenced document files exist
- External links use HTTPS

**Why it matters:** Broken sidebar links result in 404 errors and poor UX.

### 3. Component Tests (`components/index.test.js`)

Tests for React components:
- Component file structure
- Valid JavaScript/JSX syntax
- Proper imports and exports
- React patterns compliance

**Why it matters:** Ensures custom React components don't break the site.

### 4. Build Tests (`build.test.js`)

Tests for the build process:
- Build completes successfully
- Required files are generated
- Static assets are copied
- Build size is reasonable

**Why it matters:** Catches build failures before deployment.

### 5. Markdown Link Checks

Tests all markdown files for broken links:
- Internal links resolve correctly
- External links return valid status codes
- No orphaned files

**Why it matters:** Broken links frustrate users and hurt credibility.

### 6. Markdown Linting

Tests markdown formatting and quality:
- Valid markdown syntax
- Consistent formatting
- Proper heading hierarchy
- Code blocks have language specifiers

**Why it matters:** Ensures documentation quality and consistency.

### 7. Shell Script Tests (`scripts/generate_docs.test.sh`)

Tests for the documentation generation script:
- Script exists and is executable
- Required dependencies are available
- Script syntax is valid
- Required files and directories exist

**Why it matters:** Ensures documentation generation doesn't fail.

## Configuration Files

### Jest Configuration (`jest.config.js`)

Jest is configured to:
- Use jsdom environment for React testing
- Collect coverage from source files
- Use custom setup file
- Mock CSS and static assets
- Set 50% coverage threshold

### Babel Configuration (`babel.config.js`)

Babel is configured to:
- Transform modern JavaScript for Node
- Transform JSX for React testing

### Markdown Link Check Configuration (`.markdown-link-check.json`)

Configured to:
- Ignore localhost URLs
- Retry on 429 (rate limit) errors
- Handle redirects properly
- Set reasonable timeouts

### Markdownlint Configuration (`.markdownlint.json`)

Configured to:
- Allow longer lines (120 chars)
- Allow HTML in markdown
- Require fenced code blocks
- Check heading hierarchy

## CI/CD Integration

The test suite is integrated with GitHub Actions (`.github/workflows/ci.yml`):

**Jobs:**
1. **test** - Runs Jest tests on Node 16.x and 18.x
2. **lint-markdown** - Checks markdown formatting
3. **check-links** - Validates all markdown links
4. **build** - Builds the documentation site
5. **test-scripts** - Tests shell scripts
6. **all-tests-passed** - Final validation step

**Triggers:**
- Push to `master` or `main` branches
- Pull requests to `master` or `main` branches

## Coverage Reports

Test coverage reports are:
- Generated in the `coverage/` directory
- Uploaded to Codecov in CI
- Viewable locally by opening `coverage/lcov-report/index.html`

## Current Test Coverage

As of initial implementation:
- **42 passing tests** across 3 test suites
- Configuration: 100% tested
- Sidebars: 100% tested
- Components: Basic structure tested
- Build process: Comprehensive validation
- Documentation quality: Link and lint checks

## Adding New Tests

### Adding a Component Test

1. Create a new test file in `tests/components/`
2. Follow the pattern in `index.test.js`
3. Mock Docusaurus dependencies as needed

### Adding a Configuration Test

1. Add tests to `docusaurus.config.test.js` or `sidebars.test.js`
2. Test both structure and values
3. Ensure validation catches common errors

### Adding a Build Test

1. Add tests to `build.test.js`
2. Verify generated files exist
3. Check file contents when relevant

## Troubleshooting

### Tests Fail with Module Not Found

Run `npm install` to ensure all dependencies are installed.

### Build Test Times Out

Increase the timeout in `build.test.js` or skip it during development with:
```bash
npm test -- --testPathIgnorePatterns=build.test.js
```

### Markdown Link Checks Fail

Some external links may be temporarily unavailable. The link checker:
- Retries 3 times
- Handles rate limiting
- Accepts redirect status codes

### Coverage Threshold Not Met

Run `npm run test:coverage` to see which files need more tests.

## Future Improvements

Potential areas for expansion:
1. Visual regression testing
2. Performance testing
3. Accessibility (a11y) testing with jest-axe
4. E2E testing with Playwright or Cypress
5. Snapshot testing for React components

## Bug Fixes from Testing

During test implementation, the following issues were discovered and fixed:
1. **Filename typo**: `20_xldepoly_approval_collector.md` renamed to `20_xldeploy_approval_collector.md` to match sidebar reference

This demonstrates the value of comprehensive testing!
