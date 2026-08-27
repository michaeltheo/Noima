import type { Spec } from '@/config/studio'

import React from 'react'

/** Label/value rows covering hours, capacity and extras. */
export const SpecList: React.FC<{ specs: Spec[] }> = ({ specs }) => (
  <dl>
    {specs.map((spec) => (
      <div
        key={spec.label}
        className="flex justify-between gap-md border-b border-line-soft py-[13px] text-[0.9375rem]"
      >
        <dt className="text-espresso-soft">{spec.label}</dt>
        <dd className="text-right text-ink">{spec.value}</dd>
      </div>
    ))}
  </dl>
)
