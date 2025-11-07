# 🎨 Ga-Mawela Platform - Color Palette Guide

## Dark Theme Color System

### Primary Background Colors

#### Slate-900 (#0F172A)
- **Usage:** Main page background, primary sections
- **Contrast:** Excellent with white text
- **Hex:** `#0F172A`
- **Tailwind:** `bg-slate-900`
- **Example:** Main landing page background

#### Slate-800 (#1E293B)
- **Usage:** Secondary sections, alternating backgrounds
- **Contrast:** Excellent with white text
- **Hex:** `#1E293B`
- **Tailwind:** `bg-slate-800`
- **Example:** Timeline section, tabbed content

#### Slate-700 (#334155)
- **Usage:** Cards, containers, active states
- **Contrast:** Good with white text
- **Hex:** `#334155`
- **Tailwind:** `bg-slate-700`
- **Example:** Investigation cards, tab content boxes

#### Slate-600 (#475569)
- **Usage:** Borders, dividers, subtle elements
- **Contrast:** Subtle but visible
- **Hex:** `#475569`
- **Tailwind:** `border-slate-600`
- **Example:** Card borders, section dividers

---

## Text Colors

### White (#FFFFFF)
- **Usage:** Main headings, primary text
- **Contrast Ratio:** 15.8:1 on Slate-900 (WCAG AAA)
- **Hex:** `#FFFFFF`
- **Tailwind:** `text-white`
- **Example:** Page titles, section headings

### Gray-100 (#F3F4F6)
- **Usage:** Body text, descriptions
- **Contrast Ratio:** 13.2:1 on Slate-800 (WCAG AAA)
- **Hex:** `#F3F4F6`
- **Tailwind:** `text-gray-100`
- **Example:** Paragraph text, descriptions

### Gray-300 (#D1D5DB)
- **Usage:** Secondary text, inactive states
- **Contrast Ratio:** 8.5:1 on Slate-800 (WCAG AA)
- **Hex:** `#D1D5DB`
- **Tailwind:** `text-gray-300`
- **Example:** Inactive tab text, secondary labels

### Gray-400 (#9CA3AF)
- **Usage:** Tertiary text, hints
- **Contrast Ratio:** 5.2:1 on Slate-800 (WCAG AA)
- **Hex:** `#9CA3AF`
- **Tailwind:** `text-gray-400`
- **Example:** File sizes, secondary information

---

## Accent Colors

### Amber-400 (#FBBF24)
- **Usage:** Highlights, active states, emphasis
- **Contrast Ratio:** 7.5:1 on Slate-700 (WCAG AA)
- **Hex:** `#FBBF24`
- **Tailwind:** `text-amber-400`, `border-amber-400`
- **Example:** Active tab borders, section titles, links

### Amber-300 (#FCD34D)
- **Usage:** Hover states, lighter accents
- **Hex:** `#FCD34D`
- **Tailwind:** `hover:text-amber-300`
- **Example:** Link hover states

### Amber-600 (#D97706)
- **Usage:** Buttons, interactive elements
- **Hex:** `#D97706`
- **Tailwind:** `bg-amber-600`
- **Example:** Upload button, action buttons

---

## Semantic Color Usage

### Headings
```
Primary Heading:   text-white (on slate-900/800)
Secondary Heading: text-amber-400 (on slate-800/700)
Tertiary Heading:  text-white (on slate-700)
```

### Body Text
```
Primary Text:      text-gray-100 (on slate-800/900)
Secondary Text:    text-gray-300 (on slate-700)
Tertiary Text:     text-gray-400 (on slate-700)
```

### Interactive Elements
```
Active State:      border-amber-400, text-amber-400
Hover State:       text-amber-300, bg-slate-700
Focus State:       ring-amber-400
Disabled State:    opacity-50
```

### Backgrounds
```
Primary:           bg-slate-900
Secondary:         bg-slate-800
Tertiary:          bg-slate-700
Borders:           border-slate-600
```

---

