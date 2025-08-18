"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { SuccessMessage } from "@/components/ui/success-message"
import { FormCard } from "@/components/ui/form-card"
import { LoadingButton } from "@/components/ui/loading-button"
import { FormError } from "@/components/ui/form-error"
import { apiRequest } from "@/lib/api-utils"
import { ApiResponse, ConsultationFormData, FormProps } from "@/types"
// Using API route instead of server actions

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().min(1, { message: "Company name is required" }),
  serviceInterest: z.enum(["general", "workshop", "build", "managed"], {
    required_error: "Please select a service",
  }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  preferredContact: z.enum(["email", "phone"], {
    required_error: "Please select a preferred contact method",
  }),
  preferredDate: z.date({
    required_error: "Please select a preferred date",
  }),
  preferredTime: z.enum(["morning", "afternoon", "evening"], {
    required_error: "Please select a preferred time",
  }),
})

type FormValues = ConsultationFormData

export default function ConsultationForm({ onSuccess }: FormProps) {
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
      message: "",
      preferredContact: "email",
      preferredTime: "morning",
      serviceInterest: "workshop",
      preferredDate: undefined,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Send the form data to the API route using utility function
      const result = await apiRequest<FormValues, ApiResponse>('/api/consultation', 'POST', data)

      setIsSuccess(true)
      form.reset()
      
      // If in dialog, close after a delay
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
        title="Consultation Request Sent!" 
        message="Thank you for your interest. We've received your consultation request and will contact you within 24 hours."
        showClosingMessage={!!onSuccess}
      />
    )
  }

  return (
    <FormCard 
      title="Request a Free AI Consultation"
      description={
        <p>
          Get expert advice on how AI can transform your business. Fill out the form below to schedule a free consultation with our team. We'll discuss your needs, answer your questions, and help you plan your next steps with AI.
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
              Service Interest <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => form.setValue("serviceInterest", value as "general" | "workshop" | "build" | "managed")}
              defaultValue={form.getValues("serviceInterest")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
          
                <SelectItem value="workshop">AI Automation Workshop ($100/30 minutes)</SelectItem>
                <SelectItem value="build">AI Automation Build ($300/hour)</SelectItem>
                <SelectItem value="managed">Managed AI Service </SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.serviceInterest && (
              <p className="text-sm text-red-500">{form.formState.errors.serviceInterest.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Please describe your business needs and what you hope to achieve with AI automation..."
              rows={5}
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
            )}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>
                Preferred Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("preferredDate") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("preferredDate") ? (
                      format(form.watch("preferredDate"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("preferredDate")}
                    onSelect={(date) => date && form.setValue("preferredDate", date, { shouldValidate: true })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.preferredDate && (
                <p className="text-sm text-red-500">{form.formState.errors.preferredDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">
                Preferred Time <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => form.setValue("preferredTime", value as "morning" | "afternoon" | "evening")}
                defaultValue={form.getValues("preferredTime")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9am-12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                  <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.preferredTime && (
                <p className="text-sm text-red-500">{form.formState.errors.preferredTime.message}</p>
              )}
            </div>
          </div>

          <LoadingButton 
            type="submit" 
            className="w-full" 
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Schedule Consultation
          </LoadingButton>
          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will not share your information. For any questions, 
            please contact us at info@koreatous.com
          </p>
        </form>
    </FormCard>
  )
}
