// Common interfaces for forms and API responses
export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Form Data Interfaces
export interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  serviceInterest: "general" | "workshop" | "build" | "managed";
  message: string;
  preferredContact: "email" | "phone";
  preferredDate: Date;
  preferredTime: "morning" | "afternoon" | "evening";
}

export interface ServiceRequestFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  serviceInterest: string;
  serviceDetail: string;
}

export interface SeminarRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  experienceLevel: string;
  currentTools: string;
  learningGoals: string;
}

export interface OnsiteSeminarFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  attendanceCount: string;
  preferredDate: string;
  additionalNotes: string;
}

export interface AIStrategySessionFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  teamSize: string;
  topPriorities: string;
  message?: string;
  preferredContact: "email" | "phone";
  preferredDate: Date;
  preferredTime: "morning" | "afternoon" | "evening";
}

export interface DownloadFormData {
  name: string;
  email: string;
  linkedinProfile?: string;
}

// Component Props Interfaces
export interface SuccessMessageProps {
  title: string;
  message: string;
  showClosingMessage?: boolean;
}

export interface FormCardProps {
  title: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
}

export interface FormProps {
  onSuccess?: () => void;
}

// Affiliate Program Types
export interface User {
  id: string;
  email: string;
  emailVerified?: boolean;
  provider: 'google' | 'credentials';
  googleId?: string;
  password?: string; // hashed
  role: 'admin' | 'affiliate' | 'client';
  firstName: string;
  lastName: string;
  image?: string;
  company?: string;
  department?: string; // Client-specific
  title?: string; // Client-specific
  phone?: string;
  profileComplete?: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface Affiliate {
  id: string;
  userId: string;
  commissionRate: number; // percentage (e.g., 10 for 10%)
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber?: string;
  };
  paymentMethod: 'bank_transfer' | 'paypal' | 'check';
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  userId: string; // Reference to User document
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  department?: string;
  title?: string;
  industry?: string;
  companySize?: string;
  contractedDate?: Date;
  affiliateId?: string; // ID of affiliate who referred
  status: 'lead' | 'prospect' | 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  clientId: string;
  affiliateId?: string;
  contractNumber: string;
  amount: number;
  currency: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  contractDate: Date;
  startDate: Date;
  endDate?: Date;
  content: string; // Contract details/description
  services: string[]; // List of services
  commissionAmount?: number;
  commissionPaid: boolean;
  paymentTerms?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Negotiation {
  id: string;
  clientId: string;
  affiliateId?: string;
  stage: 'lead' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  notes: NegotiationNote[];
  lastContactDate: Date;
  nextFollowUp?: Date;
  estimatedValue?: number;
  probability?: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface NegotiationNote {
  id: string;
  note: string;
  createdBy: string; // userId
  createdAt: Date;
  type: 'call' | 'email' | 'meeting' | 'general';
}

export interface Commission {
  id: string;
  affiliateId: string;
  contractId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  approvedBy?: string; // userId
  approvedDate?: Date;
  paymentDate?: Date;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'login' | 'contract_created' | 'commission_paid' | 'profile_updated' | 'negotiation_updated';
  description: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}