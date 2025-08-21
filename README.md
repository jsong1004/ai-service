# AI Business Automation Landing

A modern landing page for AI business automation services, built with Next.js 15, React 19, and Tailwind CSS. Features comprehensive form management, email automation, and a dynamic blog system.

## 🚀 Features

- **📝 Form Management**: Multiple form types (seminar registration, consultation, service requests, AI strategy sessions)
- **📧 Email Integration**: Automated email notifications via Nodemailer with Gmail SMTP
- **🔥 Database**: Data persistence with Firebase Firestore
- **🔐 Authentication**: Google OAuth integration with NextAuth.js
- **📱 Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components
- **📖 Blog System**: Dynamic blog with consistent design and responsive layout
- **🔍 SEO Optimized**: Meta tags, structured data, and search engine friendly URLs
- **📊 Analytics Ready**: Google Analytics integration
- **🎨 Theme Support**: Dark/light mode with next-themes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Email**: Nodemailer with Gmail SMTP
- **Database**: Firebase Firestore
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Google Cloud Run
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Firebase project with Firestore enabled
- Gmail account with App Password

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ai-business-automation-landing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Environment Variables
Create a `.env.local` file in the root directory with the following:

```bash
# Email Configuration (Gmail SMTP)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_FROM="Your Company <noreply@yourcompany.com>"
ADMIN_EMAIL=your-admin-email@example.com

# Firebase Configuration
GOOGLE_APPLICATION_CREDENTIALS=serviceAccountKey.json

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

# Google OAuth (for NextAuth)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase for NextAuth (if using Firebase adapter)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----"
```

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Create a service account and download the JSON key
4. Save as `serviceAccountKey.json` in the root directory
5. Update `firebaseConfig.ts` with your project configuration

### Authentication Setup
1. **Generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

2. **Set up Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized origins: `http://localhost:3000`, `https://your-domain.com`
   - Add redirect URIs: `http://localhost:3000/api/auth/callback/google`, `https://your-domain.com/api/auth/callback/google`

3. **Update environment variables** with your Google OAuth credentials

### Running the Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📄 Pages & Routes

### Main Pages
- `/` — Home: Main landing page with hero, features, and pricing sections
- `/ai-workshops` — AI Workshops: Hands-on, business-focused AI implementation workshops
- `/business-automation` — Business Automation: Custom AI-powered automation solutions
- `/consulting` — Consulting: Strategic AI transformation consulting and implementation
- `/managed-services` — Managed Services: Ongoing operational management and AI system support
- `/ai-opportunity` — AI Opportunity Assessment
- `/ai-opportunity-assessment` — AI Opportunity Assessment Form
- `/ai-strategy-session` — AI Strategy Session Booking
- `/download` — Resource Downloads
- `/affiliate` — Affiliate Program Information
- `/dashboard` — User Dashboard (requires authentication)
- `/profile` — User Profile (requires authentication)
- `/auth/signin` — Sign In Page

### Company Pages
- `/company` — About Company: Company overview and mission
- `/founder` — About Founder: Founder profile and background
- `/case-studies` — Case Studies: Success stories and client results
- `/why_business_automation` — Why Business Automation

### Blog System
- `/blog` — Blog: Featured blog posts with consistent design and responsive layout
- `/blog/[slug]` — Blog Posts: Individual blog articles with SEO optimization

### Legal Pages
- `/privacy-policy` — Privacy Policy: Data protection and privacy terms
- `/terms-of-service` — Terms of Service: Usage terms and conditions

## 🔌 API Endpoints

- `POST /api/consultation` — Handle consultation form submissions
- `POST /api/seminar-registration` — Handle seminar registrations with calendar invites
- `POST /api/service-request` — Handle service request form submissions
- `POST /api/ai-strategy-session` — Handle AI strategy session bookings
- `POST /api/onsite-seminar` — Handle on-site seminar requests
- `POST /api/download` — Handle resource download requests
- `GET/POST /api/auth/[...nextauth]` — NextAuth.js authentication endpoints

## 📁 Project Structure

```
ai-business-automation-landing/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API routes for form handling
│   ├── blog/                     # Dynamic blog system
│   │   └── posts/                # Individual blog HTML files
│   ├── [service-pages]/          # Service-specific pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui component library
│   ├── auth/                     # Authentication components
│   ├── [form-components].tsx     # Form components
│   └── [section-components].tsx  # Page section components
├── lib/                          # Utility functions
│   ├── firestore.ts              # Firebase Firestore client
│   ├── nodemailer.ts             # Email configuration
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
│   └── use-auth.ts               # Authentication hook
├── public/                       # Static assets
│   ├── images/                   # Images and icons
│   └── downloads/                # Downloadable resources
├── types/                        # TypeScript type definitions
├── firebaseConfig.ts             # Firebase configuration
├── serviceAccountKey.json        # Firebase service account (gitignored)
└── package.json                  # Dependencies and scripts
```

## 📧 Email System

- **Provider**: Nodemailer with Gmail SMTP
- **Features**: 
  - Automated confirmation emails to users
  - Notification emails to admin
  - Calendar invites for seminars
  - HTML and text email formats
- **Production**: Secrets managed via Google Secret Manager

## 🗄️ Database (Firestore)

### Collections
- `Consultation-registrations` — Consultation form submissions
- `seminar-registrations` — Seminar registration data
- `Service-requests` — Service request form data
- `download-requests` — Download request tracking
- `AI-Strategy-Session-registrations` — AI strategy session bookings

### Security
- Server-side authentication via service account
- Environment-based configuration (dev/prod)
- Automatic error handling and fallbacks

## 🔐 Authentication System

### Features
- **Google OAuth**: Sign in with Google accounts
- **Session Management**: Secure session handling with JWT
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Display user information and preferences
- **Firebase Integration**: User data stored in Firestore

### Components
- `SignInButton`: Google OAuth sign-in button
- `UserProfile`: Display user information
- `ProtectedRoute`: Route protection wrapper
- `SignOutButton`: Sign out functionality

### Usage
```tsx
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <button onClick={() => login()}>Sign In</button>
  }
  
  return <div>Welcome, {user?.name}!</div>
}
```

## 🎨 UI Components

Built with shadcn/ui components:
- Forms (Input, Select, Textarea, Checkbox, Radio)
- Navigation (Header, Footer, Breadcrumb)
- Feedback (Toast, Alert, Progress)
- Layout (Card, Dialog, Sheet, Tabs)
- Data Display (Table, Badge, Avatar)

## 🚀 Deployment

### Google Cloud Run
- Containerized with Docker
- Automatic deployments via Cloud Build
- Environment variables managed via Secret Manager
- HTTPS enabled with custom domain support

### Build Commands
```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## 📊 Performance

- **Static Generation**: Blog posts pre-rendered at build time
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting by route
- **SEO**: Meta tags, structured data, and semantic markup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, contact: **info@koreatous.com**

## 📄 License

This project is private and proprietary. All rights reserved. 