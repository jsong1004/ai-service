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
import { ApiResponse, AIStrategySessionFormData, FormProps } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  company: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  teamSize: z.string().min(1, { message: "Team size is required" }),
  topPriorities: z.string().min(20, { message: "Please provide at least 20 characters describing your top priorities" }),
  message: z.string().optional(),
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

type FormValues = AIStrategySessionFormData

export default function AIStrategySessionForm({ onSuccess }: FormProps) {
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
      industry: "",
      teamSize: "",
      topPriorities: "",
      message: "",
      preferredContact: "email",
      preferredTime: "morning",
      preferredDate: undefined,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      // Send the form data to the API route
      const result = await apiRequest<FormValues, ApiResponse>('/api/ai-strategy-session', 'POST', data)

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
        title="AI Strategy Session Request Sent!" 
        message="Thank you for your request! We'll contact you within 24 hours to schedule your complimentary 30-minute AI strategy session. Check your email for confirmation details."
        showClosingMessage={!!onSuccess}
      />
    )
  }

  return (
    <FormCard 
      title="Schedule Your Free AI Strategy Session"
      description={
        <p>
          Ready to turn your AI assessment into action? Schedule a complimentary 30-minute strategy session with our experts. We'll analyze your top priorities and provide a tailored implementation plan with estimated ROI.
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

            <div className="space-y-2">
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Input id="industry" placeholder="e.g., Healthcare, Finance, Retail" {...form.register("industry")} />
              {form.formState.errors.industry && (
                <p className="text-sm text-red-500">{form.formState.errors.industry.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">
                Team Size <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => form.setValue("teamSize", value)} defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-20">6-20 employees</SelectItem>
                  <SelectItem value="21-50">21-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                  <SelectItem value="100+">100+ employees</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.teamSize && (
                <p className="text-sm text-red-500">{form.formState.errors.teamSize.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topPriorities">
              Top 3 AI Automation Priorities <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="topPriorities"
              placeholder="List your top 3 automation priorities from the AI Readiness Assessment:&#10;1. [Highest-scoring task name]&#10;2. [Second highest-scoring task name]&#10;3. [Third highest-scoring task name]"
              className="min-h-[100px]"
              {...form.register("topPriorities")}
            />
            {form.formState.errors.topPriorities && (
              <p className="text-sm text-red-500">{form.formState.errors.topPriorities.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Additional Comments 
            </Label>
            <Textarea
              id="message"
              placeholder="Please describe your current business challenges and what you hope to achieve with AI automation..."
              className="min-h-[120px]"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>
              Preferred Contact Method <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={form.watch("preferredContact")}
              onValueChange={(value: "email" | "phone") => form.setValue("preferredContact", value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-contact" />
                <Label htmlFor="email-contact">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone-contact" />
                <Label htmlFor="phone-contact">Phone</Label>
              </div>
            </RadioGroup>
            {form.formState.errors.preferredContact && (
              <p className="text-sm text-red-500">{form.formState.errors.preferredContact.message}</p>
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
                      !form.watch("preferredDate") && "text-muted-foreground"
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("preferredDate")}
                    onSelect={(date) => form.setValue("preferredDate", date as Date)}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
              <Select onValueChange={(value: "morning" | "afternoon" | "evening") => form.setValue("preferredTime", value)} defaultValue="morning">
                <SelectTrigger>
                  <SelectValue />
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
            loading={isSubmitting}
            className="w-full"
            size="lg"
          >
            Schedule My Free AI Strategy Session
          </LoadingButton>

          <p className="text-sm text-center text-gray-600">
            We respect your privacy and will not share your information. For any questions, please contact us at jsong@koreatous.com
          </p>
        </form>
    </FormCard>
  )
}
