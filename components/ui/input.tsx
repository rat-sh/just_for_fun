import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = 'text', ...props }, ref) => {
    const hasIcon = icon !== undefined && icon !== null
    const hasError = error !== undefined && error !== null && error !== ''

    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-3">{icon}</div>}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full rounded-lg border px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:border-transparent',
              hasIcon && 'pl-10',
              hasError && 'border-red-500 focus:ring-red-500',
              !hasError && 'border-gray-300 dark:border-gray-600 focus:ring-purple-600',
              className
            )}
            style={{
              backgroundColor: 'hsl(var(--input))',
              color: 'hsl(var(--foreground))',
            }}
            {...props}
          />
        </div>
        {hasError && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
