"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ButtonProps } from "@/components/ui/button"

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function LoadingButton({ 
  isLoading, 
  loadingText = "Loading...", 
  children, 
  disabled, 
  ...props 
}: LoadingButtonProps) {
  return (
    <Button 
      disabled={isLoading || disabled} 
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}