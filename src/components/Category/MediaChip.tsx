import React from 'react'

/** "18 Photos" / "4 Videos" pair beneath a collection card. */
export const MediaChip: React.FC<{
  icon: React.ReactNode
  count: number
  label: string
}> = ({ icon, count, label }) => (
  <span className="inline-flex items-center gap-1.5 text-[0.75rem] tracking-[0.05em] text-espresso-soft">
    <span className="size-[15px] flex-none text-clay-deep">{icon}</span>
    {count} {label}
  </span>
)
