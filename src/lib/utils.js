import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn / 21st.dev class-merge helper used by copied components.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
