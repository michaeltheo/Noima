import { cn } from '@/utilities/ui'
import React from 'react'

const control =
  'border-b border-line bg-transparent py-3 text-body text-espresso transition-colors duration-400 ease-noima placeholder:text-espresso-soft/60 focus:border-clay focus:outline-none'

type BaseProps = {
  id: string
  label: string
  className?: string
}

/** Underlined input in the NOIMA style. */
export const ContactField: React.FC<BaseProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  label,
  className,
  ...props
}) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <label htmlFor={id} className="text-label text-espresso-soft uppercase">
      {label}
    </label>
    <input id={id} name={id} className={control} {...props} />
  </div>
)

/** Multi-line twin of `ContactField`. */
export const ContactTextarea: React.FC<
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ id, label, className, ...props }) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <label htmlFor={id} className="text-label text-espresso-soft uppercase">
      {label}
    </label>
    <textarea id={id} name={id} className={cn(control, 'min-h-[90px] resize-y')} {...props} />
  </div>
)