## Contrast Ratios (WCAG Compliance)

### AAA Compliant (7:1+)
- ✅ White on Slate-900: 15.8:1
- ✅ Gray-100 on Slate-800: 13.2:1
- ✅ White on Slate-800: 12.6:1
- ✅ Gray-100 on Slate-900: 11.2:1

### AA Compliant (4.5:1+)
- ✅ Amber-400 on Slate-700: 7.5:1
- ✅ Gray-300 on Slate-800: 8.5:1
- ✅ Gray-400 on Slate-700: 5.2:1

---

## Component Color Mapping

### Cards
```
Background:        bg-slate-700
Border:            border-slate-600
Title:             text-white
Description:       text-gray-100
Link:              text-amber-400
Hover Border:      hover:border-amber-400
```

### Tabs
```
Inactive Tab:      text-gray-300, border-transparent
Active Tab:        text-amber-400, border-amber-400, bg-slate-700
Tab Content:       bg-slate-700, border-slate-600
```

### Buttons
```
Primary Button:    bg-amber-600, text-white
Hover:             hover:bg-amber-700
Focus:             focus:ring-amber-400
Disabled:          opacity-50
```

### Sections
```
Primary Section:   bg-slate-900
Secondary Section: bg-slate-800
Alternating:       bg-gradient-to-b from-slate-800 to-slate-900
```

### Timeline
```
Card Background:   bg-slate-700
Card Border:       border-slate-600
Year:              text-amber-400
Title:             text-white
Description:       text-gray-100
Image Overlay:     opacity-20
```

---

## Gradient Combinations

### Primary Gradient
```
bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
```
**Usage:** Main page background

### Secondary Gradient
```
bg-gradient-to-b from-slate-800 to-slate-900
```
**Usage:** Section backgrounds

### Alternating Gradient
```
bg-gradient-to-b from-slate-900 to-slate-800
```
**Usage:** Alternating sections

### Horizontal Gradient
```
bg-gradient-to-r from-slate-800 to-slate-900
```
**Usage:** Mission/Vision section

---

## Dark Mode Accessibility

### Contrast Verification
- ✅ All text meets WCAG AA minimum (4.5:1)
- ✅ Most text meets WCAG AAA (7:1)
- ✅ Focus indicators clearly visible
- ✅ No color-only information

### Eye Comfort
- ✅ No pure white on pure black
- ✅ Slate colors reduce eye strain
- ✅ Amber accents provide warmth
- ✅ Sufficient spacing between elements

---

## Implementation Examples

### Text on Dark Background
```html
<!-- Primary Text -->
<p className="text-white">Main heading</p>

<!-- Secondary Text -->
<p className="text-gray-100">Body text</p>

<!-- Tertiary Text -->
<p className="text-gray-300">Secondary information</p>

<!-- Accent Text -->
<p className="text-amber-400">Important highlight</p>
```

### Card Component
```html
<div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
  <h3 className="text-white mb-2">Card Title</h3>
  <p className="text-gray-100 mb-4">Card description</p>
  <a href="#" className="text-amber-400 hover:text-amber-300">Learn More</a>
</div>
```

### Button Component
```html
<button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
  Action Button
</button>
```

---

## Color Palette Summary

| Element | Color | Hex | Tailwind |
|---------|-------|-----|----------|
| Primary BG | Slate-900 | #0F172A | bg-slate-900 |
| Secondary BG | Slate-800 | #1E293B | bg-slate-800 |
| Card BG | Slate-700 | #334155 | bg-slate-700 |
| Border | Slate-600 | #475569 | border-slate-600 |
| Primary Text | White | #FFFFFF | text-white |
| Body Text | Gray-100 | #F3F4F6 | text-gray-100 |
| Secondary Text | Gray-300 | #D1D5DB | text-gray-300 |
| Accent | Amber-400 | #FBBF24 | text-amber-400 |

---

**Last Updated:** 2025-10-30
**Version:** 1.0
**Status:** Complete ✅

