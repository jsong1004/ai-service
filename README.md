# AI Business Automation Landing

A modern landing page for AI business automation services, built with Next.js, React, and Tailwind CSS.

## Features
- Free AI seminar registration with email confirmation
- On-site seminar request form
- Consultation and service request forms
- Modern, responsive UI
- Pricing plans with service request dialog
- Email notifications for all form submissions

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
SENDGRID_API_KEY=your-sendgrid-api-key
ADMIN_EMAIL=your-admin-email@example.com
```

### Email Setup
- Uses SendGrid API for all transactional emails (seminar registration, consultation, service requests).
- In production, these secrets are managed via Google Secret Manager and injected automatically by Cloud Build.

## Pages
- `/` — Home: Main landing page
- `/ai-workshops` — AI Workshops: Hands-on, business-focused AI implementation workshops for teams
- `/business-automation` — Business Automation: Custom AI-powered automation solutions tailored to your business
- `/consulting` — Consulting: Strategic AI transformation consulting, planning, and implementation support
- `/managed-services` — Managed Services: Ongoing operational management and support for your AI systems
- `/company` — About Company: Company overview
- `/founder` — About Founder: Founder profile
- `/case-studies` — Case Studies: Success stories and client results
- `/privacy-policy` — Privacy Policy
- `/terms-of-service` — Terms of Service

## Project Structure
- `components/` - React UI components
- `app/` - Next.js app directory (includes pages and API routes)
- `app/api/` - API routes for form submissions and email handling
- `public/` - Static assets

## Contact
For questions or support, contact: info@koreatous.com 