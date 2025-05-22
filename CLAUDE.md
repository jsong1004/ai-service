# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js landing page for an AI business automation consulting service. The site promotes AI automation services and offers free seminars with registration features. Key functionalities include:

1. Landing page with various sections (hero, features, pricing, etc.)
2. Free seminar registration form with email notifications
3. Consultation scheduling form for business inquiries
4. Email integration for form submissions

## Project Updates
- Added service request functionality for all pricing plans
- Pricing section now features dialog-based forms for each plan
- All forms send email notifications to admin and users
- Improved UI consistency across all forms and dialogs

## Development Commands

```bash
# Install dependencies
npm install
# or with pnpm
pnpm install

# Start development server
npm run dev
# or with pnpm
pnpm dev

# Build for production
npm run build
# or with pnpm
pnpm build

# Start production server
npm run start
# or with pnpm
pnpm start

# Run linting
npm run lint
# or with pnpm
pnpm lint
```

## Environment Variables

The application requires several environment variables for email functionality:

```
# For Gmail SMTP in production
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# For other SMTP services
SMTP_HOST=your-smtp-host
SMTP_PORT=your-smtp-port
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
```

In development, if no email credentials are provided, the application will use Ethereal.email for testing, which provides a preview URL for viewing sent emails.

## Project Architecture

### Frontend

- Built with Next.js and React 19
- UI components from Radix UI with Tailwind CSS for styling
- Uses the shadcn/ui component library (components/ui/*)
- Forms built with react-hook-form and Zod for validation

### Backend

- Uses Next.js App Router with server actions
- API routes in app/api/* for form submissions
- Nodemailer for sending emails
- Calendar event generation with ical-generator

### Key Files

- `/app/page.tsx` - Main landing page
- `/app/schedule-consultation/page.tsx` - Consultation scheduling page
- `/app/actions.ts` - Server actions for form processing
- `/app/api/seminar-registration/route.ts` - API endpoint for seminar registration
- `/components/*.tsx` - Various page sections and forms

### Form Handling Flow

1. Frontend forms collect user input with validation
2. Submission triggers server action or API route
3. Server processes data and sends emails
4. Confirmation displayed to user

## File Structure

- `/app` - Next.js pages and API routes
- `/components` - React components for page sections
- `/components/ui` - Reusable UI components (shadcn/ui)
- `/public` - Static assets (images, etc.)
- `/styles` - Global CSS styles
- `/lib` - Utility functions
- `/hooks` - Custom React hooks

## Code Conventions

- TypeScript is used throughout the project
- React components use functional style with hooks
- Server-side code uses "use server" directive
- Form validation uses Zod schemas
- UI components follow shadcn/ui patterns