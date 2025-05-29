# Layout System Documentation

This directory contains the layout components for the Credential Engine Design System, providing a comprehensive responsive grid system and layout patterns.

## Files Overview

- `_containers.scss` - Container system with responsive sizing
- `_grid.scss` - CSS Grid-based responsive grid system
- `_header.scss` - Header layout components and navigation
- `_footer.scss` - Footer layout with multi-column structure
- `README.md` - This documentation file

## Responsive Grid System

### Breakpoints

The grid system uses the following breakpoints defined in `abstracts/_variables.scss`:

```scss
$breakpoint-xs: 0px;      // Mobile first
$breakpoint-sm: 576px;    // Small devices
$breakpoint-md: 768px;    // Medium devices (tablets)
$breakpoint-lg: 992px;    // Large devices (desktops)
$breakpoint-xl: 1200px;   // Extra large devices
$breakpoint-xxl: 1400px;  // Extra extra large devices
```

### Container System

#### Basic Containers

```html
<!-- Standard responsive container -->
<div class="container">Content</div>

<!-- Specific size containers -->
<div class="container-sm">Small container</div>
<div class="container-md">Medium container</div>
<div class="container-lg">Large container</div>
<div class="container-xl">Extra large container</div>
<div class="container-xxl">Extra extra large container</div>

<!-- Fluid container (full width with padding) -->
<div class="container-fluid">Full width content</div>
```

#### Section Containers

```html
<!-- Standard section spacing -->
<section class="section">
  <div class="container">Section content</div>
</section>

<!-- Compact section -->
<section class="section-sm">Compact section</section>

<!-- Large section -->
<section class="section-lg">Large section</section>
```

### Grid System

#### Basic Grid Usage

```html
<!-- Auto-fit responsive grid -->
<div class="grid grid-auto">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Fixed column grids -->
<div class="grid grid-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive column grids -->
<div class="grid grid-responsive-3">
  <div>Responsive item 1</div>
  <div>Responsive item 2</div>
  <div>Responsive item 3</div>
</div>
```

#### Grid Gaps

```html
<!-- Component-level gaps -->
<div class="grid grid-3 grid-gap-sm">Small gaps</div>
<div class="grid grid-3 grid-gap-md">Medium gaps</div>
<div class="grid grid-3 grid-gap-lg">Large gaps</div>

<!-- Layout-level gaps -->
<div class="grid grid-3 grid-gap-layout-lg">Large layout gaps</div>
```

#### Grid Item Control

```html
<div class="grid grid-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div class="col-span-1">Spans 1 column</div>
  <div class="col-span-1">Spans 1 column</div>
  <div class="col-span-full">Spans full width</div>
</div>
```

### Special Layout Patterns

#### Sidebar Layouts

```html
<!-- Left sidebar -->
<div class="grid-sidebar">
  <aside>Sidebar content</aside>
  <main>Main content</main>
</div>

<!-- Right sidebar -->
<div class="grid-sidebar-right">
  <main>Main content</main>
  <aside>Sidebar content</aside>
</div>
```

#### Hero Layouts

```html
<!-- Standard hero -->
<section class="grid-hero">
  <div>
    <h1>Hero Title</h1>
    <p>Hero description</p>
  </div>
  <div>
    <img src="hero-image.jpg" alt="Hero">
  </div>
</section>
```

#### Card Grids

```html
<!-- Cards with consistent heights -->
<div class="grid-cards">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Flexbox Alternative

For cases where CSS Grid isn't suitable, use the flexbox grid:

```html
<!-- Flexbox grid -->
<div class="flex-grid">
  <div>Flex item 1</div>
  <div>Flex item 2</div>
  <div>Flex item 3</div>
</div>

<!-- Controlled flex columns -->
<div class="flex-grid flex-grid-3">
  <div>Equal width item</div>
  <div>Equal width item</div>
  <div>Equal width item</div>
</div>
```

### Responsive Utilities

#### Display Control

```html
<!-- Hide on mobile -->
<div class="hidden-xs">Hidden on mobile</div>

<!-- Show only on desktop -->
<div class="visible-lg">Desktop only</div>

<!-- Responsive display types -->
<div class="visible-md-flex">Flex on medium+</div>
<div class="visible-lg-grid">Grid on large+</div>
```

#### Responsive Spacing

```html
<!-- Responsive margins -->
<div class="mt-xs-2 mt-md-4 mt-lg-6">Responsive top margin</div>

