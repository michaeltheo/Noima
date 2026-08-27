'use client'

import { cn } from '@/utilities/ui'
import React, { useCallback, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Stagger, in seconds, applied as a transition delay once the element enters. */
  delay?: number
  as?: React.ElementType
}

/**
 * Settles its children into place the first time they scroll into view: a lift,
 * a fade and a touch of defocus resolving together.
 *
 * The observer is attached from a ref callback rather than an effect so it is
 * wired up the moment the node exists. Under `prefers-reduced-motion` the whole
 * transition is dropped and the content is simply present.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}) => {
  const [visible, setVisible] = useState(false)

  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={observe}
      className={cn(
        'transition-[opacity,transform,filter] duration-1000 ease-noima',
        visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-[3px]',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none',
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
