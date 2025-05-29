/**
 * Accessibility Testing Script for Credential Engine Design System
 * 
 * This script provides automated accessibility testing capabilities
 * to validate WCAG 2.1 AA compliance in the browser.
 * 
 * Usage:
 * 1. Include this script in your HTML page
 * 2. Run accessibilityTest.runAll() in the browser console
 * 3. Review the results in the console
 */

const accessibilityTest = {
  
  /**
   * Run all accessibility tests
   */
  runAll() {
    console.group('🔍 Accessibility Test Results');
    
    const results = {
      colorContrast: this.testColorContrast(),
      focusIndicators: this.testFocusIndicators(),
      touchTargets: this.testTouchTargets(),
      headingHierarchy: this.testHeadingHierarchy(),
      altText: this.testAltText(),
      formLabels: this.testFormLabels(),
      ariaAttributes: this.testAriaAttributes(),
      keyboardNavigation: this.testKeyboardNavigation()
    };
    
    this.generateReport(results);
    console.groupEnd();
    
    return results;
  },
  
  /**
   * Test color contrast ratios
   */
  testColorContrast() {
    console.group('🎨 Color Contrast Test');
    
    const issues = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = this.calculateContrast(color, backgroundColor);
        const fontSize = parseFloat(styles.fontSize);
        const fontWeight = styles.fontWeight;
        
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || fontWeight >= 700));
        const minContrast = isLargeText ? 3 : 4.5;
        
        if (contrast < minContrast) {
          issues.push({
            element: element.tagName.toLowerCase(),
            class: element.className,
            contrast: contrast.toFixed(2),
            required: minContrast,
            color,
            backgroundColor
          });
        }
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All color contrasts meet WCAG AA standards');
    } else {
      console.warn(`❌ Found ${issues.length} color contrast issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test focus indicators
   */
  testFocusIndicators() {
    console.group('🎯 Focus Indicators Test');
    
    const issues = [];
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      element.focus();
      const styles = window.getComputedStyle(element);
      
      const hasOutline = styles.outline !== 'none' && styles.outline !== '0px';
      const hasBoxShadow = styles.boxShadow !== 'none';
      const hasBorder = styles.borderWidth !== '0px';
      
      if (!hasOutline && !hasBoxShadow && !hasBorder) {
        issues.push({
          element: element.tagName.toLowerCase(),
          class: element.className,
          id: element.id
        });
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All focusable elements have visible focus indicators');
    } else {
      console.warn(`❌ Found ${issues.length} elements without focus indicators:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test touch target sizes
   */
  testTouchTargets() {
    console.group('👆 Touch Target Size Test');
    
    const issues = [];
    const interactiveElements = document.querySelectorAll(
      'a, button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"]'
    );
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const minSize = 44; // WCAG AA minimum
      
      if (rect.width < minSize || rect.height < minSize) {
        issues.push({
          element: element.tagName.toLowerCase(),
          class: element.className,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          required: minSize
        });
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All interactive elements meet minimum touch target size (44px)');
    } else {
      console.warn(`❌ Found ${issues.length} elements below minimum touch target size:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test heading hierarchy
   */
  testHeadingHierarchy() {
    console.group('📝 Heading Hierarchy Test');
    
    const issues = [];
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        issues.push({
          element: heading.tagName.toLowerCase(),
          text: heading.textContent.trim().substring(0, 50),
          issue: 'First heading should be H1'
        });
      }
      
      if (level > previousLevel + 1) {
        issues.push({
          element: heading.tagName.toLowerCase(),
          text: heading.textContent.trim().substring(0, 50),
          issue: `Skipped heading level (from H${previousLevel} to H${level})`
        });
      }
      
      previousLevel = level;
    });
    
    if (issues.length === 0) {
      console.log('✅ Heading hierarchy is properly structured');
    } else {
      console.warn(`❌ Found ${issues.length} heading hierarchy issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test alt text for images
   */
  testAltText() {
    console.group('🖼️ Alt Text Test');
    
    const issues = [];
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        issues.push({
          src: img.src,
          issue: 'Missing alt attribute'
        });
      } else if (img.alt.trim() === '' && !img.hasAttribute('role')) {
        // Empty alt is okay for decorative images, but should have role="presentation"
        issues.push({
          src: img.src,
          issue: 'Empty alt text without role="presentation"'
        });
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All images have appropriate alt text');
    } else {
      console.warn(`❌ Found ${issues.length} alt text issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test form labels
   */
  testFormLabels() {
    console.group('📋 Form Labels Test');
    
    const issues = [];
    const formControls = document.querySelectorAll('input, textarea, select');
    
    formControls.forEach(control => {
      const id = control.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = control.hasAttribute('aria-label');
      const hasAriaLabelledBy = control.hasAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        issues.push({
          element: control.tagName.toLowerCase(),
          type: control.type,
          id: control.id,
          issue: 'No associated label found'
        });
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All form controls have proper labels');
    } else {
      console.warn(`❌ Found ${issues.length} form labeling issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test ARIA attributes
   */
  testAriaAttributes() {
    console.group('🏷️ ARIA Attributes Test');
    
    const issues = [];
    const elementsWithRole = document.querySelectorAll('[role]');
    
    elementsWithRole.forEach(element => {
      const role = element.getAttribute('role');
      
      // Check for required ARIA attributes based on role
      switch (role) {
        case 'button':
          if (!element.hasAttribute('aria-label') && !element.textContent.trim()) {
            issues.push({
              element: element.tagName.toLowerCase(),
              role,
              issue: 'Button role requires accessible name'
            });
          }
          break;
        case 'tab':
          if (!element.hasAttribute('aria-selected')) {
            issues.push({
              element: element.tagName.toLowerCase(),
              role,
              issue: 'Tab role requires aria-selected attribute'
            });
          }
          break;
        case 'tabpanel':
          if (!element.hasAttribute('aria-labelledby')) {
            issues.push({
              element: element.tagName.toLowerCase(),
              role,
              issue: 'Tabpanel role requires aria-labelledby attribute'
            });
          }
          break;
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ ARIA attributes are properly implemented');
    } else {
      console.warn(`❌ Found ${issues.length} ARIA attribute issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Test keyboard navigation
   */
  testKeyboardNavigation() {
    console.group('⌨️ Keyboard Navigation Test');
    
    const issues = [];
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(element => {
      const tabIndex = element.tabIndex;
      
      if (tabIndex < 0 && element.tagName !== 'INPUT' && element.type !== 'hidden') {
        issues.push({
          element: element.tagName.toLowerCase(),
          class: element.className,
          issue: 'Interactive element not keyboard accessible (tabindex < 0)'
        });
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ All interactive elements are keyboard accessible');
    } else {
      console.warn(`❌ Found ${issues.length} keyboard navigation issues:`, issues);
    }
    
    console.groupEnd();
    return { passed: issues.length === 0, issues };
  },
  
  /**
   * Calculate color contrast ratio
   */
  calculateContrast(color1, color2) {
    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);
    
    const l1 = this.getLuminance(rgb1);
    const l2 = this.getLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },
  
  /**
   * Parse color string to RGB values
   */
  parseColor(color) {
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const computedColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    const match = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
  },
  
  /**
   * Calculate relative luminance
   */
  getLuminance([r, g, b]) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },
  
  /**
   * Generate accessibility report
   */
  generateReport(results) {
    console.group('📊 Accessibility Report Summary');
    
    const totalTests = Object.keys(results).length;
    const passedTests = Object.values(results).filter(result => result.passed).length;
    const score = Math.round((passedTests / totalTests) * 100);
    
    console.log(`Overall Score: ${score}% (${passedTests}/${totalTests} tests passed)`);
    
    Object.entries(results).forEach(([testName, result]) => {
      const status = result.passed ? '✅' : '❌';
      const issueCount = result.issues ? result.issues.length : 0;
      console.log(`${status} ${testName}: ${result.passed ? 'PASSED' : `FAILED (${issueCount} issues)`}`);
    });
    
    if (score === 100) {
      console.log('🎉 Congratulations! Your page meets WCAG 2.1 AA standards.');
    } else {
      console.log('🔧 Review the issues above to improve accessibility compliance.');
    }
    
    console.groupEnd();
  }
};

// Auto-run tests if script is loaded directly
if (typeof window !== 'undefined') {
  console.log('🔍 Accessibility Testing Script Loaded');
  console.log('Run accessibilityTest.runAll() to test the current page');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = accessibilityTest;
} 