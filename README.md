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
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

### Email Setup
- For Gmail, generate an App Password and use it for `SMTP_PASSWORD`.
- Emails are sent for seminar registration, consultation, and service requests.

## Project Structure
- `components/` - React UI components
- `app/api/` - API routes for form submissions and email handling
- `public/` - Static assets

## Contact
For questions or support, contact: info@koreatous.com 