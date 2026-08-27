import React from 'react'

/** Small clay overline that titles a column inside a section. */
export const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-md text-num tracking-[0.2em] text-clay-deep uppercase">{children}</h3>
)
