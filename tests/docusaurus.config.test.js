/**
 * Tests for Docusaurus configuration
 */

const config = require('../docusaurus.config');

describe('Docusaurus Configuration', () => {
  test('exports a valid configuration object', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  test('has required fields', () => {
    expect(config.title).toBe('Argos Notary');
    expect(config.url).toBe('https://argosnotary.github.io');
    expect(config.baseUrl).toBe('/');
    expect(config.organizationName).toBe('argosnotary');
    expect(config.projectName).toBe('argosnotary.github.io');
  });

  test('has valid favicon', () => {
    expect(config.favicon).toBe('img/favicon.ico');
  });

  describe('Theme Configuration', () => {
    test('has theme config defined', () => {
      expect(config.themeConfig).toBeDefined();
      expect(typeof config.themeConfig).toBe('object');
    });

    test('has navbar configuration', () => {
      expect(config.themeConfig.navbar).toBeDefined();
      expect(config.themeConfig.navbar.logo).toBeDefined();
      expect(config.themeConfig.navbar.logo.alt).toBe('Argos Notary Logo');
      expect(config.themeConfig.navbar.logo.src).toBe('img/logo.svg');
      expect(config.themeConfig.navbar.logo.srcDark).toBe('img/logo_dark.svg');
    });

    test('has navbar items', () => {
      expect(config.themeConfig.navbar.items).toBeDefined();
      expect(Array.isArray(config.themeConfig.navbar.items)).toBe(true);
      expect(config.themeConfig.navbar.items.length).toBeGreaterThan(0);
    });

    test('navbar has Docs link', () => {
      const docsLink = config.themeConfig.navbar.items.find(
        item => item.label === 'Docs'
      );
      expect(docsLink).toBeDefined();
      expect(docsLink.to).toBe('docs/00_overview/10_overview');
      expect(docsLink.position).toBe('left');
    });

    test('navbar has GitHub link', () => {
      const githubLink = config.themeConfig.navbar.items.find(
        item => item.label === 'GitHub'
      );
      expect(githubLink).toBeDefined();
      expect(githubLink.href).toBe('https://github.com/argosnotary');
      expect(githubLink.position).toBe('right');
    });

    test('has footer configuration', () => {
      expect(config.themeConfig.footer).toBeDefined();
      expect(config.themeConfig.footer.style).toBe('dark');
      expect(Array.isArray(config.themeConfig.footer.links)).toBe(true);
    });

    test('footer has contact information', () => {
      const contactSection = config.themeConfig.footer.links.find(
        section => section.title === 'Contact'
      );
      expect(contactSection).toBeDefined();
      expect(contactSection.items).toBeDefined();

      const emailLink = contactSection.items.find(
        item => item.label === 'e-mail'
      );
      expect(emailLink).toBeDefined();
      expect(emailLink.href).toBe('mailto:support@argosnotary.com');
    });

    test('footer has copyright', () => {
      expect(config.themeConfig.footer.copyright).toBeDefined();
      expect(config.themeConfig.footer.copyright).toContain('Argos Notary');
      expect(config.themeConfig.footer.copyright).toContain('Docusaurus');
    });
  });

  describe('Presets Configuration', () => {
    test('has presets defined', () => {
      expect(config.presets).toBeDefined();
      expect(Array.isArray(config.presets)).toBe(true);
      expect(config.presets.length).toBeGreaterThan(0);
    });

    test('uses classic preset', () => {
      const classicPreset = config.presets.find(
        preset => Array.isArray(preset) && preset[0] === '@docusaurus/preset-classic'
      );
      expect(classicPreset).toBeDefined();
    });

    test('classic preset has docs configuration', () => {
      const classicPreset = config.presets.find(
        preset => Array.isArray(preset) && preset[0] === '@docusaurus/preset-classic'
      );
      const presetConfig = classicPreset[1];

      expect(presetConfig.docs).toBeDefined();
      expect(presetConfig.docs.sidebarPath).toBeDefined();
      expect(presetConfig.docs.editUrl).toBe('https://github.com/argosnotary/docs/tree/master');
    });

    test('classic preset has theme configuration', () => {
      const classicPreset = config.presets.find(
        preset => Array.isArray(preset) && preset[0] === '@docusaurus/preset-classic'
      );
      const presetConfig = classicPreset[1];

      expect(presetConfig.theme).toBeDefined();
      expect(presetConfig.theme.customCss).toBeDefined();
    });
  });
});