<!-- Responsive text alignment -->
<div class="text-xs-center text-md-left">Responsive alignment</div>
```

#### Responsive Flexbox

```html
<!-- Responsive flex direction -->
<div class="flex-xs-col flex-md-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Responsive justification -->
<div class="justify-xs-center justify-md-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

#### Responsive Grid Columns

```html
<div class="grid">
  <div class="col-xs-full col-md-2 col-lg-1">Responsive spans</div>
  <div class="col-xs-full col-md-2 col-lg-3">Responsive spans</div>
</div>
```

### Header Layout

#### Basic Header

```html
<header class="header">
  <div class="header-content">
    <a href="/" class="header-brand">
      <img src="logo.svg" alt="Logo" class="header-logo">
      <span class="header-title">Site Title</span>
    </a>
    
    <nav class="header-nav">
      <ul class="header-nav-list">
        <li class="header-nav-item">
          <a href="/about" class="header-nav-link">About</a>
        </li>
        <li class="header-nav-item">
          <a href="/services" class="header-nav-link">Services</a>
        </li>
      </ul>
    </nav>
    
    <div class="header-actions">
      <input type="search" class="header-search" placeholder="Search...">
      <a href="/contact" class="btn btn-primary header-cta">Contact</a>
      <button class="header-menu-toggle">
        <span class="header-menu-icon"><span></span></span>
      </button>
    </div>
  </div>
  
  <!-- Mobile menu -->
  <div class="header-mobile-menu">
    <nav class="header-mobile-nav">
      <ul class="header-mobile-nav-list">
        <li class="header-mobile-nav-item">
          <a href="/about" class="header-mobile-nav-link">About</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

#### Header Variants

```html
<!-- Sticky header -->
<header class="header header-sticky">...</header>

<!-- Fixed header -->
<header class="header header-fixed">...</header>

<!-- Transparent header (for hero sections) -->
<header class="header header-transparent">...</header>

<!-- Compact header -->
<header class="header header-compact">...</header>
```

### Footer Layout

#### Basic Footer

```html
<footer class="footer">
  <div class="footer-main">
    <div class="footer-content">
      <div class="footer-grid">
        <!-- Brand section -->
        <div class="footer-section footer-brand">
          <img src="logo.svg" alt="Logo" class="footer-logo">
          <p class="footer-description">Company description</p>
          <div class="footer-social">
            <a href="#" class="footer-social-link">Social</a>
          </div>
        </div>
        
        <!-- Navigation sections -->
        <div class="footer-section footer-nav">
          <h4>Products</h4>
          <ul class="footer-nav-list">
            <li><a href="#" class="footer-nav-link">Product 1</a></li>
            <li><a href="#" class="footer-nav-link">Product 2</a></li>
          </ul>
        </div>
        
        <!-- Newsletter section -->
        <div class="footer-section footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter</p>
          <form class="footer-newsletter-form">
            <input type="email" class="footer-newsletter-input" placeholder="Email">
            <button type="submit" class="footer-newsletter-button">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <div class="footer-bottom-content">
      <p class="footer-copyright">&copy; 2024 Company Name</p>
      <ul class="footer-legal">
        <li><a href="#" class="footer-legal-link">Privacy</a></li>
        <li><a href="#" class="footer-legal-link">Terms</a></li>
      </ul>
    </div>
  </div>
</footer>
```

#### Footer Variants

```html
<!-- Light footer -->
<footer class="footer footer-light">...</footer>

<!-- Compact footer -->
<footer class="footer footer-compact">...</footer>
```

## Best Practices

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```scss
.component {
  // Mobile styles (default)
  display: block;
  
  @include respond-to(md) {
    // Tablet styles
    display: flex;
  }
  
  @include respond-to(lg) {
    // Desktop styles
    gap: var(--ce-space-layout-lg);
  }
}
```

### Grid vs Flexbox

- **Use CSS Grid for**: Two-dimensional layouts, card grids, complex layouts
- **Use Flexbox for**: One-dimensional layouts, navigation, simple alignment

### Performance Considerations

- Use `grid-auto-fit` for responsive grids without media queries
- Prefer CSS Grid over complex flexbox layouts
- Use container queries when browser support improves

### Accessibility

- Ensure proper heading hierarchy in layout components
- Use semantic HTML elements (`header`, `nav`, `main`, `footer`)
- Provide focus indicators for interactive elements
- Test with screen readers and keyboard navigation

## Browser Support

- **CSS Grid**: IE 11+ (with prefixes), all modern browsers
- **Flexbox**: IE 10+, all modern browsers
- **Custom Properties**: IE 11+ (with PostCSS), all modern browsers

## Examples

See the `examples/` directory for complete layout examples and patterns. 