import React from 'react'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...base} strokeWidth={1.5} className={className}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.3-1.9h7.4L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="12.6" r="3.3" />
  </svg>
)

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...base} strokeWidth={1.5} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.2 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" />
  </svg>
)
