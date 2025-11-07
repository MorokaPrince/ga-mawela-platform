# Ga-Mawela Platform - Developer Quick Start Guide

## Project Structure

```
ga-mawela-platform/
├── ga-mawela/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Home page (updated)
│   │   │   ├── globals.css           # Global styles (updated)
│   │   │   ├── lineage/
│   │   │   ├── upload/
│   │   │   ├── investigations/
│   │   │   └── admin/
│   │   ├── components/
│   │   │   ├── Hero.tsx              # Enhanced
│   │   │   ├── ImageCarousel.tsx     # NEW
│   │   │   ├── TabbedContent.tsx     # NEW
│   │   │   ├── TabbedLandingPage.tsx # NEW
│   │   │   ├── InvestigationCard.tsx # Enhanced
│   │   │   ├── Timeline.tsx
│   │   │   └── LandingPageSections.tsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.ts
│   │   └── lib/
│   ├── public/
│   │   └── Images/                   # 40+ project images
│   ├── package.json
│   └── tailwind.config.js
├── IMPLEMENTATION_SUMMARY.md         # NEW
├── COMPONENT_SHOWCASE.md             # NEW
├── BEFORE_AFTER_COMPARISON.md        # NEW
└── DEVELOPER_GUIDE.md                # NEW (this file)
```

---

## Getting Started

### 1. Installation
```bash
cd ga-mawela-platform/ga-mawela
npm install
```

### 2. Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

---

## Key Technologies

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library
- **Framer Motion** - Animation library (optional)

---

## New Components

### 1. ImageCarousel
**Location:** `src/components/ImageCarousel.tsx`

**Usage:**
```tsx
import ImageCarousel from '@/components/ImageCarousel';

<ImageCarousel
  images={[
    { src: "/path/to/image.png", alt: "Description", caption: "Caption" },
  ]}
  autoPlay={true}
  autoPlayInterval={6000}
/>
```

**Props:**
- `images` (required) - Array of carousel images
- `autoPlay` (optional) - Enable auto-play (default: true)
- `autoPlayInterval` (optional) - Interval in ms (default: 5000)

---

### 2. TabbedContent
**Location:** `src/components/TabbedContent.tsx`

**Usage:**
```tsx
import TabbedContent from '@/components/TabbedContent';

<TabbedContent
  tabs={[
    {
      id: 'tab1',
      label: 'Tab 1',
      icon: <Icon />,
      content: <Content />
    },
  ]}
  defaultTab="tab1"
/>
```

**Props:**
- `tabs` (required) - Array of tab objects
- `defaultTab` (optional) - Default active tab ID
- `className` (optional) - Additional CSS classes

---

### 3. TabbedLandingPage
**Location:** `src/components/TabbedLandingPage.tsx`

**Usage:**
```tsx
import TabbedLandingPage from '@/components/TabbedLandingPage';

<TabbedLandingPage
  carouselImages={[
    { src: "/path/to/image.png", alt: "Alt", caption: "Caption" },
  ]}
/>
```

**Props:**
- `carouselImages` (optional) - Array of carousel images

---

## Styling Guide

### Color Variables
```css
:root {
  --color-primary-dark: #003366;      /* Deep blue */
  --color-primary: #0052a3;           /* Primary blue */
  --color-primary-light: #1e7bc4;     /* Light blue */
  --color-primary-lighter: #4a9fd8;   /* Lighter blue */
  --color-primary-lightest: #e8f2f9;  /* Very light blue */
}
```

### Using Colors in Components
```tsx
// Tailwind classes
className="text-blue-600"           // Primary blue
className="bg-blue-50"              // Light background
className="hover:text-blue-700"     // Hover state

// CSS variables
color: var(--color-primary);
background: var(--gradient-primary);
```

---

## Animation Classes

### Available Animations
```css
.animate-fade-in        /* Fade in */
.animate-slide-in-up    /* Slide up */
.animate-slide-in-left  /* Slide left */
.animate-slide-in-right /* Slide right */
.animate-scale-in       /* Scale up */
```

### Using Animations
```tsx
<div className="animate-fade-in">
  Content fades in
</div>

<div className="animate-slide-in-up">
  Content slides up
</div>
```

### Accessibility
Animations automatically respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-* {
    animation: none;
  }
}
```

---

## Adding New Carousel Images

### 1. Add Image to Public Folder
```
public/Images/your-image.png
```

### 2. Update Carousel in Home Page
```tsx
// src/app/page.tsx
<TabbedLandingPage
  carouselImages={[
    {
      src: "/Images/your-image.png",
      alt: "Description",
      caption: "Optional caption"
    },
    // ... existing images
  ]}
/>
```

---

## Adding New Tabs

### 1. Create Tab Content
```tsx
const newTab = {
  id: 'new-tab',
  label: 'New Tab',
  icon: <Icon size={18} />,
  content: (
    <div>
      <h3>Tab Title</h3>
      <p>Tab content here...</p>
    </div>
  )
};
```

### 2. Add to Tabs Array
```tsx
const tabs = [
  // ... existing tabs
  newTab
];
```

---

## Customizing Components

### Hero Component
**File:** `src/components/Hero.tsx`

**Customize:**
- Background image
- Title and subtitle
- CTA buttons
- Overlay opacity

### Investigation Card
**File:** `src/components/InvestigationCard.tsx`

**Customize:**
- Card styling
- Hover effects
- Link text
- Background image

---

## Performance Tips

### 1. Image Optimization
```tsx
<Image
  src={image.src}
  alt={image.alt}
  fill
  priority={index === 0}  // Prioritize first image
  sizes="(max-width: 640px) 100vw, 80vw"
/>
```

### 2. Lazy Loading
```tsx
// Images load only when needed
<Image
  src={image.src}
  alt={image.alt}
  loading="lazy"
/>
```

### 3. Animation Performance
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `left`, `top`
- Use `will-change` sparingly

---

## Accessibility Checklist

- [x] ARIA labels on interactive elements
- [x] Keyboard navigation support
- [x] Focus indicators visible
- [x] Color contrast WCAG AA compliant
- [x] Alt text on all images
- [x] Semantic HTML structure
- [x] Screen reader friendly
- [x] Respects `prefers-reduced-motion`

---

## Testing

### Manual Testing
1. Test carousel navigation
2. Test tab switching
3. Test responsive design
4. Test keyboard navigation
5. Test screen reader
6. Test animations

### Browser Testing
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

---

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t ga-mawela .
docker run -p 3000:3000 ga-mawela
```

---

## Troubleshooting

### Carousel Not Auto-Playing
- Check `autoPlay` prop is `true`
- Check `autoPlayInterval` is set
- Check browser console for errors

### Tabs Not Switching
- Verify tab IDs are unique
- Check `defaultTab` matches a tab ID
- Check browser console for errors

### Animations Not Working
- Check CSS is loaded
- Check `prefers-reduced-motion` setting
- Check browser support

---

## Common Tasks

### Add New Page
```bash
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

### Add New Component
```bash
touch src/components/NewComponent.tsx
```

### Update Styles
Edit `src/app/globals.css`

### Add New Hook
```bash
touch src/hooks/useNewHook.ts
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [TypeScript](https://www.typescriptlang.org)

---

## Support

For issues or questions:
1. Check the documentation files
2. Review component examples
3. Check browser console for errors
4. Review git commit history

---

**Last Updated:** 2025-10-30
**Status:** ✅ Production Ready

