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