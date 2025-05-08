import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// If you don't want to use tailwind-merge, you can use this simpler version:
// export function cn(...inputs: ClassValue[]) {
//   return clsx(inputs)
// }
