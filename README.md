# AI Business Automation Landing

A modern landing page for AI business automation services, built with Next.js, React, and Tailwind CSS.

## Features
- **Blog System**: Dynamic blog with consistent design and responsive layout
- **Form Management**: Multiple form types (seminar registration, consultation, service requests)
- **Email Integration**: Automated email notifications via Nodemailer
- **Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components
- **Firebase Integration**: Data persistence with Firestore
- **SEO Optimized**: Meta tags, structured data, and search engine friendly URLs

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation
```bash
pnpm install
```

### Running the Development Server
```bash
pnpm dev
```

### Environment Variables
Create a `.env.local` file in the root directory with the following:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=your-admin-email@example.com
```

### Email Setup
- Uses Nodemailer with Gmail SMTP for all transactional emails (seminar registration, consultation, service requests).
- In production, these secrets are managed via Google Secret Manager and injected automatically by Cloud Build.

## Pages
- `/` — Home: Main landing page with hero, features, and pricing sections
- `/blog` — Blog: Featured blog posts with consistent design and responsive layout
- `/blog/[slug]` — Blog Posts: Individual blog articles with SEO optimization
- `/ai-workshops` — AI Workshops: Hands-on, business-focused AI implementation workshops
- `/business-automation` — Business Automation: Custom AI-powered automation solutions
- `/consulting` — Consulting: Strategic AI transformation consulting and implementation
- `/managed-services` — Managed Services: Ongoing operational management and AI system support
- `/company` — About Company: Company overview and mission
- `/founder` — About Founder: Founder profile and background
- `/case-studies` — Case Studies: Success stories and client results
- `/privacy-policy` — Privacy Policy: Data protection and privacy terms
- `/terms-of-service` — Terms of Service: Usage terms and conditions

## Project Structure
- `app/` - Next.js 15 App Router pages and layouts
- `app/blog/` - Dynamic blog system with static generation
- `app/blog/posts/` - Individual blog HTML files with consistent styling
- `app/api/` - API routes for form submissions and email handling
- `components/` - Reusable React UI components and forms
- `components/ui/` - shadcn/ui component library
- `lib/` - Utility functions and configuration
- `public/` - Static assets (images, icons, documents)
- `styles/` - Global CSS and Tailwind configuration

## Blog System
- **Dynamic routing**: `/blog/[slug]` for individual posts
- **Static generation**: Pre-rendered at build time for performance
- **Consistent design**: Unified styling across all blog posts
- **SEO optimization**: Meta tags, structured data, and semantic markup
- **Responsive layout**: Mobile-first design with proper typography

## Contact
For questions or support, contact: info@koreatous.com 