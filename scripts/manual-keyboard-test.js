/**
 * Manual Keyboard Navigation Test
 * Run this script in the browser console to test keyboard accessibility
 */

console.log('🎯 Starting Manual Keyboard Navigation Test...');

// Test 1: Find all focusable elements
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

const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));
const visibleFocusableElements = Array.from(focusableElements).filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           el.offsetWidth > 0 && 
           el.offsetHeight > 0;
});

console.log(`📊 Found ${visibleFocusableElements.length} focusable elements`);

// Test 2: Check focus indicators
let elementsWithoutFocusIndicator = 0;
visibleFocusableElements.forEach((element, index) => {
    element.focus();
    const styles = window.getComputedStyle(element);
    
    const hasFocusOutline = styles.outline !== 'none' && styles.outline !== '';
    const hasFocusBoxShadow = styles.boxShadow !== 'none';
    const hasFocusBorder = styles.borderColor !== 'transparent';
    const hasBackgroundChange = styles.backgroundColor !== 'transparent';
    
    const hasFocusIndicator = hasFocusOutline || hasFocusBoxShadow || hasFocusBorder || hasBackgroundChange;
    
    if (!hasFocusIndicator) {
        elementsWithoutFocusIndicator++;
        console.warn(`⚠️  Element ${index + 1} lacks focus indicator:`, element);
    }
});

// Test 3: Check dropdown menus
const dropdowns = document.querySelectorAll('.dropdown-toggle');
console.log(`🎛️  Found ${dropdowns.length} dropdown menus`);

let keyboardAccessibleDropdowns = 0;
dropdowns.forEach(dropdown => {
    const hasAriaExpanded = dropdown.hasAttribute('aria-expanded');
    const hasAriaHaspopup = dropdown.hasAttribute('aria-haspopup');
    
    if (hasAriaExpanded && hasAriaHaspopup) {
        keyboardAccessibleDropdowns++;
    } else {
        console.warn('⚠️  Dropdown missing ARIA attributes:', dropdown);
    }
});

// Test 4: Check skip links
const skipLinks = document.querySelectorAll('a[href^="#"]');
console.log(`🔗 Found ${skipLinks.length} potential skip links`);

let workingSkipLinks = 0;
skipLinks.forEach(link => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
        workingSkipLinks++;
    } else {
        console.warn('⚠️  Skip link target not found:', href, link);
    }
});

// Test 5: Check form controls
const formControls = document.querySelectorAll('input, select, textarea, button');
console.log(`📝 Found ${formControls.length} form controls`);

let formControlsWithLabels = 0;
formControls.forEach(control => {
    const label = document.querySelector(`label[for="${control.id}"]`) ||
                 control.closest('label') ||
                 document.querySelector(`[aria-labelledby="${control.id}"]`);
    
    const hasAriaLabel = control.hasAttribute('aria-label');
    
    if (label || hasAriaLabel) {
        formControlsWithLabels++;
    } else {
        console.warn('⚠️  Form control lacks proper label:', control);
    }
});

// Generate summary
const summary = {
    totalFocusableElements: visibleFocusableElements.length,
    elementsWithoutFocusIndicator: elementsWithoutFocusIndicator,
    focusIndicatorScore: ((visibleFocusableElements.length - elementsWithoutFocusIndicator) / visibleFocusableElements.length * 100).toFixed(1),
    
    totalDropdowns: dropdowns.length,
    keyboardAccessibleDropdowns: keyboardAccessibleDropdowns,
    dropdownScore: dropdowns.length > 0 ? (keyboardAccessibleDropdowns / dropdowns.length * 100).toFixed(1) : 'N/A',
    
    totalSkipLinks: skipLinks.length,
    workingSkipLinks: workingSkipLinks,
    skipLinkScore: skipLinks.length > 0 ? (workingSkipLinks / skipLinks.length * 100).toFixed(1) : 'N/A',
    
    totalFormControls: formControls.length,
    formControlsWithLabels: formControlsWithLabels,
    formLabelScore: formControls.length > 0 ? (formControlsWithLabels / formControls.length * 100).toFixed(1) : 'N/A'
};

console.log('📊 KEYBOARD NAVIGATION TEST RESULTS:');
console.log('=====================================');
console.log(`• Focus Indicators: ${summary.focusIndicatorScore}% (${summary.totalFocusableElements - summary.elementsWithoutFocusIndicator}/${summary.totalFocusableElements} elements)`);
console.log(`• Dropdown Accessibility: ${summary.dropdownScore}% (${summary.keyboardAccessibleDropdowns}/${summary.totalDropdowns} dropdowns)`);
console.log(`• Skip Links: ${summary.skipLinkScore}% (${summary.workingSkipLinks}/${summary.totalSkipLinks} links)`);
console.log(`• Form Labels: ${summary.formLabelScore}% (${summary.formControlsWithLabels}/${summary.totalFormControls} controls)`);

console.log('\n🔍 DETAILED FINDINGS:');
if (summary.elementsWithoutFocusIndicator > 0) {
    console.log(`⚠️  ${summary.elementsWithoutFocusIndicator} elements lack visible focus indicators`);
} else {
    console.log('✅ All elements have visible focus indicators');
}

if (summary.totalDropdowns === 0) {
    console.log('✅ No dropdown menus found');
} else if (summary.keyboardAccessibleDropdowns === summary.totalDropdowns) {
    console.log('✅ All dropdown menus have proper ARIA attributes');
} else {
    console.log(`⚠️  ${summary.totalDropdowns - summary.keyboardAccessibleDropdowns} dropdown menus lack proper ARIA attributes`);
}

if (summary.totalSkipLinks === 0) {
    console.log('⚠️  No skip links found (consider adding for better accessibility)');
} else if (summary.workingSkipLinks === summary.totalSkipLinks) {
    console.log('✅ All skip links are working');
} else {
    console.log(`⚠️  ${summary.totalSkipLinks - summary.workingSkipLinks} skip links have broken targets`);
}

if (summary.totalFormControls === 0) {
    console.log('✅ No form controls found');
} else if (summary.formControlsWithLabels === summary.totalFormControls) {
    console.log('✅ All form controls have proper labels');
} else {
    console.log(`⚠️  ${summary.totalFormControls - summary.formControlsWithLabels} form controls lack proper labels`);
}

console.log('\n💡 MANUAL TESTING INSTRUCTIONS:');
console.log('1. Use Tab key to navigate through all interactive elements');
console.log('2. Use Shift+Tab to navigate backwards');
console.log('3. Use Enter/Space to activate buttons and links');
console.log('4. Use Arrow keys to navigate within dropdown menus');
console.log('5. Use Escape to close dropdown menus');
console.log('6. Verify all elements have visible focus indicators');
console.log('7. Ensure no keyboard traps exist');

return summary; 