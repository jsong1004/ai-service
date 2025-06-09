import { ApiResponse } from "@/types";

/**
 * Handles API requests with consistent error handling
 * @param url - The API endpoint URL
 * @param method - HTTP method (GET, POST, etc.)
 * @param data - Request body data (for POST, PUT, etc.)
 * @returns Promise with the API response
 */
export async function apiRequest<T, R = ApiResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  data?: T
): Promise<R> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error || 
        responseData.message || 
        `Request failed with status ${response.status}`
      );
    }

    return responseData as R;
  } catch (error) {
    console.error("API request error:", error);
    
    // Enhance error message for network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error. Please check your internet connection.");
    }
    
    // Re-throw the error with the original message
    throw error;
  }
}

/**
 * Format validation errors from Zod or other validation libraries
 * @param error - Error object from validation
 * @returns Formatted error message
 */
export function formatValidationError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred. Please try again.";
}