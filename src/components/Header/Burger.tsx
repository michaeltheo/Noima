import { cn } from '@/utilities/ui'
import React from 'react'

/** Two-bar menu toggle that folds into a cross when open. */
export const Burger: React.FC<{
  open: boolean
  onClick: () => void
  controls: string
}> = ({ open, onClick, controls }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls={controls}
    className="flex cursor-pointer flex-col gap-[5px] p-2 md:hidden"
  >
    <span
      className={cn(
        'block h-[1.5px] w-6 bg-espresso transition-transform duration-400 ease-noima',
        open && 'translate-y-[3.25px] rotate-45',
      )}
    />
    <span
      className={cn(
        'block h-[1.5px] w-6 bg-espresso transition-transform duration-400 ease-noima',
        open && 'translate-y-[-3.25px] -rotate-45',
      )}
    />
  </button>
)
