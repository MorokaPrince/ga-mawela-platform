# Ga-Mawela Platform

**A comprehensive community platform documenting the heritage, lineage, and land restitution claims of the Ga-Mawela community in South Africa's Dwars River Valley.**

---

## ?? Project Overview

The Ga-Mawela Platform is a Next.js 16 web application that serves as a digital archive and community hub for the Ga-Mawela community. It provides tools for documenting heritage, tracking investigations, managing community resources, and facilitating member engagement.

**Domain:** morokaandassociates.com  
**Repository:** https://github.com/MorokaPrince/ga-mawela-platform  
**Status:** ? Production Ready

---

## ?? Key Features

### Core Modules
1. **Community Platform** - Main community engagement interface with interactive sections
2. **Admin Dashboard** - Administrative interface for managing content and users
3. **Member Portal** - Personal dashboard for community members
4. **Investigation Tracker** - Track and manage community investigations
5. **Lineage Database** - Document and explore family genealogy
6. **Resource Hub** - Centralized access to community resources and documents
7. **Document Management** - Upload, organize, and share community documents
8. **Authentication System** - Secure login with Next-Auth

### Interactive Features
- ? Horizontal tabbed landscape design with 11+ interactive sections
- ? Scroll-triggered animations (Framer Motion, GSAP)
- ? Parallax effects and smooth scrolling (Lenis)
- ? Interactive carousels (Swiper)
- ? Card tilt effects (Vanilla Tilt)
- ? Responsive design (mobile-first)
- ? Glassmorphism UI elements

### Admin Capabilities
- ? User management
- ? Document approval workflow
- ? Investigation case management
- ? Engagement tracking
- ? Content moderation

---

## ?? Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MSSQL Server (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/MorokaPrince/ga-mawela-platform.git
cd ga-mawela-platform

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ?? Project Structure

```
ga-mawela-platform/
+-- ga-mawela/                          # Next.js application
¦   +-- src/
¦   ¦   +-- app/                        # Next.js app router
¦   ¦   ¦   +-- admin/                  # Admin dashboard
¦   ¦   ¦   +-- api/                    # API routes
¦   ¦   ¦   +-- investigations/         # Investigation pages
¦   ¦   ¦   +-- lineage/                # Lineage database pages
¦   ¦   ¦   +-- login/                  # Authentication pages
¦   ¦   ¦   +-- member/                 # Member portal pages
¦   ¦   ¦   +-- resource-hub/           # Resource hub pages
¦   ¦   +-- components/                 # React components
¦   ¦   +-- lib/                        # Utility libraries
¦   ¦   +-- server/                     # Server-side code
¦   ¦   +-- hooks/                      # Custom React hooks
¦   ¦   +-- animations/                 # Animation utilities
¦   ¦   +-- data/                       # Data files
¦   ¦   +-- styles/                     # CSS files
¦   +-- public/                         # Static assets
¦   +-- scripts/                        # Database scripts
¦   +-- package.json                    # Dependencies
+-- Documentation/                      # Project documentation
```

---

## ?? Technology Stack

### Frontend
- **Next.js 16.0.7** - React framework with Turbopack
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### Animation Libraries
- **Framer Motion 12.23.26** - React animation library
- **GSAP 3.13.0** - GreenSock Animation Platform
- **Lenis 1.3.13** - Smooth scroll library
- **Vanilla Tilt 1.8.1** - Card tilt effects

### Backend & Database
- **Next-Auth 4.24.12** - Authentication system
- **MSSQL 10.0.2** - Microsoft SQL Server database
- **API Routes** - Next.js serverless API endpoints

---

## ?? Environment Variables

Create a `.env.local` file in the `ga-mawela` directory:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
MSSQL_HOST=your-server
MSSQL_USER=your-username
MSSQL_PASSWORD=your-password
MSSQL_DATABASE=your-database
```

---

## ?? Deployment

### Vercel Deployment (Recommended)

1. Import Repository at https://vercel.com/dashboard
2. Configure: Root Directory: `./ga-mawela`, Build Command: `npm run build`
3. Add environment variables
4. Deploy

---

## ?? Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run db:init          # Initialize database
npm run seed:documents   # Seed document data
```

---

**Repository:** https://github.com/MorokaPrince/ga-mawela-platform  
**Domain:** morokaandassociates.com  
**Status:** ? Production Ready
