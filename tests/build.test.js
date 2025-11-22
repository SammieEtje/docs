/**
 * Tests for Docusaurus build process
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Docusaurus Build', () => {
  // Increase timeout for build tests
  jest.setTimeout(120000);

  test('build completes successfully', () => {
    expect(() => {
      execSync('npm run build', {
        stdio: 'pipe',
        cwd: path.join(__dirname, '..'),
      });
    }).not.toThrow();
  });

  test('build directory is created', () => {
    const buildDir = path.join(__dirname, '../build');
    expect(fs.existsSync(buildDir)).toBe(true);
  });

  test('index.html is generated', () => {
    const indexPath = path.join(__dirname, '../build/index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  test('generated index.html contains expected content', () => {
    const indexPath = path.join(__dirname, '../build/index.html');
    const content = fs.readFileSync(indexPath, 'utf-8');

    expect(content).toContain('Argos Notary');
  });

  test('docs pages are generated', () => {
    const docsDir = path.join(__dirname, '../build/docs');
    expect(fs.existsSync(docsDir)).toBe(true);
  });

  test('static assets are copied', () => {
    const assetsDir = path.join(__dirname, '../build/assets');
    expect(fs.existsSync(assetsDir)).toBe(true);
  });

  test('favicon is copied to build', () => {
    const faviconPath = path.join(__dirname, '../build/img/favicon.ico');
    expect(fs.existsSync(faviconPath)).toBe(true);
  });

  test('build size is reasonable', () => {
    const buildDir = path.join(__dirname, '../build');

    const getDirSize = (dirPath) => {
      let size = 0;
      const files = fs.readdirSync(dirPath);

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          size += getDirSize(filePath);
        } else {
          size += stats.size;
        }
      });

      return size;
    };

    const buildSize = getDirSize(buildDir);
    const buildSizeMB = buildSize / (1024 * 1024);

    // Build should be less than 100MB (reasonable for a docs site)
    expect(buildSizeMB).toBeLessThan(100);
  });
});
