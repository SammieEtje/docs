/**
 * Tests for Docusaurus sidebar configuration
 */

const fs = require('fs');
const path = require('path');
const sidebars = require('../sidebars');

describe('Sidebars Configuration', () => {
  test('exports a valid configuration object', () => {
    expect(sidebars).toBeDefined();
    expect(typeof sidebars).toBe('object');
  });

  test('has docs section defined', () => {
    expect(sidebars.docs).toBeDefined();
    expect(typeof sidebars.docs).toBe('object');
  });

  describe('Sidebar Structure', () => {
    test('has Overview section', () => {
      expect(sidebars.docs.Overview).toBeDefined();
      expect(Array.isArray(sidebars.docs.Overview)).toBe(true);
    });

    test('has Getting started section', () => {
      expect(sidebars.docs['Getting started']).toBeDefined();
      expect(Array.isArray(sidebars.docs['Getting started'])).toBe(true);
    });

    test('has Architecture section', () => {
      expect(sidebars.docs.Architecture).toBeDefined();
      expect(Array.isArray(sidebars.docs.Architecture)).toBe(true);
    });

    test('has Installation section', () => {
      expect(sidebars.docs.Installation).toBeDefined();
      expect(Array.isArray(sidebars.docs.Installation)).toBe(true);
    });

    test('has System administration section', () => {
      expect(sidebars.docs['System administration']).toBeDefined();
      expect(Array.isArray(sidebars.docs['System administration'])).toBe(true);
    });

    test('has Security section', () => {
      expect(sidebars.docs.Security).toBeDefined();
      expect(Array.isArray(sidebars.docs.Security)).toBe(true);
    });

    test('has Supply Chain management section', () => {
      expect(sidebars.docs['Supply Chain management']).toBeDefined();
      expect(Array.isArray(sidebars.docs['Supply Chain management'])).toBe(true);
    });

    test('has Approvals section', () => {
      expect(sidebars.docs.Approvals).toBeDefined();
      expect(Array.isArray(sidebars.docs.Approvals)).toBe(true);
    });

    test('has Extensions section', () => {
      expect(sidebars.docs.Extensions).toBeDefined();
      expect(Array.isArray(sidebars.docs.Extensions)).toBe(true);
    });

    test('has Reference section', () => {
      expect(sidebars.docs.Reference).toBeDefined();
      expect(Array.isArray(sidebars.docs.Reference)).toBe(true);
    });

    test('has Contributing section', () => {
      expect(sidebars.docs.Contributing).toBeDefined();
      expect(Array.isArray(sidebars.docs.Contributing)).toBe(true);
    });
  });

  describe('Architecture Section Structure', () => {
    test('has architectural decisions category', () => {
      const category = sidebars.docs.Architecture.find(
        item => typeof item === 'object' && item.type === 'category'
      );
      expect(category).toBeDefined();
      expect(category.label).toBe('Architectural Decisions');
      expect(Array.isArray(category.items)).toBe(true);
      expect(category.items.length).toBeGreaterThan(0);
    });
  });

  describe('Reference Section Structure', () => {
    test('has Helm Charts category', () => {
      const category = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'Helm Charts'
      );
      expect(category).toBeDefined();
      expect(category.type).toBe('category');
      expect(Array.isArray(category.items)).toBe(true);
    });

    test('has Javadocs category', () => {
      const category = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'Javadocs'
      );
      expect(category).toBeDefined();
      expect(category.type).toBe('category');
      expect(Array.isArray(category.items)).toBe(true);
    });

    test('has REST API link', () => {
      const restApiLink = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'REST api'
      );
      expect(restApiLink).toBeDefined();
      expect(restApiLink.type).toBe('link');
      expect(restApiLink.href).toBe('https://argosnotary.github.io/generated/openapi');
    });
  });

  describe('Document File Existence', () => {
    const docsDir = path.join(__dirname, '../docs');

    // Helper function to extract doc IDs from sidebar config
    const extractDocIds = (items) => {
      const docIds = [];
      items.forEach(item => {
        if (typeof item === 'string') {
          docIds.push(item);
        } else if (item.type === 'category' && Array.isArray(item.items)) {
          docIds.push(...extractDocIds(item.items));
        }
      });
      return docIds;
    };

    // Helper function to check if a doc file exists
    const docFileExists = (docId) => {
      const mdPath = path.join(docsDir, `${docId}.md`);
      const mdxPath = path.join(docsDir, `${docId}.mdx`);
      return fs.existsSync(mdPath) || fs.existsSync(mdxPath);
    };

    test('all referenced doc files exist', () => {
      const allDocIds = [];
      Object.values(sidebars.docs).forEach(section => {
        allDocIds.push(...extractDocIds(section));
      });

      const missingDocs = allDocIds.filter(docId => !docFileExists(docId));

      expect(missingDocs).toEqual([]);
    });
  });

  describe('External Links Validation', () => {
    test('Helm Charts links use HTTPS', () => {
      const helmChartsCategory = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'Helm Charts'
      );

      helmChartsCategory.items.forEach(link => {
        expect(link.href).toMatch(/^https:\/\//);
      });
    });

    test('Javadocs links use HTTPS', () => {
      const javadocsCategory = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'Javadocs'
      );

      javadocsCategory.items.forEach(link => {
        expect(link.href).toMatch(/^https:\/\//);
      });
    });

    test('REST API link uses HTTPS', () => {
      const restApiLink = sidebars.docs.Reference.find(
        item => typeof item === 'object' && item.label === 'REST api'
      );

      expect(restApiLink.href).toMatch(/^https:\/\//);
    });
  });
});
