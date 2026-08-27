import React from 'react'

/** One labelled line in the address column. */
export const AddressRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="border-t border-line pt-3.5">
    <div className="text-num tracking-[0.18em] text-espresso-soft uppercase">{label}</div>
    <div className="mt-[5px] text-[1.25rem] tracking-[-0.015em] text-ink">{children}</div>
  </div>
)
