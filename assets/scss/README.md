# Credential Engine Design System - SCSS Architecture

This directory contains the modular SCSS architecture for the Democratizing Data website, inspired by the Credential Engine design system.

## 📁 Directory Structure

```
assets/scss/
├── main.scss                 # Main entry point
├── abstracts/               # Variables, functions, mixins, placeholders
│   ├── _variables.scss      # Design tokens and SCSS variables
│   ├── _functions.scss      # Utility functions
│   ├── _mixins.scss         # Reusable mixins
│   └── _placeholders.scss   # Reusable placeholders
├── base/                    # Reset, normalize, base element styles
│   ├── _reset.scss          # Modern CSS reset
│   ├── _typography.scss     # Base typography styles
│   └── _elements.scss       # Base element styles
├── layout/                  # Grid systems, containers, layout patterns
│   ├── _grid.scss           # Grid system
│   ├── _containers.scss     # Container styles
│   ├── _header.scss         # Header layout
│   ├── _footer.scss         # Footer layout
│   └── _navigation.scss     # Navigation layout
├── components/              # Reusable UI components
│   ├── _buttons.scss        # Button components
│   ├── _cards.scss          # Card components
│   ├── _forms.scss          # Form components
│   ├── _alerts.scss         # Alert components
│   ├── _badges.scss         # Badge components
│   ├── _navigation.scss     # Navigation components
│   ├── _modals.scss         # Modal components
│   └── _tables.scss         # Table components
├── utilities/               # Helper classes and utility styles
│   ├── _spacing.scss        # Spacing utilities
│   ├── _typography.scss     # Typography utilities
│   ├── _colors.scss         # Color utilities
│   ├── _display.scss        # Display utilities
│   ├── _positioning.scss    # Positioning utilities
│   ├── _responsive.scss     # Responsive utilities
│   └── _accessibility.scss  # Accessibility utilities
└── _shame.scss              # Temporary fixes and hacks
```

## 🎯 Architecture Principles

### 1. **ITCSS (Inverted Triangle CSS)**
The architecture follows ITCSS principles, organizing CSS from generic to specific:

1. **Abstracts** - Variables, functions, mixins (no CSS output)
2. **Base** - Reset, normalize, element defaults
3. **Layout** - Grid systems, containers, structural patterns
4. **Components** - Reusable UI components
5. **Utilities** - Helper classes and overrides
6. **Shame** - Temporary fixes and hacks

### 2. **Modular Organization**
- Each file has a single responsibility
- Components are self-contained
- Dependencies are clearly defined
- Easy to maintain and scale

### 3. **Design Token Integration**
- All design tokens are centralized in `_variables.scss`
- Consistent naming conventions
- Easy theming and customization

## 🚀 Getting Started

### Compiling SCSS

The main entry point is `main.scss`. This file imports all partials in the correct order.

```scss
// Import the main SCSS file
@import 'scss/main';
```

### Using Design Tokens

All design tokens are available as SCSS variables:

```scss
// Colors
.my-component {
  background-color: $color-primary;
  color: $color-text-white;
  border: 1px solid $color-border-light;
}

// Spacing
.my-component {
  padding: $space-4 $space-6;
  margin-bottom: $space-8;
}

// Typography
.my-heading {
  font-size: $font-size-h2;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}
```

### Using Mixins

Leverage the provided mixins for common patterns:

```scss
.my-button {
  @include button-base;
  @include button-variant($color-primary, $color-text-white);
  @include button-size($button-padding-md, $font-size-body);
}

.my-container {
  @include container($container-lg);
}

.my-responsive-grid {
  @include grid-auto-fit(300px, $space-6);
  
  @include respond-to(lg) {
    @include grid-columns(4, $space-8);
  }
}
```

### Using Placeholders

Extend placeholders for consistent styling:

```scss
.primary-button {
  @extend %button-primary;
}

.card-component {
  @extend %card-base;
}

.visually-hidden-text {
  @extend %visually-hidden;
}
```

## 📝 Naming Conventions

### Variables
- Use kebab-case: `$color-primary`, `$space-component-lg`
- Prefix with category: `$color-`, `$space-`, `$font-`
- Use semantic names: `$color-text-primary` vs `$color-gray-900`

### Mixins
- Use kebab-case: `@mixin button-variant`, `@mixin respond-to`
- Use verbs when appropriate: `@mixin flex-center`, `@mixin text-truncate`

### Placeholders
- Use kebab-case with % prefix: `%button-primary`, `%card-base`
- Mirror component names: `%button-base`, `%input-base`

### Classes
- Use BEM methodology: `.component__element--modifier`
- Use kebab-case: `.primary-button`, `.card-header`

## 🎨 Design System Integration

### Color System
```scss
// Primary colors
$color-primary: #1f4e79;
$color-primary-light: #2563eb;
$color-primary-dark: #1e3a8a;

// Semantic colors
$color-success: #10b981;
$color-warning: #f59e0b;
$color-error: #ef4444;
```

### Spacing System
```scss
// 8px base system
$space-base: 8px;
$space-1: 4px;    // 0.5 * base
$space-2: 8px;    // 1 * base
$space-4: 16px;   // 2 * base
$space-6: 24px;   // 3 * base
```

### Typography System
```scss
// Font sizes
$font-size-h1: 2.5rem;   // 40px
$font-size-h2: 2rem;     // 32px
$font-size-body: 1rem;   // 16px

// Font weights
$font-weight-normal: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

## 📱 Responsive Design

### Breakpoints
```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;
```

### Responsive Mixins
```scss
// Mobile-first approach
.my-component {
  padding: $space-4;
  
  @include respond-to(md) {
    padding: $space-6;
  }
  
  @include respond-to(lg) {
    padding: $space-8;
  }
}
```

## 🔧 Maintenance Guidelines

### Adding New Components
1. Create a new file in the appropriate directory
2. Follow the established naming conventions
3. Use existing design tokens and mixins
4. Add the import to `main.scss`
5. Document any new patterns

### Modifying Existing Styles
1. Check if changes affect other components
2. Update design tokens rather than hardcoding values
3. Test across all breakpoints
4. Update documentation if needed

### Performance Considerations
- Use placeholders for repeated patterns
- Avoid deep nesting (max 3 levels)
- Group related properties
- Use shorthand properties when possible

## 🧪 Testing

### Browser Testing
- Test in all supported browsers
- Verify responsive behavior
- Check accessibility features
- Validate color contrast

### Code Quality
- Use Sass linting tools
- Follow established conventions
- Keep specificity low
- Avoid `!important` unless necessary

## 📚 Resources

- [ITCSS Architecture](https://itcss.io/)
- [BEM Methodology](http://getbem.com/)
- [Sass Guidelines](https://sass-guidelin.es/)
- [CSS Architecture Best Practices](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)

## 🤝 Contributing

When contributing to the SCSS architecture:

1. Follow the established patterns and conventions
2. Test your changes thoroughly
3. Update documentation as needed
4. Consider the impact on existing components
5. Use the shame file for temporary fixes only 