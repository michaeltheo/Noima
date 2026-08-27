'use client'

import { useEffect } from 'react'

/** Freezes page scroll while `active` is true, restoring whatever was set before. */
export const useScrollLock = (active: boolean): void => {
  useEffect(() => {
    if (!active) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [active])
}
