import { cn } from '@/utilities/ui'
import React from 'react'

/** Centres content at the 1360px site width with the fluid page gutter. */
export const Container: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn('mx-auto w-full max-w-site px-[clamp(24px,5vw,72px)]', className)}>
    {children}
  </div>
)
