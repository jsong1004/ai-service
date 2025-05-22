"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormErrorProps {
  error: string | null;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;
  
  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}