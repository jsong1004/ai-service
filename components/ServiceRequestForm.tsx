"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SuccessMessage } from "@/components/ui/success-message"
import { FormCard } from "@/components/ui/form-card"
import { LoadingButton } from "@/components/ui/loading-button"
import { FormError } from "@/components/ui/form-error"
import { apiRequest } from "@/lib/api-utils"
import { ApiResponse, ServiceRequestFormData, FormProps } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().min(1, { message: "Company name is required" }),
  serviceInterest: z.string(),
  serviceDetail: z.string().min(10, { message: "Service request detail must be at least 10 characters" }),
})

type FormValues = ServiceRequestFormData

interface ServiceRequestFormProps extends FormProps {
  serviceInterest: string;
}

export default function ServiceRequestForm({ serviceInterest, onSuccess }: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest,
      serviceDetail: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setError(null)
    try {
      await apiRequest<FormValues, ApiResponse>('/api/service-request', 'POST', data)
      
      setIsSuccess(true)
      form.reset()
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <SuccessMessage 
        title="Service Request Sent!" 
        message="Thank you for your interest. We've received your service request and will contact you soon."
        showClosingMessage={!!onSuccess}
      />
    )
  }

  return (
    <FormCard 
      title="Service Request"
      description={
        <p>
          Please fill out the form below to request this service. Our team will review your request and contact you as soon as possible.
        </p>
      }
    >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError error={error} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" placeholder="John Doe" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" {...form.register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input id="company" placeholder="Acme Inc." {...form.register("company")} />
              {form.formState.errors.company && (
                <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceInterest">
              Service Interest
            </Label>
            <Input id="serviceInterest" value={serviceInterest} disabled className="bg-gray-100" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceDetail">
              Service Request Detail <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="serviceDetail"
              placeholder="Please describe your business needs and what you hope to achieve with this service..."
              rows={5}
              {...form.register("serviceDetail")}
            />
            {form.formState.errors.serviceDetail && (
              <p className="text-sm text-red-500">{form.formState.errors.serviceDetail.message}</p>
            )}
          </div>
          <LoadingButton 
            type="submit" 
            className="w-full" 
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Submit Service Request
          </LoadingButton>
          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
    </FormCard>
  )
} 