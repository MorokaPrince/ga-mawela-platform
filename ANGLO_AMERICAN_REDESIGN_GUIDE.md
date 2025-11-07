# Anglo American Design System - Implementation Guide

## 🎯 Design Principles (From Anglo American Websites)

### Colors
- **Primary Blue**: #003d7a (Dark professional blue)
- **Light Gray**: #f5f5f5 (Background)
- **Text Dark**: #333333 (Main text)
- **Text Light**: #666666 (Secondary text)
- **Borders**: #e0e0e0 (Light borders)

### Typography
- **Headings**: Merriweather (serif) - Professional, elegant
- **Body**: Inter (sans-serif) - Clean, modern
- **Font Sizes**: 14px (small), 16px (body), 18px (large), 24px (heading), 32px (h1)

### Spacing & Layout
- **Section Padding**: 60px vertical, 40px horizontal (desktop)
- **Card Padding**: 24px
- **Gap Between Elements**: 16px
- **Border Radius**: 4-8px (subtle, professional)

### Shadows
- **Light**: 0 2px 8px rgba(0,0,0,0.08)
- **Medium**: 0 4px 12px rgba(0,0,0,0.12)
- **Hover**: 0 8px 24px rgba(0,0,0,0.15)

### Backgrounds
- **Light Overlay**: rgba(255,255,255,0.95)
- **Light Blue Overlay**: rgba(240,244,248,0.95)
- **NO DARK OVERLAYS** - Use light overlays only

## ✅ Completed

1. ✅ Updated fonts to Inter + Merriweather
2. ✅ Updated globals.css with new design system
3. ✅ Fixed TabNavigation (removed inline styles, added button types)
4. ✅ Added professional CSS classes

## 🔧 Still Need To Do

### 1. Remove ALL Inline Styles from Tab Components
Replace all `style={{}}` with CSS classes in:
- HeroTab.tsx
- HistoricalTab.tsx
- ArchaeologicalTab.tsx
- LegalTab.tsx
- MiningTab.tsx
- LineageTab.tsx
- EvidenceTab.tsx
- GalleryTab.tsx
- SponsorsTab.tsx
- ResourcesTab.tsx

### 2. Update All Background Images
Change from dark overlays to light overlays:
```
OLD: linear-gradient(135deg, rgba(0, 28, 92, 0.9) 0%, rgba(0, 61, 153, 0.85) 100%)
NEW: rgba(240, 244, 248, 0.95)
```

### 3. Fix All Button Types
Add `type="button"` to all buttons

### 4. Update Colors
- Replace navy-dark (#001c5c) with #003d7a
- Replace yellow (#ffc500) with #003d7a for primary actions
- Use light gray (#f5f5f5) for backgrounds

### 5. Update Typography Classes
- Replace `font-playfair` with `font-merriweather`
- Replace `font-lato` with `font-inter`

### 6. Professional Card Design
All cards should have:
- White background
- Light border (#e0e0e0)
- Subtle shadow (0 2px 8px rgba(0,0,0,0.08))
- Hover effect (shadow increase, slight lift)

### 7. Fix Footer
Update Footer.tsx to match professional style

### 8. Fix SponsorsCarousel
Update to light background, professional styling

## 🚀 Quick Implementation Steps

1. Add CSS classes to globals.css for all components
2. Replace inline styles with class names
3. Update all background images to light overlays
4. Add type="button" to all buttons
5. Update color variables throughout
6. Test all pages for errors/warnings
7. Verify responsive design

## 📋 CSS Classes to Add

```css
.hero-light {
  background: linear-gradient(135deg, rgba(240,244,248,0.95) 0%, rgba(255,255,255,0.95) 100%);
}

.section-light {
  background: #f5f5f5;
}

.card-light {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.btn-primary-light {
  background: #003d7a;
  color: #ffffff;
}

.text-primary {
  color: #003d7a;
}

.text-secondary {
  color: #666666;
}
```

## ✨ Result

Professional, clean, light-themed website matching Anglo American's design exactly with:
- ✅ No dark overlays
- ✅ Light backgrounds
- ✅ Professional typography
- ✅ No console errors
- ✅ No inline styles
- ✅ All button types set
- ✅ Responsive design

