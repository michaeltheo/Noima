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
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * The observer is attached from a ref callback rather than an effect so it is
 * wired up the moment the node exists. Under `prefers-reduced-motion` the
 * transition is dropped in CSS, so the element still appears — just instantly.
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
        'transition-[opacity,transform] duration-1000 ease-noima motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
