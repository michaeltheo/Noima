import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

export type GalleryType = 'photos' | 'videos'

const tab =
  'rounded-[2px] border px-4 py-2 text-num uppercase transition-colors duration-300 ease-noima'

/**
 * Switches between the photos and videos views the chooser lands on, so a
 * visitor does not have to go back to the category to see the other one.
 */
export const GalleryFilter: React.FC<{
  basePath: string
  active: GalleryType
  photos: number
  videos: number
}> = ({ basePath, active, photos, videos }) => {
  if (!photos || !videos) return null

  const tabs: { type: GalleryType; label: string; count: number }[] = [
    { type: 'photos', label: 'Photos', count: photos },
    { type: 'videos', label: 'Videos', count: videos },
  ]

  return (
    <div className="mt-lg flex gap-2.5">
      {tabs.map(({ type, label, count }) => (
        <Link
          key={type}
          href={`${basePath}?type=${type}`}
          aria-current={active === type ? 'page' : undefined}
          className={cn(
            tab,
            active === type
              ? 'border-espresso bg-espresso text-cream'
              : 'border-line text-espresso-soft hover:border-espresso hover:text-espresso',
          )}
        >
          {label} ({count})
        </Link>
      ))}
    </div>
  )
}
