/**
 * Keyboard Navigation Accessibility Test
 * Tests keyboard accessibility for all interactive elements on the page
 */

class KeyboardNavigationTester {
    constructor() {
        this.results = [];
        this.currentIndex = 0;
        this.focusableElements = [];
        this.testStartTime = Date.now();
    }

    /**
     * Get all focusable elements on the page
     */
    getFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            'details summary',
            '[contenteditable="true"]'
        ];

        const elements = document.querySelectorAll(focusableSelectors.join(', '));
        return Array.from(elements).filter(el => {
            // Filter out hidden elements
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && 
                   style.visibility !== 'hidden' && 
                   el.offsetWidth > 0 && 
                   el.offsetHeight > 0;
        });
    }

    /**
     * Test if an element has visible focus indicator
     */
    testFocusVisibility(element) {
        element.focus();
        
        // Get computed styles for focus state
        const styles = window.getComputedStyle(element);
        const pseudoStyles = window.getComputedStyle(element, ':focus');
        
        // Check for common focus indicators
        const hasFocusOutline = styles.outline !== 'none' && styles.outline !== '';
        const hasFocusBoxShadow = styles.boxShadow !== 'none';
        const hasFocusBorder = styles.borderColor !== 'transparent';
        const hasBackgroundChange = styles.backgroundColor !== 'transparent';
        
        return {
            element: element,
            tagName: element.tagName,
            id: element.id || 'no-id',
            className: element.className || 'no-class',
            text: element.textContent?.trim().substring(0, 50) || 'no-text',
            hasFocusIndicator: hasFocusOutline || hasFocusBoxShadow || hasFocusBorder || hasBackgroundChange,
            focusStyles: {
                outline: styles.outline,
                boxShadow: styles.boxShadow,
                borderColor: styles.borderColor,
                backgroundColor: styles.backgroundColor
            }
        };
    }

    /**
     * Test tab order and navigation
     */
    testTabOrder() {
        const tabOrderResults = [];
        this.focusableElements = this.getFocusableElements();
        
        console.log(`Found ${this.focusableElements.length} focusable elements`);
        
        this.focusableElements.forEach((element, index) => {
            const focusTest = this.testFocusVisibility(element);
            tabOrderResults.push({
                index: index + 1,
                ...focusTest
            });
        });
        
        return tabOrderResults;
    }

    /**
     * Test dropdown menus keyboard accessibility
     */
    testDropdownMenus() {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        const dropdownResults = [];
        
        dropdowns.forEach(dropdown => {
            const result = {
                element: dropdown,
                text: dropdown.textContent?.trim(),
                hasAriaExpanded: dropdown.hasAttribute('aria-expanded'),
                hasAriaHaspopup: dropdown.hasAttribute('aria-haspopup'),
                keyboardAccessible: false
            };
            
            // Test keyboard activation
            dropdown.focus();
            
            // Simulate Enter key
            const enterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                bubbles: true
            });
            
            dropdown.dispatchEvent(enterEvent);
            
            // Check if dropdown opened
            const dropdownMenu = dropdown.nextElementSibling || 
                               document.querySelector(`[aria-labelledby="${dropdown.id}"]`);
            
            if (dropdownMenu) {
                const isVisible = window.getComputedStyle(dropdownMenu).display !== 'none';
                result.keyboardAccessible = isVisible;
            }
            
            dropdownResults.push(result);
        });
        
        return dropdownResults;
    }

    /**
     * Test skip links
     */
    testSkipLinks() {
        const skipLinks = document.querySelectorAll('a[href^="#"]');
        const skipLinkResults = [];
        
        skipLinks.forEach(link => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            
            skipLinkResults.push({
                element: link,
                text: link.textContent?.trim(),
                href: href,
                targetExists: !!target,
                isVisible: window.getComputedStyle(link).display !== 'none'
            });
        });
        
        return skipLinkResults;
    }

    /**
     * Test form controls
     */
    testFormControls() {
        const formControls = document.querySelectorAll('input, select, textarea, button');
        const formResults = [];
        
        formControls.forEach(control => {
            const label = document.querySelector(`label[for="${control.id}"]`) ||
                         control.closest('label') ||
                         document.querySelector(`[aria-labelledby="${control.id}"]`);
            
            formResults.push({
                element: control,
                type: control.type || control.tagName,
                id: control.id || 'no-id',
                hasLabel: !!label,
                labelText: label?.textContent?.trim() || 'no-label',
                hasAriaLabel: control.hasAttribute('aria-label'),
                ariaLabel: control.getAttribute('aria-label') || 'none',
                isRequired: control.hasAttribute('required'),
                isDisabled: control.hasAttribute('disabled')
            });
        });
        
        return formResults;
    }

    /**
     * Run all keyboard navigation tests
     */
    async runAllTests() {
        console.log('🔍 Starting Keyboard Navigation Accessibility Test...');
        
        const results = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            tests: {}
        };
        
        // Test 1: Tab Order and Focus Visibility
        console.log('📋 Testing tab order and focus visibility...');
        results.tests.tabOrder = this.testTabOrder();
        
        // Test 2: Dropdown Menus
        console.log('📋 Testing dropdown menus...');
        results.tests.dropdowns = this.testDropdownMenus();
        
        // Test 3: Skip Links
        console.log('📋 Testing skip links...');
        results.tests.skipLinks = this.testSkipLinks();
        
        // Test 4: Form Controls
        console.log('📋 Testing form controls...');
        results.tests.formControls = this.testFormControls();
        
        // Generate summary
        results.summary = this.generateSummary(results.tests);
        
        console.log('✅ Keyboard Navigation Test Complete!');
        console.log('📊 Summary:', results.summary);
        
        return results;
    }

    /**
     * Generate test summary
     */
    generateSummary(tests) {
        const summary = {
            totalFocusableElements: tests.tabOrder.length,
            elementsWithoutFocusIndicator: tests.tabOrder.filter(t => !t.hasFocusIndicator).length,
            totalDropdowns: tests.dropdowns.length,
            keyboardAccessibleDropdowns: tests.dropdowns.filter(d => d.keyboardAccessible).length,
            totalSkipLinks: tests.skipLinks.length,
            workingSkipLinks: tests.skipLinks.filter(s => s.targetExists).length,
            totalFormControls: tests.formControls.length,
            formControlsWithLabels: tests.formControls.filter(f => f.hasLabel || f.hasAriaLabel).length
        };
        
        summary.focusIndicatorScore = ((summary.totalFocusableElements - summary.elementsWithoutFocusIndicator) / summary.totalFocusableElements * 100).toFixed(1);
        summary.dropdownScore = summary.totalDropdowns > 0 ? (summary.keyboardAccessibleDropdowns / summary.totalDropdowns * 100).toFixed(1) : 'N/A';
        summary.skipLinkScore = summary.totalSkipLinks > 0 ? (summary.workingSkipLinks / summary.totalSkipLinks * 100).toFixed(1) : 'N/A';
        summary.formLabelScore = summary.totalFormControls > 0 ? (summary.formControlsWithLabels / summary.totalFormControls * 100).toFixed(1) : 'N/A';
        
        return summary;
    }

    /**
     * Export results to JSON
     */
    exportResults(results) {
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `keyboard-navigation-test-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Auto-run test when script is loaded
if (typeof window !== 'undefined') {
    window.KeyboardNavigationTester = KeyboardNavigationTester;
    
    // Add a global function to run the test
    window.runKeyboardTest = async function() {
        const tester = new KeyboardNavigationTester();
        const results = await tester.runAllTests();
        
        // Display results in console
        console.table(results.summary);
        
        // Optionally export results
        if (confirm('Export detailed results to JSON file?')) {
            tester.exportResults(results);
        }
        
        return results;
    };
    
    console.log('🎯 Keyboard Navigation Tester loaded! Run window.runKeyboardTest() to start testing.');
} 