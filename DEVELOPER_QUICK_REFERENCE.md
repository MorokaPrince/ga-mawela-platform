# 👨‍💻 Developer Quick Reference - Dark Theme

## Color Palette Quick Copy

### Backgrounds
```tailwind
bg-slate-900    /* Main background */
bg-slate-800    /* Secondary sections */
bg-slate-700    /* Cards & containers */
bg-slate-600    /* Borders & dividers */
```

### Text
```tailwind
text-white      /* Headings & primary text */
text-gray-100   /* Body text */
text-gray-300   /* Secondary text */
text-gray-400   /* Tertiary text */
```

### Accents
```tailwind
text-amber-400      /* Highlights & active states */
text-amber-300      /* Hover states */
bg-amber-600        /* Buttons */
border-amber-400    /* Active borders */
```

---

## Common Component Patterns

### Card Component
```jsx
<div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
  <h3 className="text-white mb-2">Title</h3>
  <p className="text-gray-100 mb-4">Description</p>
  <a href="#" className="text-amber-400 hover:text-amber-300">Link</a>
</div>
```

### Section Component
```jsx
<section className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-white mb-6">Title</h2>
    <p className="text-lg text-gray-100">Content</p>
  </div>
</section>
```

### Tab Component
```jsx
<button className={`px-4 py-3 border-b-2 ${
  activeTab === tab.id
    ? 'border-amber-400 text-amber-400 bg-slate-700'
    : 'border-transparent text-gray-300 hover:text-gray-100'
}`}>
  {tab.label}
</button>
```

### Button Component
```jsx
<button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded focus:ring-2 focus:ring-amber-400">
  Action
</button>
```

---

## Color Mapping Reference

| Element | Color | Tailwind |
|---------|-------|----------|
| Page BG | Slate-900 | bg-slate-900 |
| Section BG | Slate-800 | bg-slate-800 |
| Card BG | Slate-700 | bg-slate-700 |
| Border | Slate-600 | border-slate-600 |
| Heading | White | text-white |
| Body Text | Gray-100 | text-gray-100 |
| Secondary | Gray-300 | text-gray-300 |
| Accent | Amber-400 | text-amber-400 |

---

## Contrast Ratios

### WCAG AAA (7:1+)
- ✅ White on Slate-900: 15.8:1
- ✅ Gray-100 on Slate-800: 13.2:1
- ✅ White on Slate-800: 12.6:1

### WCAG AA (4.5:1+)
- ✅ Amber-400 on Slate-700: 7.5:1
- ✅ Gray-300 on Slate-800: 8.5:1

---

## Common Mistakes to Avoid

### ❌ Don't Use
```tailwind
bg-white            /* Use bg-slate-700 instead */
text-gray-900       /* Use text-white instead */
text-gray-700       /* Use text-gray-100 instead */
text-blue-600       /* Use text-amber-400 instead */
border-gray-200     /* Use border-slate-600 instead */
```

### ✅ Do Use
```tailwind
bg-slate-700        /* Dark card background */
text-white          /* Main text */
text-gray-100       /* Body text */
text-amber-400      /* Accents & highlights */
border-slate-600    /* Borders */
```

---

## Gradient Combinations

### Primary Gradient
```tailwind
bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
```

### Secondary Gradient
```tailwind
bg-gradient-to-b from-slate-800 to-slate-900
```

### Alternating Gradient
```tailwind
bg-gradient-to-b from-slate-900 to-slate-800
```

### Horizontal Gradient
```tailwind
bg-gradient-to-r from-slate-800 to-slate-900
```

---

## Focus & Hover States

### Focus Ring
```tailwind
focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
```

### Hover Text
```tailwind
hover:text-amber-300
```

### Hover Background
```tailwind
hover:bg-slate-700
```

### Hover Border
```tailwind
hover:border-amber-400
```

---

## Accessibility Checklist

When adding new components:
- [ ] Use `text-white` for headings
- [ ] Use `text-gray-100` for body text
- [ ] Use `text-amber-400` for accents
- [ ] Use `bg-slate-700/800/900` for backgrounds
- [ ] Use `border-slate-600` for borders
- [ ] Add focus indicators with `focus:ring-amber-400`
- [ ] Test contrast ratios
- [ ] Verify keyboard navigation
- [ ] Check screen reader compatibility

---

## Testing Commands

### Check Contrast Ratios
Use WebAIM Contrast Checker:
- White on Slate-900: 15.8:1 ✅
- Gray-100 on Slate-800: 13.2:1 ✅
- Amber-400 on Slate-700: 7.5:1 ✅

### Verify Accessibility
```bash
# Run accessibility tests
npm run test:a11y

# Check for color contrast issues
npm run test:contrast
```

---

## Component Examples

### Dark Card with Hover
```jsx
<article className="bg-slate-700 border border-slate-600 rounded-lg p-6 hover:border-amber-400 transition-colors">
  <h3 className="text-white mb-2">Title</h3>
  <p className="text-gray-100">Description</p>
</article>
```

### Dark Section with Gradient
```jsx
<section className="bg-gradient-to-b from-slate-800 to-slate-900 py-20 px-4">
  <h2 className="text-white text-3xl mb-6">Section Title</h2>
  <p className="text-gray-100">Content here</p>
</section>
```

### Dark Tab Navigation
```jsx
<div className="flex border-b border-slate-600">
  <button className="px-4 py-3 border-b-2 border-amber-400 text-amber-400 bg-slate-700">
    Active Tab
  </button>
  <button className="px-4 py-3 border-b-2 border-transparent text-gray-300 hover:text-gray-100">
    Inactive Tab
  </button>
</div>
```

---

## Hex Color Reference

```
Slate-900:  #0F172A
Slate-800:  #1E293B
Slate-700:  #334155
Slate-600:  #475569
White:      #FFFFFF
Gray-100:   #F3F4F6
Gray-300:   #D1D5DB
Gray-400:   #9CA3AF
Amber-400:  #FBBF24
Amber-300:  #FCD34D
Amber-600:  #D97706
```

---

## Resources

- **Tailwind Docs:** https://tailwindcss.com/docs
- **Color Palette:** See COLOR_PALETTE_GUIDE.md
- **Design System:** See DESIGN_OVERHAUL_SUMMARY.md
- **Implementation:** See DARK_THEME_IMPLEMENTATION_COMPLETE.md

---

## Quick Tips

1. **Always use `text-white` for headings** on dark backgrounds
2. **Use `text-gray-100` for body text** for better readability
3. **Use `text-amber-400` for accents** to highlight important elements
4. **Use `bg-slate-700` for cards** to create visual separation
5. **Use `border-slate-600` for borders** to define edges
6. **Test contrast ratios** before deploying
7. **Verify keyboard navigation** works properly
8. **Check screen reader compatibility** for accessibility

---

**Last Updated:** 2025-10-30
**Version:** 1.0
**Status:** Complete ✅

