import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Centres content at the site width with the fluid page gutter.
 *
 * `page` is the narrower measure (1240px, wider gutters) used by the inner
 * pages — category, collection, studio. `site` (1360px) is the home page.
 */
export const Container: React.FC<{
  children: React.ReactNode
  className?: string
  size?: 'site' | 'page'
}> = ({ children, className, size = 'site' }) => (
  <div
    className={cn(
      'mx-auto w-full',
      size === 'page'
        ? 'max-w-page px-[clamp(28px,7vw,120px)]'
        : 'max-w-site px-[clamp(24px,5vw,72px)]',
      className,
    )}
  >
    {children}
  </div>
)
