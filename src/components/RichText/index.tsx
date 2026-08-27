import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/ui'

/**
 * Renders the optional `body` field on categories and collections.
 *
 * There are no block converters: rich text here is prose, and anything
 * structural belongs in the gallery blocks instead.
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  if (typeof value !== 'object') {
    throw new Error('Expected the linked document to be populated')
  }

  // A collection sits beneath its category; a category sits at the root.
  if (relationTo === 'collections') {
    const category = (value as { category?: { slug?: string } | number }).category
    const parent = typeof category === 'object' ? category?.slug : undefined
    return parent ? `/${parent}/${value.slug}` : `/${value.slug}`
  }

  return `/${value.slug}`
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data: DefaultTypedEditorState
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({ className, enableProse = true, ...rest }: Props) {
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn('payload-richtext', enableProse && 'prose max-w-none', className)}
      {...rest}
    />
  )
}
