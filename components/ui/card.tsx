import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'none'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient = 'none', ...props }, ref) => {
    const gradientClasses = {
      primary: 'gradient-primary',
      secondary: 'gradient-secondary',
      accent: 'gradient-accent',
      success: 'gradient-success',
      warning: 'gradient-warning',
      none: 'card-premium',
    }

    return (
      <div
        ref={ref}
        className={cn(
          gradientClasses[gradient],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)

CardBody.displayName = 'CardBody'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between p-6 pt-0', className)} {...props} />
  )
)

CardFooter.displayName = 'CardFooter'
