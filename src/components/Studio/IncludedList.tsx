import React from 'react'

/** Two-column bulleted inventory of what comes with the space. */
export const IncludedList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="grid grid-cols-1 gap-x-lg sm:grid-cols-2">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-baseline gap-3 border-b border-line-soft py-[11px] text-[0.9375rem] text-espresso-soft"
      >
        <span aria-hidden className="size-[5px] flex-none -translate-y-0.5 rounded-full bg-clay" />
        {item}
      </li>
    ))}
  </ul>
)
