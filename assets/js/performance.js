/**
 * Performance Optimizations for Democratizing Data Website
 * Includes lazy loading, intersection observer, and Core Web Vitals improvements
 */

(function() {
  'use strict';

  // =============================================================================
  // LAZY LOADING IMAGES
  // =============================================================================
  
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => img.classList.add('loaded'));
    }
  }

  // =============================================================================
  // ANIMATE ON SCROLL
  // =============================================================================
  
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window && animateElements.length > 0) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      });

      animateElements.forEach(el => animationObserver.observe(el));
    }
  }

  // =============================================================================
  // PRELOAD CRITICAL RESOURCES
  // =============================================================================
  
  function preloadCriticalResources() {
    // Preload hero image if it exists
    const heroImage = document.querySelector('.c-hero__image img');
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }

    // Preload critical CSS for next page navigation
    const criticalPages = ['/about/', '/tools/', '/resources/'];
    criticalPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }

  // =============================================================================
  // OPTIMIZE THIRD-PARTY SCRIPTS
  // =============================================================================
  
  function optimizeThirdPartyScripts() {
    // Defer non-critical third-party scripts
    const scripts = document.querySelectorAll('script[src*="google"], script[src*="analytics"]');
    scripts.forEach(script => {
      if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
        script.setAttribute('defer', '');
      }
    });
  }

  // =============================================================================
  // CORE WEB VITALS OPTIMIZATION
  // =============================================================================
  
  function optimizeCoreWebVitals() {
    // Reduce Cumulative Layout Shift (CLS)
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      if (img.naturalWidth && img.naturalHeight) {
        img.setAttribute('width', img.naturalWidth);
        img.setAttribute('height', img.naturalHeight);
      }
    });

    // Optimize Largest Contentful Paint (LCP)
    const heroSection = document.querySelector('.c-hero');
    if (heroSection) {
      heroSection.style.contain = 'layout style paint';
    }
  }

  // =============================================================================
  // PERFORMANCE MONITORING
  // =============================================================================
  
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor CLS
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // =============================================================================
  // INITIALIZATION
  // =============================================================================
  
  function init() {
    // Run immediately
    optimizeThirdPartyScripts();
    preloadCriticalResources();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initLazyLoading();
        initScrollAnimations();
        optimizeCoreWebVitals();
        
        // Monitor performance in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          monitorPerformance();
        }
      });
    } else {
      initLazyLoading();
      initScrollAnimations();
      optimizeCoreWebVitals();
      
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
      }
    }
  }

  // Start performance optimizations
  init();

})(); 