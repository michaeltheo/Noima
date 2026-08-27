import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Rich text is used for the optional body copy on categories and collections.
 * Links point at those two collections or at an external URL — there is no
 * generic Pages collection to reference.
 */
export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['categories', 'collections'],
    }),
  ],
})
