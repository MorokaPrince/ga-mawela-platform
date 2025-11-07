# 🚀 QUICK START GUIDE

## ⚡ Get Started in 30 Seconds

### 1. Start the Development Server
```bash
cd ga-mawela
npm run dev
```

### 2. Open in Browser
```
http://localhost:3000
```

### 3. Explore the Site
- **Scroll down** to navigate through sections
- **Click menu items** to jump to sections
- **Interact** with cards, modals, and accordions
- **Hover** over elements to see effects

---

## 📱 What You'll See

### Full-Height Sections (Scroll Snap)
1. **Navigation** - Fixed top menu
2. **Hero** - "Ga-Mawela: The Truth Restored"
3. **Timeline** - Historical events (1800s → Present)
4. **Lineage** - Masetu family heritage
5. **Corporate** - Anglo American, Implats, ARM
6. **Gallery** - 40+ heritage images
7. **Evidence** - Documents and testimonies
8. **Sponsors** - Supporting organizations
9. **Legal/FAQ** - Questions and answers
10. **Footer** - Contact and links

---

## 🎨 Design Features

✨ **Professional Design** - Anglo American corporate style
✨ **Smooth Navigation** - Scroll snap between sections
✨ **Interactive Elements** - Modals, accordions, filters
✨ **Responsive** - Works on mobile, tablet, desktop
✨ **Fast** - Optimized images and lazy loading
✨ **Accessible** - WCAG AA compliant

---

## 🎯 Key Interactions

### Navigation
- **Desktop:** Click menu items to jump to sections
- **Mobile:** Tap hamburger menu (☰) for dropdown
- **Scroll:** Smooth scroll-snap between sections

### Gallery
- **Click image** → Opens lightbox modal
- **Click X** → Closes modal
- **Load More** → Shows additional images

### FAQ
- **Click question** → Expands answer
- **Click again** → Collapses answer
- **Filter buttons** → Show specific categories

### Corporate Cards
- **Click card** → Shows detailed information
- **Hover** → Card scales and highlights

### Evidence
- **Filter buttons** → Show by type (deed, letter, document, photo)
- **Hover** → Cards scale up

---

## 📁 File Locations

### Images
- **Backgrounds:** `public/Images/Backrounds/`
- **Gallery:** `public/Images/Gallery/`
- **Sponsors:** `public/Images/sponsours/`

### Components
- **Main Page:** `src/app/page.tsx`
- **Styles:** `src/app/globals.css`
- **Sections:** `src/components/VerticalLayout/`

---

## 🔧 Common Tasks

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --color-navy-dark: #001c5c;
  --color-yellow: #ffc500;
  --color-turquoise: #00a8a8;
}
```

### Add New Section
1. Create component in `src/components/VerticalLayout/`
2. Import in `src/app/page.tsx`
3. Add to JSX between other sections

### Update Content
Edit the component files directly:
- `Hero.tsx` - Hero section text
- `TimelineSection.tsx` - Timeline events
- `LegalSection.tsx` - FAQ items
- etc.

### Add Images
1. Place images in `public/Images/`
2. Reference in components:
```tsx
<Image src="/Images/filename.jpg" alt="description" />
```

---

## 📊 Color Reference

| Use | Color | Hex |
|-----|-------|-----|
| Primary Background | Navy Dark | #001c5c |
| Secondary Background | Light Gray | #f5f5f5 |
| Text | Dark Gray | #333333 |
| CTA Buttons | Yellow | #ffc500 |
| Secondary Accent | Turquoise | #00a8a8 |
| White | White | #ffffff |

---

## 🎯 Tailwind Classes

### Background Colors
- `bg-navy-dark` - Primary navy
- `bg-white` - White
- `bg-gray-light` - Light gray
- `bg-yellow` - Yellow accent
- `bg-turquoise` - Turquoise accent

### Text Colors
- `text-navy-dark` - Navy text
- `text-white` - White text
- `text-gray-dark` - Dark gray text
- `text-yellow` - Yellow text
- `text-turquoise` - Turquoise text

### Sizing
- `text-4xl` - Large headings
- `text-2xl` - Medium headings
- `text-lg` - Body text
- `text-sm` - Small text

### Spacing
- `px-8` - Horizontal padding
- `py-4` - Vertical padding
- `mb-4` - Bottom margin
- `gap-4` - Gap between items

---

## 🚨 Troubleshooting

### Server Won't Start
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Start fresh
npm run dev
```

### Images Not Loading
- Check file path in component
- Verify image exists in `public/Images/`
- Use correct filename (case-sensitive)

### Styles Not Applying
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check Tailwind class names

### Scroll Snap Not Working
- Check browser support (Chrome, Firefox, Safari)
- Verify `scroll-snap-type: y mandatory` in globals.css
- Check section has `scroll-snap-align: start`

---

## 📚 Documentation

- **Full Overview:** `VERTICAL_REDESIGN_COMPLETE.md`
- **Visual Guide:** `VERTICAL_LAYOUT_VISUAL_GUIDE.md`
- **Resource Links:** `RESOURCE_LINKS.md`
- **Deliverables:** `DELIVERABLES_SUMMARY.md`

---

## 🔗 Useful Links

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **MDN Web Docs:** https://developer.mozilla.org

---

## ✅ Verification

Server running? ✅
```bash
curl http://localhost:3000
# Should return 200 OK
```

All sections visible? ✅
- Scroll through all 10 sections
- Check responsive design on mobile

Images loading? ✅
- Gallery images display
- Background images visible
- Sponsor logos show

Interactive elements work? ✅
- Click gallery images
- Expand FAQ items
- Click corporate cards

---

## 🎉 You're All Set!

The Ga-Mawela platform is ready to explore. Scroll through the sections, interact with elements, and enjoy the professional Anglo American-style design!

**Questions?** Check the documentation files or review the component code.

**Ready to deploy?** See `RESOURCE_LINKS.md` for deployment options.

---

**Happy exploring! 🚀**

