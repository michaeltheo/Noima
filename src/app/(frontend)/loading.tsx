import { BrandLoader } from '@/components/primitives/BrandLoader'
import React from 'react'

/**
 * Route-level Suspense boundary. Next swaps this in the moment a navigation
 * starts, so the header and footer hold their place while the next route's code
 * and data arrive — the page changes underneath a frame that never moves.
 */
export default function Loading() {
  return (
    <main className="is-surfacing flex min-h-[calc(100svh-var(--spacing-header))] flex-1 items-center justify-center px-8 pt-header">
      <BrandLoader label="Loading page" />
    </main>
  )
}
