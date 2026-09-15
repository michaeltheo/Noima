import { serializeJsonLd } from '@/utilities/seo'
import React from 'react'

/**
 * Structured data for search engines. A plain `<script>`, not `next/script`:
 * JSON-LD is data, not code to load. Build the objects in `@/utilities/seo`.
 */
export const JsonLd: React.FC<{ data: object | object[] }> = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
)
