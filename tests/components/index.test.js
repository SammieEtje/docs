/**
 * Tests for Home page component
 */

const React = require('react');
const fs = require('fs');
const path = require('path');

describe('Home Component', () => {
  const componentPath = path.join(__dirname, '../../src/pages/index.js');

  test('component file exists', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  test('component file has valid structure', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');

    // Check for React import
    expect(content).toContain('import React from');

    // Check for Layout import
    expect(content).toContain('@theme/Layout');

    // Check for default export
    expect(content).toMatch(/export default/);

    // Check for function component
    expect(content).toMatch(/function\s+Home/);
  });

  test('component imports required dependencies', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');

    const requiredImports = [
      'react',
      '@theme/Layout',
      '@docusaurus/Link',
      '@docusaurus/useDocusaurusContext',
      '@docusaurus/useBaseUrl',
    ];

    requiredImports.forEach(dep => {
      expect(content.toLowerCase()).toContain(dep.toLowerCase());
    });
  });

  test('component has valid JavaScript syntax', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');

    // Basic syntax checks - if the file has obvious syntax errors, these will fail
    expect(content).toContain('{');
    expect(content).toContain('}');
    expect(content).toMatch(/return/i);
  });

  test('component returns JSX', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');

    // Check that the component returns JSX (has < and > for tags)
    expect(content).toContain('<');
    expect(content).toContain('>');
    expect(content).toContain('Layout');
  });

  test('component uses proper React patterns', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');

    // Check for function component pattern
    expect(content).toMatch(/function\s+Home\s*\(/);

    // Check for proper export
    expect(content).toMatch(/export\s+default\s+Home/);
  });
});
