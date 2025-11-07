# Ga Mawela Truth Platform

An investigative journalism platform for uncovering truth and accountability in South Africa, built with Next.js, MongoDB, and TypeScript.

## Project Overview

Ga Mawela is a comprehensive platform designed to facilitate investigative journalism by providing tools for document management, lineage tracking, evidence collection, and administrative oversight. The platform enables journalists and investigators to organize, analyze, and publish investigative content while maintaining proper authentication and authorization controls.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ga-mawela-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
PLAUSIBLE_DOMAIN=truth.gamawela.org
SITE_URL=https://truth.gamawela.org
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Models

### Investigation Model
Represents investigative cases with the following fields:
- `title` (string, required): Title of the investigation
- `description` (string, required): Detailed description
- `status` (enum): 'draft', 'pending', 'approved', 'published' (default: 'draft')
- `evidence` (string[]): Array of evidence file URLs
- `signoffBy` (string, optional): Admin user ID who signed off
- `signoffAt` (Date, optional): Timestamp of signoff
- `createdAt` (Date): Auto-generated creation timestamp
- `updatedAt` (Date): Auto-generated update timestamp

### Lineage Model
Tracks ancestral and familial connections with the following fields:
- `name` (string, required): Name of the lineage entry
- `ancestors` (string[]): Array of ancestor names
- `documents` (ObjectId[]): References to associated Document records
- `createdAt` (Date): Auto-generated creation timestamp
- `updatedAt` (Date): Auto-generated update timestamp

### Document Model
Manages uploaded files and evidence with the following fields:
- `filename` (string, required): Original filename
- `type` (string, required): MIME type of the file
- `url` (string, required): File URL (local or cloud storage)
- `size` (number, required): File size in bytes
- `description` (string, optional): File description
- `category` (string, optional): Document category
- `investigationId` (ObjectId, optional): Reference to associated Investigation
- `lineageId` (ObjectId, optional): Reference to associated Lineage
- `uploadedAt` (Date): Upload timestamp (default: current date)
- `uploadedBy` (string, required): User ID of uploader

## API Routes

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication handler
  - Supports credential-based login
  - Admin role assignment for privileged users

### Document Management
- `POST /api/upload` - Upload files to the platform
  - **Request Body**: FormData with `file`, `description`, `category`, `investigationId`, `lineageId`
  - **Response**: `{ success: true, document: { id, filename, url, size } }`
  - **Validation**: File type, size (10MB max), security checks

### Lineage Management
- `POST /api/lineage` - Register new lineage entries
  - **Request Body**: FormData with `name`, `ancestors` (JSON), `documents` (files)
  - **Response**: `{ message: 'Lineage registered successfully', lineage }`

### Investigation Management (Admin Only)
- `GET /api/admin/investigations/[id]` - Get investigation details
  - **Auth**: Admin required
  - **Response**: Investigation object

- `PATCH /api/admin/investigations/[id]` - Update investigation status
  - **Auth**: Admin required
  - **Request Body**: `{ status: 'draft'|'pending'|'approved'|'published' }`
  - **Response**: Updated investigation object

- `POST /api/admin/investigations/[id]/signoff` - Sign off pending investigations
  - **Auth**: Admin required
  - **Request Body**: `{ adminId: string }`
  - **Response**: Signed off investigation object

### Export Functions
- `GET /api/export/slp?investigationId=<id>` - Generate SLP request letter PDF
- `GET /api/export/paia?investigationId=<id>` - Generate PAIA request PDF
- `GET /api/export/deeds?investigationId=<id>` - Generate Deeds Office search form PDF

### Utility APIs
- `POST /api/errors` - Log client-side errors
  - **Request Body**: Error details with timestamp, level, message, stack, context
- `GET /api/og?title=<title>&description=<desc>` - Generate Open Graph images

## Page Routes

### Public Pages
- `/` - Homepage with platform overview
- `/investigations` - Public investigation listings
- `/investigations/[id]` - Individual investigation details
- `/lineage` - Lineage/family tree visualization
- `/upload` - Document upload interface

### Admin Pages
- `/admin/dashboard` - Administrative dashboard
- `/admin/investigations/[id]` - Investigation management interface

## Authentication and Authorization

The platform uses NextAuth.js for authentication with role-based access control:

- **Admin Users**: Full access to investigation management, signoff capabilities
- **Regular Users**: Can upload documents and view public content
- **Authentication**: Credential-based login (currently demo credentials: admin@example.com/admin123)

## Environment Variables

Required environment variables:
- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js JWT signing
- `PLAUSIBLE_DOMAIN`: Domain for Plausible analytics
- `SITE_URL`: Full URL of the deployed site

## Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Set environment variables in Vercel dashboard
4. Deploy: `npm run deploy` or `vercel --prod`

The application is configured to deploy to `truth.gamawela.org`.

## Component Overview

Key components include:
- `AdminTable`: Administrative data tables
- `EvidenceExportButton`: Export functionality for evidence
- `InvestigationCard`: Investigation display cards
- `MapPanel`: Geographic visualization
- `SignoffModal`: Administrative approval interface
- `Timeline`: Chronological event display
- `Uploader`: File upload interface

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
