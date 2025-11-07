# Ga-Mawela Platform

**A Family Clan website platform that exposes the true lineage of Ga Mawela Community and provides an open platform for community-related issues in the mining industry.**

---

## 🌍 Project Overview

The Ga-Mawela Platform is a comprehensive Next.js web application dedicated to documenting and preserving the heritage, lineage, and land restitution claims of the Ga-Mawela community in South Africa's Dwars River Valley.

**Domain:** morokaandassociates.com  
**Repository:** https://github.com/MorokaPrince/ga-mawela-platform  
**Status:** ✅ Production Ready

---

## 🎯 Key Features

### 11 Interactive Tabs
1. **Hero Tab** - Landing page with carousel
2. **Archaeological Tab** - Heritage evidence and findings
3. **Evidence Tab** - Documents and testimonies
4. **Gallery Tab** - 40+ project images
5. **Historical Tab** - Community background
6. **Legal Tab** - Restitution context
7. **Lineage Tab** - Family genealogy
8. **Mining Tab** - Corporate interests
9. **Resources Tab** - References and links
10. **Sponsors Tab** - Partner organizations
11. **Youth Tab** - Youth empowerment programs

### Animations & Interactions
- ✅ Scroll-triggered fade-in animations
- ✅ Card hover effects (lift + scale)
- ✅ Parallax background scrolling
- ✅ Staggered animations on card grids
- ✅ Button ripple effects
- ✅ Smooth transitions (300ms)

### Design System
- **Color Palette:** Metallic blue (#0a1929, #7eb3f6, #a8d5ff)
- **Typography:** Inter (sans-serif), Merriweather (serif)
- **Layout:** Horizontal tabbed landscape design
- **Glassmorphism:** Semi-transparent cards with backdrop blur
- **Responsive:** Mobile-first, fully responsive

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd ga-mawela
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ga-mawela-platform/
├── ga-mawela/                          # Next.js application
│   ├── src/
│   │   ├── app/                        # Pages and API routes
│   │   ├── components/                 # React components
│   │   │   ├── TabbedLandscape/        # Tab components
│   │   │   ├── ScrollRevealWrapper.tsx # Scroll animations
│   │   │   └── ParallaxSection.tsx     # Parallax effects
│   │   ├── animations/                 # Animation utilities
│   │   ├── hooks/                      # Custom React hooks
│   │   └── styles/                     # CSS files
│   ├── public/                         # Static assets
│   ├── package.json                    # Dependencies
│   └── next.config.ts                  # Next.js config
│
├── Documentation/
│   ├── VERCEL_DEPLOYMENT_GUIDE.md
│   ├── CRITICAL_ISSUES_RESOLUTION_REPORT.md
│   ├── GITHUB_REPOSITORY_CLEANUP_COMPLETE.md
│   └── Other documentation files
│
└── .gitignore                          # Git ignore rules
```

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16.0.1** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Animations
- **GSAP 3.12.0** - GreenSock Animation Platform
- **Framer Motion 10.16.0** - React animation library
- **Lenis 1.0.0** - Smooth scroll library
- **Swiper 11.0.0** - Carousel functionality
- **VanillaTilt.js 1.8.0** - Card tilt effects

### Backend & Database
- **Next-Auth** - Authentication
- **MongoDB** - Database
- **API Routes** - Serverless functions

### Development
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS** - Styling

---

## 📊 Build & Performance

### Build Status
- ✅ TypeScript: No errors
- ✅ Build: Successful
- ✅ Pages: 14/14 generated
- ✅ Lighthouse Score: 80+

### Performance Optimizations
- ✅ Images optimized
- ✅ CSS/JS minified
- ✅ Code splitting enabled
- ✅ Lazy loading implemented
- ✅ Caching configured

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ ARIA attributes properly set
- ✅ Keyboard navigation supported
- ✅ Screen reader compatible
- ✅ prefers-reduced-motion respected

---

## 🚀 Deployment

### Vercel Deployment

1. **Import Repository**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Select "ga-mawela-platform"

2. **Configure Settings**
   - Root Directory: `./ga-mawela`
   - Build Command: `npm run build`
   - Framework: Next.js

3. **Environment Variables**
   ```
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://morokaandassociates.com
   MONGODB_URI=your-connection-string
   NEXT_PUBLIC_API_URL=https://morokaandassociates.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-5 minutes
   - Verify at morokaandassociates.com

**See:** [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

---

## 📚 Documentation

- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
- **[CRITICAL_ISSUES_RESOLUTION_REPORT.md](./CRITICAL_ISSUES_RESOLUTION_REPORT.md)** - Details of all fixes
- **[GITHUB_REPOSITORY_CLEANUP_COMPLETE.md](./GITHUB_REPOSITORY_CLEANUP_COMPLETE.md)** - Repository cleanup report
- **[DEPLOYMENT_READY_SUMMARY.md](./DEPLOYMENT_READY_SUMMARY.md)** - Project completion summary

---

## 🔒 Security

- ✅ Environment variables secured
- ✅ No sensitive data in repository
- ✅ CORS properly configured
- ✅ Input validation on forms
- ✅ Next-Auth authentication

---

## 📞 Support

For issues or questions, please refer to the documentation files or contact the development team.

---

## 📄 License

This project is part of the Ga-Mawela Community heritage preservation initiative.

---

**Repository:** https://github.com/MorokaPrince/ga-mawela-platform  
**Domain:** morokaandassociates.com  
**Status:** ✅ Production Ready

